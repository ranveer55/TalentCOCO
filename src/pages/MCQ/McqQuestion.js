import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import PropTypes from 'prop-types';
import { Paper, Typography, Box, Checkbox, Stack, OutlinedInput, MenuItem, IconButton, Button, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from '../../redux/store';
import type { Quote as QuoteType } from "../types";
import Image from '../../components/Image';
import useToggle from '../../hooks/useToggle';
import Iconify from '../../components/Iconify';
import { createMcq } from '../CourseDetail/storeMcq/actions'



let Massage = '';
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};



function Quote({ option, setOption, index, error }) {
  const renameRef = React.useRef(null);
  const { toggle: openConfirm, onOpen: onOpenConfirm, onClose: onCloseConfirm } = useToggle();


  return (
    <Draggable draggableId={option.id} index={index}>
      {provided => (
        <div

          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Paper
            sx={{
              p: 2,
              position: 'relative',
              boxShadow: (theme) => theme.customShadows.z1,
              '&:hover': {
                boxShadow: (theme) => theme.customShadows.z16,
              },
            }}
          >
            <Stack direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={0}>
              <Typography sx={{
                typography: 'p',
                mt: 1,
                fontWeight: 'fontWeightBold',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
              }}
              >{option.id}</Typography>
              <Checkbox
                disableRipple
                checked={option.correct}
                icon={<Iconify icon={'eva:radio-button-off-outline'} />}
                checkedIcon={<Iconify icon={'eva:checkmark-circle-2-outline'} />}
                onChange={(e) => setOption(option.id, 'correct', e.target.checked)}
              />
              <OutlinedInput
                size="small"
                multiline
                minRows={1}
                maxRows={10}
                fullWidth
                placeholder={`Option ${option.id}`}
                value={option.value}
                onChange={(e) => setOption(option.id, 'value', e.target.value)}
                inputRef={renameRef}
                sx={{
                  m: 0,
                  typography: 'p',
                  fontWeight: 'fontWeightBold',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'transparent',
                  },
                }}
              />

            </Stack>
            {error && <span style={{ color: "red", marginLeft: '60px' }}>{option.massage}</span>}
          </Paper>
        </div>
      )}
    </Draggable>
  );
}
function QuoteLists({ options, setOption, error }) {
  return options.map((option: QuoteType, index: number) => (
    <Paper
      sx={{
        mb: 2,
        width: '100%',
        position: 'relative',
        boxShadow: (theme) => theme.customShadows.z1,
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.z16,
        },

      }}
    >
      <Quote option={option} index={index} key={option.id} setOption={setOption} error={error} />
    </Paper>
  ));
}
const QuoteList = React.memo(QuoteLists);


const defaultmcq = {
  question: '',
  answer: [],
  options: []
}

const initial = ['A', 'B', 'C', 'D'].map(k => {
  const custom = {
    id: k,
    correct: false,
    value: '',
    error: false,
    massage: '',
    optionChecked: true,
  };

  return custom;
});

function McqQuestion({ lectureId, mcq = defaultmcq, cb }) {
  const [state, setState] = useState({ options: initial });
  const [question, setQuestion] = useState(mcq.question);
  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState(mcq.answer);
  const { isLoading } = useSelector((s) => s.mcq)
  const dispatch = useDispatch()

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const options = reorder(
      state.options,
      result.source.index,
      result.destination.index
    );

    setState({ options });
  }

  const setOption = (id, att, val) => {
    const op = state.options.map((item) => {
      if (item.id === id) {
        item[att] = val;
        item.massage = '';
      } else if (att === 'value' && item.value === '') {
        setError(false);
        item.massage = `${item.id} field is Required`
      }
      if (att === 'correct') {
        setError(false);
        item.optionChecked = false;
      }
      return item;
    });
    setState({ options: op })
  }

  const onSave = () => {
    setState({ options: [] })
    cb()
  }
  const save = () => {
    let Error=false;
    const op = state.options.filter((item) => item.correct).map(item => item.id)
    let options = state.options.map((item) => {
      Error = item.value === '' || question === '' ? true : item.optionChecked
      Massage = item.value === '' && item.massage === '' ? 'Please fill in all your choices' : ((item.optionChecked) && (item.massage === '')) && 'please correct at least one option' || '';
      return item;
    })
    if (Error) {
      setError(Error)
    } else {
      const payload = { question, answer: op, options, lectureId }
      dispatch(createMcq(payload, onSave))
     }
     if(!Error){
     options = state.options.map((item) => {
      delete item.value
      delete item.correct;
      return item;
    })
  }
  }
  return (
    <Paper
      variant="outlined"
      sx={{ p: 1, bgcolor: 'grey.5008' }}
    >
      <Stack direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}>

        <OutlinedInput
          size="small"
          multiline
          minRows={1}
          maxRows={10}
          fullWidth
          placeholder={'Write Question...'}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          sx={{
            typography: 'p',
            fontWeight: 'fontWeightBold',
            color: 'primary.dark'
          }}
        />
        {error && Massage !== '' ? <Alert severity="error">{Massage}</Alert> : ((error) && (question === '')) && <Alert severity="error">Question is required</Alert> || ''}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps} style={{ width: '100%' }}>
                <QuoteList options={state.options} setOption={setOption} error={error} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <LoadingButton size="medium" variant="contained" loading={false} onClick={save}>
          Save
        </LoadingButton>

      </Stack>

    </Paper>
  );
}
export default McqQuestion
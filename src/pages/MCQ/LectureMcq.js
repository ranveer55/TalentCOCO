import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "@emotion/styled";
import PropTypes from 'prop-types';
import { Paper, Typography, Box, DialogTitle, Checkbox, Stack, OutlinedInput, MenuItem, IconButton, Button } from '@mui/material';

// components

//

import { LoadingButton } from '@mui/lab';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from '../../redux/store';
import Image from '../../components/Image';
import useToggle from '../../hooks/useToggle';
import Iconify from '../../components/Iconify';
import { createMcq } from '../CourseDetail/storeMcq/actions'
import { DialogAnimate } from '../../components/animate';
import McqQuestion from "./McqQuestion";




const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};



function Question({ option, setOption, index }) {
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
              bgcolor: 'grey.5008'
            }}
          >
            <Stack direction="row"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={2}>
              <Typography sx={{
                typography: 'p',
                mt: 0,
                fontWeight: 'fontWeightBold',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
              }}
              >
                {index + 1}.
              </Typography>
              <Typography sx={{
                typography: 'p',
                mt: 1,
                fontWeight: 'fontWeightBold',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
              }}
              > 
                {option.question} 
              </Typography>
              
            </Stack>
          </Paper>
        </div>
      )}
    </Draggable>
  );
}
function QuestionLists({ options, setOption }) {
  return options.map((option, index) => (
    <Paper
      sx={{
        mb: 2,
        // width: 1,
        position: 'relative',
        boxShadow: (theme) => theme.customShadows.z1,
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.z16,
        },
      }}
    >
      <Question option={option} index={index} key={option.id} setOption={setOption} />
    </Paper>
  ));
}
const QuestionList = React.memo(QuestionLists);


const defaultmcq = {
  question: '',
  answer: [],
  options: []
}

const initial = ['A', 'B', 'C', 'D'].map(k => {
  const custom = {
    id: k,
    correct: false,
    value: ''
  };

  return custom;
});

function LectureMcq({ lecture,setMCQOrder }) {
  const [isOpenModal, openModal] = useState(false)
  const [state, setState] = useState({ options: lecture ? lecture.mcq : [] });
  const { isLoading } = useSelector((s) => s.mcq)
  const dispatch = useDispatch()

  const handleAddEvent = () => {
    openModal(1);
  };

  const handleCloseModal = () => {
    openModal(false);
  };

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
    setMCQOrder(options.map((item)=>item.id))
    setState({ options });
  }

  const setOption = (id, att, val) => {
    const op = state.options.map((item) => {
      if (item.id === id) {
        item[att] = val;
      }
      return item;
    });
    setState({ options: op })
  }
  const cb = () => {
    openModal(false);
  }

  useEffect(() =>{
    setState({ options: lecture ? lecture.mcq : [] })
  },[lecture])

  const save = () => {
    // const payload = { question, answer, options: state.options, lectureId }
    // dispatch(createMcq(payload, cb))
  }
  return (

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <QuestionList options={state.options} setOption={setOption} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
  );
}
export default LectureMcq;
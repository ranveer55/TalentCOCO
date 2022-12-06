import * as Yup from 'yup';
import { useCallback, useState, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { styled } from '@mui/material/styles';
import { Alert, IconButton, OutlinedInput, Tooltip, Grid, Card, Chip, Stack, Button, TextField, Switch, Box, Typography, Autocomplete, FormControlLabel, FormGroup, Checkbox, } from '@mui/material';
import { GridAddIcon } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../components/Iconify';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { useDispatch, useSelector } from '../../redux/store';

// components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../components/hook-form';
import { getCourse } from '../Courses/store/actions'
import { createMcq, updateMcq } from '../MCQ/store/actions';


const MCQForm = ({ cancel, lectureId, mcq = null }) => {
    const dispatch = useDispatch();
    const { course: { course }, lecture: { isLoading } } = useSelector((state) => state);
    const NewSectionSchema = Yup.object().shape({
        question: Yup.string().required('Question is required'),
        options: Yup.array().required('options are required').min(4),
        answer: Yup.array().required('Answer is required').min(1).max(3),
    });

    const defaultValues = useMemo(
        () => ({
            question: mcq ? mcq.question : '',
            options: mcq ? [...mcq.options] : [],
            answer: mcq && mcq.answer ? mcq.answer : [],
            lectureId
        }),
        [lectureId, mcq]
    );


    const methods = useForm({
        resolver: yupResolver(NewSectionSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting, isValid, errors },
    } = methods;

    const values = watch();

    const getParent = () => {
        dispatch(getCourse(course.id))
    }
    const cb = () => {
        reset();
        cancel();
        getParent()
    }

    const onSubmit = async () => {
        defaultValues.lectureId = lectureId;
        if (mcq) {
            dispatch(updateMcq(mcq.id, defaultValues, cb));
        } else {
            dispatch(createMcq(defaultValues, cb));
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue(name, value)
        defaultValues[name] = value;
    };

    const handleAnswer = (op) => {
        let v = defaultValues.answer;
        v.push(op)
        v = [...(new Set([...v]))];
        defaultValues.answer = v;
        setValue('answer', v);
    }

    const handleOption = (op, index) => {
        const v = defaultValues.options;
        v[index] = op;

        defaultValues.options = v;
        setValue('options', v);
    }


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
                <Typography>Question </Typography>
                <RHFTextField name="question" lable="Enter Question" value={defaultValues.question} size="small" onChange={handleChange} />
            </Stack>
            <Stack spacing={2} sx={{ m: 2 }}>
                {
                    [...new Array(4)].map((s, optionIndex) => {
                        const option = defaultValues.options && defaultValues.options[optionIndex] ? defaultValues.options[optionIndex] : null;
                        return (
                            <Stack key={optionIndex} direction="row" spacing={1} >
                                <FormGroup style={{ width: '100%' }}>
                                    <FormControlLabel   style={{ width: '100%' }} fullWidth control={<Checkbox onChange={() => option ? handleAnswer(option) : () => { }} checked={option ? defaultValues.answer.includes(option) : false} />}
                                        label={
                                            <OutlinedInput
                                                style={{ width: '100%' }}
                                                size="small"
                                                multiline
                                                minRows={1}
                                                maxRows={10}
                                                fullWidth
                                                placeholder={'Option...'}
                                                value={option}
                                                onChange={(e) => handleOption(e.target.value, optionIndex)}

                                            />
                                        }
                                    />
                                </FormGroup>
                            </Stack>
                        )
                    })
                }
            </Stack>
            <Stack spacing={1}>
                {errors && errors.answer ? <Stack><Alert severity="error">Please Select atleast one correct Option</Alert></Stack> : null}
                {errors && errors.options ? <Stack><Alert severity="error">{errors.options.message}</Alert></Stack> : null}
            </Stack>
            <Stack direction="row" spacing={2} alignItems="space-between" sx={{ mt: 1 }}>
                <Button size="small" onClick={cancel} variant="outlined">Cancel</Button>
                <LoadingButton size="small" variant="contained" type="submit" loading={isLoading} color="primary">
                    {!mcq ? `Create Question` : `Update Question`}
                </LoadingButton>

            </Stack>
        </FormProvider>
    )
}

export default MCQForm;


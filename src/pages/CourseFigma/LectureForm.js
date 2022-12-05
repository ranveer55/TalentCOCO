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
import { IconButton, Tooltip, Grid, Card, Chip, Stack, Button, TextField, Switch, Box, Typography, Autocomplete, FormControlLabel, FormGroup, Checkbox, } from '@mui/material';
import { GridAddIcon } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../components/Iconify';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { useDispatch, useSelector } from '../../redux/store';

// components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../components/hook-form';
//
import Curriculum from './Curriculum';
import { createLecture, updateLecture } from '../Lectures/store/actions'
import {getCourse } from '../Courses/store/actions'


const LectureForm = ({ type, cancel, lessonId, lecture = null,courseId }) => {
    const dispatch = useDispatch();
    const { course: { course }, lecture:{isLoading}} = useSelector((state) => state);
    const NewSectionSchema = Yup.object().shape({
        name: Yup.string().required('Title is required'),
        type: Yup.string().required('Type is required'),
        lessonId: Yup.string().required('LessonId is required'),
    });

    const defaultValues = useMemo(
        () => ({
            name: lecture ? lecture.name: '',
            type,
            lessonId
        }),
        [lecture]
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
        formState: { isSubmitting, isValid },
    } = methods;

    const values = watch();

    const getParent =() =>{
        dispatch(getCourse(courseId ))
      }
      const cb = () => {
        getParent()
        reset();
        cancel();
       
      }
    
      const onSubmit = async () => {
        defaultValues.lessonId = lessonId ;
        try {
          if (lecture) {
            dispatch(updateLecture(lecture.id, defaultValues, cb));
          } else {
          dispatch(createLecture(defaultValues, cb));
          }
        } catch (error) {
          console.error(error);
        }
      };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValue(name, value)
        defaultValues[name] = value;
    };
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={0}>
                <Typography>{`${type} Title`}</Typography>
                <RHFTextField name="name" lable="Enter a Title" value={defaultValues.name} size="small" onChange={handleChange} />
            </Stack>
            <Stack direction="row" spacing={2} alignItems="space-between" sx={{ mt: 1 }}>
                <Button onClick={cancel} variant="outlined">Cancel</Button>
                <LoadingButton variant="contained" type="submit" loading={isLoading} color="primary">
                    {!lecture ? `Create ${type}` : `Update  ${type}`}
                </LoadingButton>

            </Stack>
        </FormProvider>
    )
}

export default LectureForm;


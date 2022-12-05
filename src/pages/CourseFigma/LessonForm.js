import * as Yup from 'yup';
import { useCallback, useState, useMemo, useEffect } from 'react';
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
import { Grid, Card, Chip, Stack, Button, TextField, Switch, Box, Typography, Autocomplete, FormControlLabel, FormGroup, Checkbox, } from '@mui/material';
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
import { createLesson, updateLesson } from './store/actions'
import { createLesson, updateLesson } from '../Lessons/store/actions'
import { getCourse } from '../Courses/store/actions';
// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));





function LessonForm({lesson, courseId,hide}) {
  const dispatch = useDispatch();
  const {lesson:{isLoading}}=useSelector((s)=>s)
  const NewLessonSchema = Yup.object().shape({
    name: Yup.string().required('Title is required').min(1),
    description: Yup.string().required('Description is required').min(1),
    courseId: Yup.string().required('CourseId is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: lesson ? lesson.name:'',
      description: lesson? lesson.description:'',
      courseId ,
    }),
    [lesson]
  );


  const methods = useForm({
    resolver: yupResolver(NewLessonSchema),
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
    hide();
   
  }

  const onSubmit = async () => {
    defaultValues.courseId = courseId ;
    try {
      if (lesson) {
        dispatch(updateLesson(lesson.id, defaultValues, cb));
      } else {
      dispatch(createLesson(defaultValues, cb));
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
  const handleDescription = (e) => {
    const description = e.target.value;
    setValue('description', String(e.target.value))
    defaultValues.description = description;
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 1 }}>
        <Stack spacing={0}>
          <LabelStyle>New Lesson</LabelStyle>
          <RHFTextField name="name" lable="Enter a Title" value={defaultValues.name} size="small" onChange={handleChange} />
        </Stack>
        <Stack spacing={0}>

          <LabelStyle>What will students be able to do at the end of this lesson ?</LabelStyle>
          <RHFTextField name="description" lable="Enter a Learning Objective" value={defaultValues.description} multiline rows={2} size="small" onChange={handleChange} />
        </Stack>
        <Stack direction="row" spacing={2} alignItems="space-between" sx={{ mt: 1 }}>
          <Button onClick={hide} variant="outlined">Cancel</Button>
          <LoadingButton variant="contained" type="submit" loading={isLoading} color="primary">
            {!lesson ? 'Create Lesson' : 'Update Lesson'}
          </LoadingButton>

        </Stack>
      </Card>
    </FormProvider >
  );
}
export default LessonForm;


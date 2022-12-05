import * as Yup from 'yup';
import { useCallback, useState,useMemo } from 'react';
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
import Iconify from '../../../../components/Iconify';
import { useDispatch, useSelector } from '../../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../../components/hook-form';
//
import BlogNewPostPreview from '../../blog/BlogNewPostPreview';
import Section from './Section';
import Quiz from './Quiz';
import CodingExercise from './CodingExercise';
import { createCourse, updateCourse } from '../../../../pages/Courses/store/actions'
// ----------------------------------------------------------------------



const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));
const LoadingButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#90EE90",
  color: '#299617',
  height: '42px',
  marginTop: '-3px'
}));
const SimpleButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: '#52a447',
  borderRadius: 4,
  borderColor: '#5bb450',
  boxShadow: '0 0 0 0.2rem ',
}));
const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#46923c",
  height: '42px',
  marginTop: '-3px'
}));

// ----------------------------------------------------------------------

export default function CourseFigmaDesign() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sectionOpen, setSection] = useState(false);
  const [codingExerciseOpen, setCodingExercise] = useState(false);
  const [quizOpen, setQuiz] = useState(false);
  const [checked, setChecked] = useState(true);
  const { course: { course, loading } } = useSelector((state) => state);
  const { enqueueSnackbar } = useSnackbar();
  
  const NewCourseSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name:  '',
      description: '',
      }),
      []
  );

  const methods = useForm({
    resolver: yupResolver(NewCourseSchema),
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

  const cb = () => {
    reset();
    setSection(true);
  }

  const onSubmit = async () => {
     try {

      if (course) {
        dispatch(updateCourse(course.id, defaultValues, cb))
      } else {

        dispatch(createCourse(defaultValues, cb));
      }

    } catch (error) {
      console.error(error);
    }
  };
  const handleName = (e) => {
    const name = e.target.value;
    setValue('name', String(e.target.value))
    defaultValues.name = name;
  };
  const handleDescription = (e) => {
    const description = e.target.value;
    setValue('description', String(e.target.value))
    defaultValues.description = description;
  };
   
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
       {!sectionOpen ?(<Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Grid container>
                  <Grid item xs={12} md={3} sx={{ marginTop: '10px' }}>
                    <LabelStyle>Course Title </LabelStyle>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <RHFTextField name="name" size="small" onChange={(e) => handleName(e)}/>
                  </Grid>
                  <Grid item xs={12} md={3}>{ }</Grid>
                </Grid>
                <Grid container >
                  <Grid item xs={12} md={3} sx={{ marginTop: '25px' }}>
                    <LabelStyle>Course Description</LabelStyle>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <RHFTextField name="description" multiline rows={3} size="small" onChange={(e) => handleDescription(e)} />
                  </Grid>
                  <Grid item xs={12} md={1}>{ }</Grid>
                </Grid>
                </Stack>
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <SaveButton type="submit" variant="contained" loading={isSubmitting}>
                Add Course
              </SaveButton>
              </Stack>
           </Card>
          </Grid>
        </Grid>):<>
        <Section />
           </>}
        </FormProvider>
     </>
  );
}

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo,useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, InputLabel, Select, MenuItem,FormGroup, FormControl } from '@mui/material';
import { useDispatch, useSelector } from '../../../../redux/store';
// utils
import { fData } from '../../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock
import { countries } from '../../../../_mock';
import { createCourse, updateCourse } from '../../../../pages/Courses/store/actions'
// components
import Label from '../../../../components/Label';
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadSingleFile
  } from '../../../../components/hook-form';

// ----------------------------------------------------------------------
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

CourseNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentCourse: PropTypes.object,
};

export default function CourseNewEditForm({ isEdit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { course: { course, loading } } = useSelector((state) => state);
   const NewCourseSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(8),
    description: Yup.string().required('Description is required').min(1),
    hours: Yup.number().required('Hours is required'),
    poster: Yup.string(),
    language: Yup.string().required('Language is required'),
    level: Yup.string().required('Level is required'),
 });

  const defaultValues = useMemo(
    () => ({
      name: isEdit ? course?.name || '' : '',
      description: isEdit ? course?.description || '': '',
      hours: isEdit ? course?.hours || '': '',
      poster: isEdit ? course?.poster ||'': '',
      language: isEdit ? course?.language || '': '',
      level: isEdit ? course?.level || '': '',
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [course]
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
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && course) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, course]);

  const cb = () => {
    reset();
    navigate(PATH_DASHBOARD.course.root)
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
  function getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      defaultValues.poster = reader.result;
      
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        const b = getBase64(file)
        setValue(
          'poster',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
      defaultValues.poster = file.path;
       },
    [setValue]
  );

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
  const handleHours = (e) => {
    const hours = e.target.value;
    setValue('hours', String(e.target.value))
    defaultValues.hours = hours;
  };
   const handleInstructor = (e) => {
    const instructor = e.target.value;
    setValue('instructor', String(e.target.value))
    defaultValues.instructor = instructor;
  };
  const handleLevel = (e) => {
    const level = e.target.value;
    setValue('level', String(e.target.value))
    defaultValues.level = level;
    
  };
  const handleLanguage = (e) => {
    const language = e.target.value;
    setValue('language', String(e.target.value))
    defaultValues.language = language;
  };
   return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
               }}
            >
              <RHFTextField name="name" label="Course Name" onChange={(e) => handleName(e)}/>
              <RHFTextField name="description" label="Description" multiline rows={5} onChange={(e) => handleDescription(e)}/>
              <div>
                <LabelStyle>Poster</LabelStyle>
                <RHFUploadSingleFile 
                name="poster" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
              </div>  
              </Box>
              </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Box
             sx={{
              display: 'grid',
              rowGap: 3,
              }}  
            >  
            <RHFTextField name="hours" label="Hours" onChange={(e) => handleHours(e)}/>
            <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Level</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={defaultValues.level}
                  label="level"
                  onChange={(e) => handleLevel(e)}
                >
                  <MenuItem value={'Beginner'}>Beginner</MenuItem>
                  <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
                  <MenuItem value={'Expert'}>Expert</MenuItem>
                  <MenuItem value={'Pro'}>Pro</MenuItem>
                    </Select>
              </FormControl>
             <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={defaultValues.language}
                  label="Language"
                  onChange={(e) => handleLanguage(e)}
                >
                  <MenuItem value={'html'}>Html</MenuItem>
                  <MenuItem value={'css'}>Css</MenuItem>
                  <MenuItem value={'javascript'}>Javascript</MenuItem>
                  <MenuItem value={'python'}>Python</MenuItem>
                  <MenuItem value={'react'}>React</MenuItem>
                  <MenuItem value={'express'}>Express</MenuItem>
                  <MenuItem value={'mongodb'}>Mongodb</MenuItem>
                </Select>
              </FormControl>
               </Box>
               <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Course' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

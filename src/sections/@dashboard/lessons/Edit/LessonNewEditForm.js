import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, InputLabel, FormGroup, Select, MenuItem, FormControl } from '@mui/material';
import { useDispatch, useSelector } from '../../../../redux/store';
// utils
import { fData } from '../../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock
import { countries } from '../../../../_mock';
import { createLesson, updateLesson } from '../../../../pages/Lessons/store/actions'
// components
import Label from '../../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

LessonNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentLesson: PropTypes.object,
};

export default function LessonNewEditForm({ isEdit, currentLesson }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { CourseId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [checked, setChecked] = useState(true);

  const NewLessonSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(8),
    description: Yup.string().required('Description is required').min(1),
    order: Yup.number(),
    active: Yup.boolean(),
    courseId: Yup.string(),

  });

  const defaultValues = useMemo(
    () => ({
      name: currentLesson?.name || '',
      description: currentLesson?.description || '',
      order: currentLesson?.order || '',
      active: currentLesson?.active || checked,
      courseId: CourseId || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentLesson]
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
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentLesson) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentLesson]);

  const onSubmit = async () => {
    try {
      if (currentLesson) {
        dispatch(updateLesson(currentLesson.id, defaultValues))
      } else {
        dispatch(createLesson(defaultValues));
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.lesson(CourseId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'avatarUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
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
  const handleLectures = (e) => {
    const lectures = e.target.value;
    setValue('lectures', String(e.target.value))
    defaultValues.lectures = lectures;
  };
  const handleOrder = (e) => {
    const order = e.target.value;
    setValue('order', Number(e.target.value))
    defaultValues.order = order;
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
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
              <RHFTextField name="name" label="Lesson Name" onChange={(e) => handleName(e)} />
              <RHFTextField name="description" label="Description" multiline rows={5} onChange={(e) => handleDescription(e)} />
              <RHFTextField name="order" label="Order" onChange={(e) => handleOrder(e)} />
              <FormGroup sx={{marginLeft:'10px'}}>
                <FormControlLabel
                  control={<Switch size="large" checked={checked} onChange={handleChange} />}
                  label="Active"
                  sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                />
              </FormGroup>
            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Lesson' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>{}       
        </Grid>
      </Grid>
    </FormProvider>
  );
}

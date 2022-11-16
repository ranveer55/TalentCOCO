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
import { styled } from '@mui/material/styles';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, FormGroup, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { useDispatch, useSelector } from '../../../../redux/store';
// utils
import { fData } from '../../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock
import { countries } from '../../../../_mock';
import { createLecture, updateLecture } from '../../../../pages/Lectures/store/actions'
// components
import Label from '../../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar, RHFEditor } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

LectureNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentLecture: PropTypes.object,
};
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function LectureNewEditForm({ isEdit, currentLecture }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { CourseId, lessonId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [checked, setChecked] = useState(false);
  const NewLectureSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3),
    description: Yup.string().required('Description is required').min(1),
    lessonId: Yup.string().required('Description is required').min(1),
    type: Yup.string(),
    body: Yup.string(),
    order: Yup.number(),
    active: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentLecture?.name || '',
      description: currentLecture?.description || '',
      type: currentLecture?.type || '',
      order: currentLecture?.order || '',
      body: currentLecture?.body || '',
      lessonId: lessonId || '',
      active: currentLecture?.active || checked,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentLecture]
  );

  const methods = useForm({
    resolver: yupResolver(NewLectureSchema),
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
    if (isEdit && currentLecture) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentLecture]);

  const onSubmit = async () => {
    try {
      if (currentLecture) {
        dispatch(updateLecture(currentLecture.id, defaultValues))
      } else {
        dispatch(createLecture(defaultValues));
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.lecture(CourseId, lessonId));
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
  const handleType = (e) => {
    const type = e.target.value;
    setValue('type', String(e.target.value))
    defaultValues.type = type;
  };
  const handleOrder = (e) => {
    const order = e.target.value;
    setValue('order', Number(e.target.value))
    defaultValues.order = order;
  };
  const handleBody = (e) => {
    setValue('body', String(e))
    defaultValues.body = e;
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
              <RHFTextField name="name" label="Lecture Name" onChange={(e) => handleName(e)} />
              <RHFTextField name="description" label="Description" multiline rows={5} onChange={(e) => handleDescription(e)} />
              <div>
                <LabelStyle>Body</LabelStyle>
                <RHFEditor simple name="body" onChange={(e) => handleBody(e)} />
              </div>
              <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={defaultValues.type}
                    label="Type"
                    onChange={(e) => handleType(e)}
                  >
                    <MenuItem value={'text'}>text</MenuItem>
                    <MenuItem value={'mcq'}>mcq</MenuItem>
                    <MenuItem value={'coding'}>coding</MenuItem>
                    <MenuItem value={'exercise'}>exercise</MenuItem>
                  </Select>
                </FormControl>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Box
                sx={{
                  display: 'grid',
                  rowGap: 3,
                  
                }}
              >
                <RHFTextField name="order" label="Order" onChange={(e) => handleOrder(e)} />
                 <FormGroup sx={{marginLeft:'10px'}}>
                  <FormControlLabel
                    control={<Switch size="large" checked={checked} onChange={handleChange} />}
                    label="Active"
                    labelPlacement="start"
                    sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                  />
                </FormGroup>

              </Box>
            </Stack>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Lecture' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { capitalize, unescape } from 'lodash';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import { Box, MobileStepper, Button, Snackbar, Card, Grid, Stack, Switch, Typography, FormControlLabel, FormGroup, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import LinearProgress from '@mui/material/LinearProgress';
import { useDispatch, useSelector } from '../../../../redux/store';

// utils
import { fData } from '../../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock
import { countries } from '../../../../_mock';
import { createLecture, getLecture, getLectures, updateLecture } from '../../../../pages/Lectures/store/actions'
// components
import Label from '../../../../components/Label';
// import LectureMcq from '../../../../pages/MCQ/LectureMcq'
import McqList from '../../../../pages/MCQ/McqList'
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar, RHFEditor } from '../../../../components/hook-form';

// ----------------------------------------------------------------------



LectureNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  lecture: PropTypes.object,
};
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));


export default function LectureNewEditForm({ isEdit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t, setT] = useState();
  const { id, CourseId, lessonId } = useParams();
  const [checked, setChecked] = useState(true);
  const [type, setTypeChange] = useState('');
  const [open, setTypeChangeOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { lecture: { lecture,lectures ,isLoading }, app: { masterdata } } = useSelector((state) => state);
  const Order = lectures && lectures.length > 0 ? Math.max(...lectures.map(item => item?.order + 1)) : 1;
  const LectureTypes = masterdata && masterdata.LectureTypes ? masterdata.LectureTypes : [];
  const LectureSubTypes = masterdata && masterdata.LectureSubTypes ? masterdata.LectureSubTypes : [];
   useEffect(() => {
    if (id) {
      dispatch(getLecture(id));
    }
    if (lessonId) {
      dispatch(getLectures(lessonId));
    }

  }, [dispatch]);

  const NewLectureSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3),
    body: Yup.string().required('Body is required').min(1),
    lessonId: Yup.string().required('Lesson is required').min(1),
    type: Yup.string(),
    subtype: Yup.string(),
    order: Yup.number(),
    active: Yup.boolean(),
    mcq: Yup.array(),
  });

  const defaultValues = useMemo(
    () => ({
      name: lecture?.name || '',
      type: lecture?.type || 'text',
      subtype: lecture?.subtype || 'react',
      order: lecture?.order || Order,
      body: lecture?.body || '',
      lessonId: lessonId || '',
      active: lecture?.active || checked,
      mcq: lecture?.mcq || [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lecture]
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
    if (isEdit && lecture) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, lecture]);

  const cb = () => {
    reset();
    navigate(`/dashboard/course/${CourseId}/lesson/${lessonId}`)
  }

  const onSubmit = async () => {
    try {
      const payload = defaultValues;
      if (lecture) {
        dispatch(updateLecture(lecture.id, payload, cb))
      } else {

        dispatch(createLecture(payload, cb));
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
  const handleTypeChange = (e) => {
    const typeChange = e.target.value;
    setTypeChangeOpen(true)
    setTypeChange(typeChange)
      };
  const handleType = (e) => {
    setLoading(true);
    setTypeChangeOpen(false)
    setValue('type', String(type))
    defaultValues.type = type;
    setLoading(false);
    };
  const handleClose = () => {
    setTypeChangeOpen(false)
    setLoading(false)
  };

  const handleSubType = (e) => {
    const subtype = e.target.value;
    setValue('subtype', String(subtype))
    defaultValues.subtype = subtype;
  };

  const handleBody = (e) => {
    setValue('body', String(e))
    defaultValues.body = e;

  };

  const handleChange = (e) => {
    const active = e.target.checked;
    setValue('active', Boolean(e.target.checked))
    defaultValues.active = active;
    setChecked(active)
  };
  const setMCQOrder = (val) => {

    setValue('mcq', val)
    defaultValues.mcq = val;
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

              {defaultValues.type !== 'mcq' && <div>
                <LabelStyle>Body</LabelStyle>
                <RHFEditor simple name="body" onChange={(e) => handleBody(e)} />
              </div>}
              {defaultValues.type === 'MCQ' && <McqList isLoading={isLoading} lecture={isEdit ? lecture : defaultValues} setMCQOrder={setMCQOrder} />}


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
              > <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={defaultValues.type}
                    label="Type"
                    onChange={(e) => handleTypeChange(e)}
                  >{
                      LectureTypes.map((item) => <MenuItem key={item} value={item}>{capitalize(item)}</MenuItem>)
                    }
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel id="demo-simple-select-label">Sub Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={defaultValues.subtype}
                    label="SubType"
                    onChange={(e) => handleSubType(e)}
                  >
                    {
                     LectureSubTypes.map((item) => <MenuItem key={item} value={item}>{capitalize(item)}</MenuItem>)
                    }
                    </Select>
                </FormControl>
                <FormGroup sx={{ marginLeft: '10px' }}>
                  <FormControlLabel
                    control={<Switch size="large" name='active' checked={checked} onChange={handleChange} />}
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

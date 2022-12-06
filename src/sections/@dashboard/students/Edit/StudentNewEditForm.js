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
import { createStudent, getStudent, getStudents, updateStudent } from '../../../../pages/Students/store/actions'
// components
import Label from '../../../../components/Label';
// import StudentMcq from '../../../../pages/MCQ/StudentMcq'
import McqList from '../../../../pages/MCQ/McqList'
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar, RHFEditor } from '../../../../components/hook-form';

// ----------------------------------------------------------------------



StudentNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  student: PropTypes.object,
};
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));


export default function StudentNewEditForm({ isEdit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t, setT] = useState();
  const { id, CourseId, lessonId } = useParams();
  const [checked, setChecked] = useState(true);
  const [type, setTypeChange] = useState('');
  const [open, setTypeChangeOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { student: { student,students ,isLoading }, app: { masterdata } } = useSelector((state) => state);
   useEffect(() => {
    if (id) {
      dispatch(getStudent(id));
    }
    if (lessonId) {
      dispatch(getStudents(lessonId));
    }

  }, [dispatch]);

  const NewStudentSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required').min(3),
    lastName: Yup.string().required('Last Name is required').min(3),
    email: Yup.string().required('Email is required').email(),
    mobileNo:Yup.string().required('Mobile No is required'),
    location:Yup.string().required('Location No is required'),
  });

  const defaultValues = useMemo(
    () => ({
     firstName: student?.firstName || '',
     lastName: student?.lastName || '',
     email: student?.email || '',
     mobileNo: student?.mobileNo || '',
     location: student?.location || '',
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [student]
  );


  const methods = useForm({
    resolver: yupResolver(NewStudentSchema),
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
    if (isEdit && student) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, student]);

  const cb = () => {
    reset();
    navigate(PATH_DASHBOARD.student.root)
  }

  const onSubmit = async () => {
    try {
      const payload = defaultValues;
      if (student) {
        dispatch(updateStudent(student.id, payload, cb))
      } else {

        dispatch(createStudent(payload, cb));
      }

    } catch (error) {
      console.error(error);
    }
  };


  const handleChange = (e) => {
    const {name, value} =e.target;
    setValue(name, value)
    defaultValues[name] = value;
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
              <RHFTextField name="firstName" label="First Name" onChange={handleChange}/>
              <RHFTextField name="lastName" label="Last Name" onChange={handleChange}/>
              <RHFTextField name="email" label="Email" onChange={handleChange}/>
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
              <RHFTextField name="mobileNo" label="Mobile No" onChange={handleChange}/>
              <RHFTextField name="location" label="Location" onChange={handleChange}/>
              </Box>
            </Stack>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Student' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      </FormProvider>
  );
}

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
import { Box, MobileStepper, Button, Snackbar, Card, Grid, Stack, Switch, Typography, FormControlLabel, FormGroup, InputLabel, Select, MenuItem, FormControl, Input, Radio } from '@mui/material';
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
import { createCohort, getCohort, getCohorts, updateCohort } from '../../../../pages/Cohort/store/actions'
// components
import Label from '../../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar, RHFEditor } from '../../../../components/hook-form';

// ----------------------------------------------------------------------



CohortNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  cohort: PropTypes.object,
};
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));


export default function CohortNewEditForm({ isEdit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t, setT] = useState();
  const { id, CourseId, lessonId } = useParams();
  const [checked, setChecked] = useState(true);
  const [type, setTypeChange] = useState('');
  const [open, setTypeChangeOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { cohort: { cohort, cohorts, isLoading }, app: { masterdata } } = useSelector((state) => state);
  useEffect(() => {
    if (id) {
      dispatch(getCohort(id));
    }
    if (lessonId) {
      dispatch(getCohorts(lessonId));
    }

  }, [dispatch]);

  const NewCohortSchema = Yup.object().shape({
    cohortName: Yup.string().required('CohortName is required').min(3),
    senderEmail: Yup.string().required('SenderEmail is required').email(),
    profileQuestionnaire: Yup.string().required('Profile Questionnaire is required'),
    archive: Yup.string().required('Archive No is required'),
    cohortStartDate: Yup.string().required('Cohort Start Date No is required'),
  });

  const defaultValues = useMemo(
    () => ({
      cohortName: cohort?.cohortName || '',
      senderEmail: cohort?.senderEmail || '',
      profileQuestionnaire: cohort?.profileQuestionnaire || true,
      archive: cohort?.archive ||false,
      cohortStartDate: cohort?.cohortStartDate || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cohort]
  );


  const methods = useForm({
    resolver: yupResolver(NewCohortSchema),
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
    if (isEdit && cohort) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, cohort]);

  const cb = () => {
    reset();
    navigate(PATH_DASHBOARD.cohort.root)
  }

  const onSubmit = async () => {
    try {
      const payload = defaultValues;
      if (cohort) {
        dispatch(updateCohort(cohort.id, payload, cb))
      } else {

        dispatch(createCohort(payload, cb));
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
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
              }}
            >
              <RHFTextField name="cohortName" label="Cohort Name" onChange={handleChange} />
              <RHFTextField name="senderEmail" label="Sender Email" onChange={handleChange} />
              <Grid container>
              <Grid item xs={12} md={3}>
              <LabelStyle style={{ marginTop: "18px" }}>Profile Required</LabelStyle>
              </Grid>
              <Grid item xs={12} md={2}>
              <Radio
                name="profileQuestionnaire"
                label="Email"
                style={{ margin: 10 }}
                type="radio"
                placeholder="Cohort Name"
                checked={defaultValues.profileQuestionnaire === true}
                onChange={handleChange} /><span style={{ margin: 10 }}> Yes</span>
                </Grid>
                <Grid item xs={12} md={2}>
              <Radio
                name="profileQuestionnaire"
                label="Email"
                style={{ margin: 10 }}
                type="radio"
                placeholder="Cohort Name"
                checked={defaultValues.profileQuestionnaire !== true}
                onChange={handleChange} /><span style={{ margin: 10 }}> No</span>
                </Grid>
                </Grid>
              <Grid container>
              <Grid item xs={12} md={3}>
              <LabelStyle style={{ marginTop: "18px" }}>Archived</LabelStyle>
              </Grid>
              <Grid item xs={12} md={2}>
              <Radio
                name="archive"
                label="Email"
                style={{ margin: 10 }}
                type="radio"
                placeholder="Cohort Name"
                checked={defaultValues.archive === true}
                onChange={handleChange} /><span style={{ margin: 10 }}> Yes</span>
                </Grid>
                <Grid item xs={12} md={2}>
              <Radio
                name="archived"
                label="Email"
                style={{ margin: 10 }}
                type="radio"
                placeholder="Cohort Name"
                checked={defaultValues.archive !== true}
                onChange={handleChange} /><span style={{ margin: 10 }}> No</span>
                </Grid>
                </Grid>
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
                <RHFTextField name="cohortStartDate" label="Cohort StartDate" onChange={handleChange} />
              </Box>
            </Stack>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Cohort' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

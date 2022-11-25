import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import Editor from "@monaco-editor/react";
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
import { useDispatch, useSelector } from '../../../../redux/store';
// utils
import { fData } from '../../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock
import { countries } from '../../../../_mock';
import { createTestCase, getTestCase, getTestCases, updateTestCase } from '../../../../pages/TestCase/store/actions'
// components
import Label from '../../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar, RHFEditor } from '../../../../components/hook-form';



// ----------------------------------------------------------------------



TestCaseNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  testcase: PropTypes.object,
};
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function TestCaseNewEditForm({ isEdit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t, setT] = useState();
  const { id, CourseId, lessonId, lectureId } = useParams();
  const [checked, setChecked] = useState(true);
  const { testcase: { testcase,  isLoading }, app: { masterdata } } = useSelector((state) => state);
  useEffect(() => {
    if (id) {
      dispatch(getTestCase(id));
    }
    if (lessonId) {
      dispatch(getTestCases(lectureId));
    }

  }, [dispatch]);

  const NewTestcaseSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3),
    lecture: Yup.string().required('Lecture is required'),
    test: Yup.string().required('Test Script is required'),
    index: Yup.string().required('Index Script is required'),
    active: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: testcase?.name || '',
      test: testcase?.test || '//write you test case here',
      index: testcase?.index || '//write candidate index file',
      lecture: lectureId,
      active: testcase?.active || checked,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [testcase]
  );


  const methods = useForm({
    resolver: yupResolver(NewTestcaseSchema),
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
    if (isEdit && testcase) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, testcase]);

  const cb = () => {
    reset();
    navigate(`/dashboard/course/${CourseId}/lesson/${lessonId}/lecture/${lectureId}`)
  }

  const onSubmit = async () => {
    try {
      const payload = defaultValues;
      if (testcase) {
        dispatch(updateTestCase(testcase.id, payload, cb))
      } else {

        dispatch(createTestCase(payload, cb));
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

  const handleInput = (e) => {
    const name = e.target.value;
    setValue('input', String(e.target.value))
    defaultValues.input = name;
  };

  const handleOutput = (e) => {
    const name = e.target.value;
    setValue('output', String(e.target.value))
    defaultValues.output = name;
  };

  const handleChange = (e) => {
    const active = e.target.checked;
    setValue('active', Boolean(e.target.checked))
    defaultValues.active = active;
    setChecked(active)
  };

  const handleEditorChange = (value, event) => {
    setValue('index', value)
    defaultValues.index = value;
  }

  const handleEditorChangeTest = (value, event) => {
    setValue('test', value)
    defaultValues.test = value;
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3 }}>
          <Box
              sx={{
                display: 'grid',
                rowGap: 3,
              }}
            >
            <RHFTextField name="name" label="TestCase Name" onChange={(e) => handleName(e)} />
           {!isLoading ?  <Grid container direction="row" spacing={3} sx={{mt:2}}>
              <Grid item xs={12}>
                <Typography variant='p'>Write your test case script</Typography>
              </Grid>
              <Grid item xs={12} >

                <Editor
                  height="300px"
                  theme='vs-dark'
                  defaultLanguage={defaultValues.language ?? 'javascript'}
                  defaultValue={defaultValues.test}
                  onChange={handleEditorChangeTest}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Write your index file for candidate </Typography>

              </Grid>
              <Grid item xs={12}>
                <Editor
                  height="300px"
                  theme='vs-dark'
                  defaultLanguage={defaultValues.language ?? 'javascript'}
                  defaultValue={defaultValues.index}
                  onChange={handleEditorChange}
                />
              </Grid>
            </Grid>: null}
            </Box>
          </Card>
        </Grid>


        <Grid item xs={12} md={5}>
        <Card sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'grid',
              rowGap: 3,
            }}
          >
        <FormGroup sx={{ marginLeft: '10px' }}>
              <FormControlLabel
                control={<Switch size="large" name='active' checked={checked} onChange={handleChange} />}
                label="Active"
                labelPlacement="start"
                sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
              />
            </FormGroup>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Box>
          </Card>
        </Grid>
      </Grid>

    </FormProvider >
  );
}

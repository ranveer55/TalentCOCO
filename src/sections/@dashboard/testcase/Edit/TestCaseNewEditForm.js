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
import { createTestCase, getTestCase, getTestCases, updateTestCase, evaluateSolution,clearTestCase } from '../../../../pages/TestCase/store/actions'
// components
import Label from '../../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar, RHFEditor } from '../../../../components/hook-form';

import TestCaseFiles from './TestCaseFiles'

// ----------------------------------------------------------------------



TestCaseNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  testcase: PropTypes.object,
};
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0),
}));
const newFileStudent = { name: 'index.js', 'code': '//your Student code' };
const newFileSolution = { name: 'index.js', 'code': '//your solution code' };
const newFileEvalution = { name: 'index.js', 'code': '//your evaluation code' };

export default function TestCaseNewEditForm({ isEdit }) {
  const [files, setFile] = useState({
    Student: [newFileStudent],
    Solution: [newFileSolution],
    Evaluation: [newFileEvalution],
    currentFileIndex: 0,
    currentFileType: 'Student',
    index: 1
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t, setT] = useState();
  const [disabled, setDisabled] = useState(true);
  const { id, CourseId, lessonId, lectureId } = useParams();
  const [checked, setChecked] = useState(true);
  const { testcase: { testcase, isLoading }, app: { masterdata } } = useSelector((state) => state);

  useEffect(() => {
    setFile(
      {
        Student: testcase?.index ?? [newFileStudent],
        Solution: testcase?.solution ?? [newFileSolution],
        Evaluation: testcase?.test ?? [newFileEvalution],
        currentFileIndex: 0,
        currentFileType: 'Student',
        index: 1
      }
    )

  }, [testcase])

  useEffect(() => {
    if (id) {
      dispatch(getTestCase(id));
    }
    if (lessonId) {
      dispatch(getTestCases(lectureId));
    }

  }, [dispatch]);


  useEffect(()=>{
    console.log(';;')
    return ()=>dispatch(clearTestCase())
  },[])

  const NewTestcaseSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3),
    lecture: Yup.string().required('Lecture is required'),
    active: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: testcase?.name || '',
      test: testcase?.test || [],
      index: testcase?.index || [],
      solution: testcase?.solution || [],
      body: testcase?.body || 'Task Description',
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
      payload.index = files.Student
      payload.solution = files.Solution
      payload.test = files.Evaluation
      if (testcase) {
        dispatch(updateTestCase(testcase.id, payload, cb))
      } else {

        dispatch(createTestCase(payload, cb));
      }

    } catch (error) {
      console.error(error);
    }
  };
 
  
  const evaluate = () => {
    dispatch(evaluateSolution(files, setDisabled));
  }


  const handleName = (e) => {
    const name = e.target.value;
    setValue('name', String(e.target.value))
    defaultValues.name = name;
  };

  const handleChange = (e) => {
    const active = e.target.checked;
    setValue('active', Boolean(e.target.checked))
    defaultValues.active = active;
    setChecked(active)
  };


  const handleBody = (e) => {
    setValue('body', String(e))
    defaultValues.body = e;

  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>

          <Card sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
              }}
            >
              <RHFTextField name="name" label="TestCase Name" onChange={(e) => handleName(e)} />
              <Typography variant='h6'>Problem statement</Typography>
              <Typography variant='p'>
                This is the problem that your students will try to solve. Be as descriptive as you can. Remember your students won’t necessarily be able to ask clarifying questions.

              </Typography>
              <RHFEditor simple name="body" onChange={(e) => handleBody(e)} />
              <TestCaseFiles files={files} setFile={setFile}  key={testcase?.id}/>

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
              <FormGroup sx={{ marginLeft: '10px' }}>
                <FormControlLabel
                  control={<Switch size="large" name='active' checked={checked} onChange={handleChange} />}
                  label="Active"
                  labelPlacement="start"
                  sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                />
              </FormGroup>
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton disabled={disabled} type="submit" variant="contained" loading={isSubmitting}>
                  Save Changes
                </LoadingButton>

              </Stack>
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>

                <LoadingButton onClick={evaluate} type="button" variant="contained" loading={isLoading}>
                  Check Solution
                </LoadingButton>
              </Stack>
            </Box>
          </Card>
        </Grid>
      </Grid>

    </FormProvider >
  );
}

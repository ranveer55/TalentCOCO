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
import { createTestCase, getTestCase, getTestCases, updateTestCase, evaluateSolution, clearTestCase } from '../../../../pages/TestCase/store/actions'
// components
import Label from '../../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar, RHFEditor } from '../../../../components/hook-form';

import TestCaseFiles from './TestCaseFiles'
import LanguageSelect from './LanguageSelect'

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

const getExtFromLanguage = (name) => {
  let ext = '';
  switch (name) {
    case 'vanilla':
      ext = 'js'
      break;
    case 'javascript':
      ext = 'js'
      break;
    case 'react':
      ext = 'js'
      break;
    case 'python':
      ext = 'py'
      break;

    default:
      break;
  }
  return ext;
}
const jsSample = { "Student": [{ "name": "index.js", "code": "function sum(a, b) {\r\n    return a + b;\r\n  }\r\nmodule.exports = sum;\r\n" }], "Solution": [{ "name": "index.js", "code": "function sum(a, b) {\r\n    return a + b;\r\n  }\r\nmodule.exports = sum;\r\n" }], "Evaluation": [{ "name": "index.js", "code": "test('adds 1 + 2 to equal 3', () => {\r\n  expect(sum(1, 2)).toBe(3);\r\n});" }], "currentFileIndex": 0, "currentFileType": "Student", "index": 1 }
const pySample = { "Student": [{ "name": "index.py", "code": "def add(a,b):\r\n    return a+b" }], "Solution": [{ "name": "index.py", "code": "def add(a,b):\r\n    return a+b" }], "Evaluation": [{ "name": "index.py", "code": "import sys\r\n\r\nimport unittest\r\nfrom unittest import TestCase\r\nclass Evaluate(TestCase):\r\n    def test_add(self):\r\n        import index\r\n        # import index  # Imports and runs student's solution\r\n        output = index.add(10,5)  # Returns output since this function started\r\n        self.assertEqual(output,15)\r\n\r\n" }], "currentFileIndex": 0, "currentFileType": "Evaluation", "index": 1, "language": "python" }

export default function TestCaseNewEditForm() {
  const [language, setLanguage] = useState('javascript');
  const [files, setFile] = useState(language === 'python' ? pySample : jsSample)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [t, setT] = useState();
  const [disabled, setDisabled] = useState(true);
  const { courseId, lectureId } = useParams();
  const [checked, setChecked] = useState(true);
  const { testcase: { testcase, isEVLoading, isLoading }, app: { masterdata } } = useSelector((state) => state);

  useEffect(() => {
    if (testcase && testcase.index.length > 0) {
      setFile(
        {
          Student: testcase.index,
          Solution: testcase.solution,
          Evaluation: testcase?.test,
          currentFileIndex: 0,
          currentFileType: 'Student',
          index: 1,
          language
        }
      )
    } else {
      setFile(language === 'python' ? pySample : jsSample)
    }


  }, [testcase])




  // useEffect(() => {
  //   return () => dispatch(clearTestCase())
  // }, [])

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
    setFile(language === 'python' ? pySample : jsSample)
  }, [language])

  const cb = () => {
    reset();
    navigate(`/dashboard/course/${courseId}`)
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
    dispatch(evaluateSolution({...files,language}, setDisabled));
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
  const onlanguagechange = (e) => {
    setValue('subtype', String(e))
    defaultValues.subtype = e;
    setLanguage(e)

  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!defaultValues.subtype ? <LanguageSelect onClose={onlanguagechange} open languages={masterdata ? masterdata.LectureSubTypes : []} /> : null}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>

          <Card sx={{ p: 2 }}>
            <Stack direction="column" spacing={2}>
              <RHFTextField name="name" label="TestCase Name" onChange={(e) => handleName(e)} />
              <Typography variant='h6'>Problem statement</Typography>
              <Typography variant='p'  >
                This is the problem that your students will try to solve. Be as descriptive as you can. Remember your students won’t necessarily be able to ask clarifying questions.

              </Typography>
              <RHFEditor simple name="body" onChange={(e) => handleBody(e)} />
              <TestCaseFiles files={files} setFile={setFile} key={language + testcase?.id} />
            </Stack>

          </Card>
        </Grid>


        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <FormGroup sx={{ marginLeft: '10px' }}>
              <FormControlLabel
                control={<Switch size="large" name='active' checked={checked} onChange={handleChange} />}
                label="Active"
                labelPlacement="start"
                sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
              />
            </FormGroup>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton disabled={disabled} type="submit" variant="contained" loading={isLoading}>
                Save Changes
              </LoadingButton>

            </Stack>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>

              <LoadingButton onClick={evaluate} type="button" variant="contained" loading={isEVLoading}>
                Check Solution
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>

    </FormProvider >
  );
}

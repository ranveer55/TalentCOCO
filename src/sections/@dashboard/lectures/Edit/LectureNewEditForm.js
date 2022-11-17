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
import { createLecture, updateLecture } from '../../../../pages/Lectures/store/actions'
// components
import Label from '../../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar, RHFEditor } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const quizSets = [
  {
    queno: "que_1",
    que: "1) How many sides are equal in a scalene triangle?",
    options: [{ que_options: "3", selected: false }, { que_options: "2", selected: false }, { que_options: "0", selected: false }],
    ans: "0"
  },
  {
    queno: "que_2",
    que: "2) The angles of a triangle are 90°,35° and 55°.What type of triangle is this?",
    options: [{ que_options: "Right Angled", selected: false }, { que_options: "Obtuse Angled", selected: false }, { que_options: "Acute Angled", selected: false }],
    ans: "Right Angled"
  },
  {
    queno: "que_3",
    que: "3) The perimeter of an equilateral triangle is 24cm.Length of each side(in cm) is?",
    options: [{ que_options: "9", selected: false }, { que_options: "6", selected: false }, { que_options: "8", selected: false }],
    ans: "8"
  },
  {
    queno: "que_4",
    que: "4) The sum of angles of a triangle is?",
    options: [{ que_options: "90", selected: false }, { que_options: "150", selected: false }, { que_options: "180", selected: false }],
    ans: "180"
  },
  {
    queno: "que_5",
    que: "5) A triangle has angles 60°,60° and 60°.State the type of triangle?",
    options: [{ que_options: "Isosceles", selected: false }, { que_options: "Equilateral", selected: false }, { que_options: "Scalene", selected: false }],
    ans: "Equilateral"
  },
  {
    queno: "que_6",
    que: "6) What is a third angle for a triangle where angle1 = 57° and angle2 = 92° ?",
    options: [{ que_options: "45", selected: false }, { que_options: "60", selected: false }, { que_options: "31", selected: false }],
    ans: "31"
  },
  {
    queno: "que_7",
    que: "7) Pythagoras theorem is applicable to which type of triangles?",
    options: [{ que_options: "Right", selected: false }, { que_options: "Acute", selected: false }, { que_options: "Obtuse", selected: false }],
    ans: "Right"
  },
  {
    queno: "que_8",
    que: "8) The triangle which has 2 sides congruent?",
    options: [{ que_options: "Equilateral", selected: false }, { que_options: "Isosceles", selected: false }, { que_options: "Scalene", selected: false }],
    ans: "Isosceles"
  }
]

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
  const [activeStep, setActiveStep] = useState(0);
  const [quizSet, setquizSet] = useState(quizSets);
  const [booleanonsubmit, setBooleanonSubmit] = useState(false);
  const [Total, setTotal] = useState(0);
  const [open, setOpen] = useState(0);
  const [catchmsg, setCatchmsg] = useState('');
  const [errormsg, setErrormsg] = useState('');
  const NewLectureSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3),
    description: Yup.string().required('Description is required').min(1),
    lessonId: Yup.string().required('Description is required').min(1),
    type: Yup.string(),
    body: Yup.string(),
    video: Yup.object(),
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
      video: currentLecture?.video || '',
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

  const handleNext = () => {
    setActiveStep({ activeStep: activeStep + 1 })
  }

  const handleBack = () => {
    setActiveStep({ activeStep: activeStep - 1 })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen({ open: false })
  };

  const onInputChange = (e) => {

    const nexState = quizSet.map(card => {
      if (card.queno !== e.target.name) return card;
      return {
        ...card,
        options: card.options.map(opt => {
          const checked = opt.queQptions === e.target.value;
          return {
            ...opt,
            selected: checked
          }
        })
      }
    });
    setquizSet({ quizSet: nexState })
  }

  const onsubmit = () => {
    const list = quizSet;
    let count = 0;
    let notattempcount = 0;

    list.forEach((item, key) => {
      if (item.selected === true) {
        if (item.queQptions === item.ans) {
          count += 1;
        }
      } else {
        notattempcount += 1
      }
    })


    if (notattempcount <= 24 && notattempcount > 16) {
      setBooleanonSubmit({ booleanonsubmit: false, Total: count })
      setCatchmsg({ catchmsg: "Please attempt all questions", errormsg: "error", open: true })
    } else {
      setBooleanonSubmit({ booleanonsubmit: true, Total: count })
    }
  }


  const Snackbarrender = () => {
    return (
      open ? <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} style={{ marginTop: '0px', width: '100%' }}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity={errormsg} >
          {catchmsg}
        </Alert>
      </Snackbar> : null
    )
  }


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
  const handleVideo = (e) => {
    const url={
      src: `https://www.youtube.com`,
      url: e.target.value
    }
     setValue('video', String(e.target.value))
    defaultValues.video = url;
      };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(defaultValues)
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
                  <MenuItem value={'video'}>video</MenuItem>
                  <MenuItem value={'exercise'}>exercise</MenuItem>
                </Select>
              </FormControl>
              {defaultValues.type === 'coding' ? <div>
                <LabelStyle>Body</LabelStyle>
                <RHFEditor simple name="body" onChange={(e) => handleBody(e)} />
              </div> : defaultValues.type === 'video' && <>
                <LabelStyle>Video</LabelStyle>
                <RHFTextField name="video" label="Video Url" onChange={(e) => handleVideo(e)} />
              </> || defaultValues.type === 'mcq' && <>
                <div className="Quiz_render_container">
                  {booleanonsubmit ?
                    <div className="Quiz-DisplayResult">
                      <h2> The score is {Total} Out Of 8 </h2>
                      <Button onClick={() => { setBooleanonSubmit({ booleanonsubmit: false }) }}> Try again </Button>
                    </div>
                    :
                    <div className="Quiz_container_display">
                      {quizSet.map((item, index) => {
                        if (Math.abs(activeStep - index) <= 0) {
                          return (
                            <Paper elevation={0} sx={{ backgroundColor: '#F5F5F5', height: '360px', padding: '20px' }}>
                              <div className="Quiz_que" >{item.que}</div>

                              {item.options.map((ans, indexAans) => {
                                indexAans += 1
                                return (
                                  <Card key={indexAans} sx={{ height: '60px', width: '210px', marginTop: '20px', padding: '15px' }}>
                                    <input
                                      key={indexAans}
                                      type="radio"
                                      name={item.queno}
                                      value={ans.queQptions}
                                      checked={!!ans.selected}
                                      onChange={onInputChange}

                                    />
                                    <span sx={{ marginRight: '25px' }} >{indexAans}</span>
                                    <span sx={{ marginLeft: '25px' }}  >{ans.queQptions}</span>
                                  </Card>
                                )
                              })}


                            </Paper>
                          )
                        }

                        return (null)


                      })}

                      <div className="Quiz-MobileStepper">
                        <MobileStepper variant="dots" steps={quizSet.length} position="static" activeStep={activeStep}
                          nextButton={
                            activeStep === 7 ?
                              <Button size="small" onClick={onsubmit}>
                                Submit
                              </Button>
                              :
                              <Button size="small" onClick={handleNext} disabled={activeStep === quizSet.length}>
                                Next
                              </Button>

                          }
                          backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                              Back
                            </Button>
                          }
                        />
                      </div>
                    </div>
                  }
                  {Snackbarrender}
                </div>
              </>}
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
                <FormGroup sx={{ marginLeft: '10px' }}>
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

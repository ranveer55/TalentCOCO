import * as Yup from 'yup';
import { useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Card, Chip, Stack, Button, TextField, Switch, Box, Typography, Link } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import LinearProgress from '@mui/material/LinearProgress';
import Iconify from '../../components/Iconify';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { useDispatch, useSelector } from '../../redux/store';
// components
import { FormProvider, RHFTextField } from '../../components/hook-form';
import { createCodingExercise, updateCodingExercise, deleteCodingExercise } from './store/actions';
// ----------------------------------------------------------------------

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));
const LoadingButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#90EE90",
  color: '#299617',
  height: '42px',
  marginTop: '-3px'
}));
const SimpleButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: '#52a447',
  borderRadius: 4,
  borderColor: '#5bb450',
  boxShadow: '0 0 0 0.2rem ',
}));
const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#46923c",
  height: '42px',
  marginTop: '-3px'
}));

export default function CodingExercise() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [exerciseId, setExerciseId] = useState(null);
  const lecture = useSelector((state) => state.coursefigma.lecture);
  const codingexercise = useSelector((state) => state.coursefigma.codingexercise);
  const NewSectionSchema = Yup.object().shape({
    name: Yup.string().required('Title is required'),
    lecture: Yup.string().required('Lecture is required'),
    body: Yup.string().required('Task Description is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      body: 'Task Description',
      lecture: '638b37d05b3c151f8c262f6e'
    }),
    []
  );


  const methods = useForm({
    resolver: yupResolver(NewSectionSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const cb = () => {
    reset();
    setOpen(true)
  }

  const CallBackExercise = (codingExercise) => {
    setOpen(false);
    if (codingExercise) {
      defaultValues.name = codingExercise.name;
      defaultValues.body = codingExercise.body;
      setExerciseId(codingExercise.id);
    } else {
      defaultValues.name = '';
      defaultValues.body = '';
    }
  }
  const onSubmit = async () => {
    try {
      if (exerciseId) {
        dispatch(updateCodingExercise(exerciseId, defaultValues, cb));
      } else {
        dispatch(createCodingExercise(defaultValues, cb));
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
  const handleBody = (e) => {
    const body = e.target.value;
    setValue('body', String(e.target.value))
    defaultValues.body = body;
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!open ? (
        <>
           <Grid container spacing={3} sx={{ marginTop: "20px" }}>
            <Grid item xs={12} md={1}>{ }</Grid>
            <Grid item xs={12} md={7}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Grid container>
                    <Grid item xs={12} md={2} sx={{ marginTop: '20px' }}>
                      <LabelStyle sx={{ marginLeft: '10px' }}>Section</LabelStyle>
                    </Grid>
                    <Grid item xs={12} md={8} >
                      <FormControl sx={{ m: 1 }} variant="standard">
                        <BootstrapInput id="demo-customized-textbox" sx={{ width: '565px' }} onChange={(e) => handleName(e)} />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} md={2} sx={{ marginTop: '20px' }}>
                      <LabelStyle sx={{ marginLeft: '10px' }}>Description</LabelStyle>
                    </Grid>
                    <Grid item xs={12} md={8} >
                      <RHFTextField name="description" multiline rows={3} size="small" onChange={(e) => handleBody(e)} />
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={12} md={9}>{ }</Grid>
                    <Grid item xs={12} md={2} sx={{ marginLeft: '-50px', marginTop: '10px' }}>
                      <SaveButton variant="contained" onClick={() => onSubmit()}>Add Exercise
                      </SaveButton>
                    </Grid>
                  </Grid>
                </Stack>
              </Card>
            </Grid>
          </Grid></>) : <>
        <ShowCodingExercise codingexercise={codingexercise} CallBackExercise={CallBackExercise} />
      </>}
    </FormProvider>
  );
}


// --------- ShowCodingExercise Functionn ------------


function ShowCodingExercise(props) {
  const [open, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const dispatch = useDispatch();
  const handleDeleteRow = (id) => {
    setDeleteOpen(true)
    setDeleteId(id)
  };

  const RemoveRow = () => {
    setLoading(true)
    setDeleteOpen(false)
    dispatch(deleteCodingExercise(deleteId));
    setLoading(false)
    props.CallBackExercise();
  };
  const handleClose = () => {
    setDeleteOpen(false)
    setLoading(false)
  };
  return (
    <>
      <Grid container spacing={3} sx={{ marginTop: "20px" }}>
        <Grid item xs={12} md={1}>{ }</Grid>
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Grid container>
                <Grid item xs={12} md={3}>
                  <LabelStyle> Coding Exercise:</LabelStyle>
                </Grid>
                <Grid item xs={12} md={4}>
                  {props?.codingexercise?.name}
                </Grid>
                <Grid item xs={12} md={1} ><Link href="#"><Iconify icon={'eva:edit-fill'} onClick={() => props.CallBackExercise(props?.codingexercise)} /></Link></Grid>
                <Grid item xs={12} md={1}><Link href="#"><Iconify icon={'eva:trash-2-outline'} onClick={() => handleDeleteRow(props?.codingexercise?.id)} /></Link></Grid>
                <Grid item xs={12} md={3}>{ }</Grid>
              </Grid>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

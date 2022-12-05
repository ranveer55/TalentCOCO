import * as Yup from 'yup';
import { useCallback, useState, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Card, Chip, Stack, Button, TextField, Switch, Box, Typography, Autocomplete, FormControlLabel, FormGroup, Checkbox, } from '@mui/material';
import { GridAddIcon } from '@mui/x-data-grid';
import Iconify from '../../components/Iconify';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { useDispatch, useSelector } from '../../redux/store';

// components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../components/hook-form';
//
import Curriculum from './Curriculum';
import { createSection ,updateSection} from './store/actions'
// ----------------------------------------------------------------------

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


  function Section(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.coursefigma.course);
  const { enqueueSnackbar } = useSnackbar();
  const [curriculumOpen, setCurriculum] = useState(false);
  const [sectionId, setSectionId] = useState(null);
  const NewSectionSchema = Yup.object().shape({
    name: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    courseId: Yup.string().required('CourseId is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      description: '',
      courseId: '',
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
    setCurriculum(true);
  }
  const CallBack = (section) => {
      setCurriculum(false);
      if(section){
      defaultValues.name = section.name;
      defaultValues.description = section.description;
      setSectionId(section.id);
      }else{
        defaultValues.name='';
        defaultValues.description='';
      }
  }

  const onSubmit = async () => {
    defaultValues.courseId=course?.id;
    try {
       if(sectionId){
        dispatch(updateSection(sectionId,defaultValues, cb));
       }else{
      dispatch(createSection(defaultValues, cb));
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
  const handleDescription = (e) => {
    const description = e.target.value;
    setValue('description', String(e.target.value))
    defaultValues.description = description;
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
        {!curriculumOpen ? (
          <>
          <Typography variant="h4" gutterBottom sx={{ marginTop: "60px" ,marginLeft:'150px'}}>Create Section</Typography>
        <Grid container spacing={3}>
        <Grid item xs={12} md={1}>{}</Grid>
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Grid container>
                <Grid item xs={12} md={3} sx={{ marginTop: '10px' }}>
                  <LabelStyle>New Section</LabelStyle>
                </Grid>
                <Grid item xs={12} md={8}>
                  <RHFTextField name="title" lable="Enter a Title" value={defaultValues.name} size="small" onChange={(e) => handleName(e)} />
                </Grid>
                <Grid item xs={12} md={1}>{ }</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} md={3} sx={{ marginTop: '10px' }}>{ } </Grid>
                <Grid item xs={12} md={8}>
                  <LabelStyle>What will students be able to do at the end of this section ?</LabelStyle>
                  <RHFTextField name="description" lable="Enter a Learning Objective" value={defaultValues.description} multiline rows={3} size="small" onChange={(e) => handleDescription(e)} />
                </Grid>
                <Grid item xs={12} md={1}>{ }</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} md={8}>{ }</Grid>
                <Grid item xs={12} md={2}>
                  <SimpleButton type="submit" variant="contained" onClick={()=>props.cbCourse()}>Cancel
                  </SimpleButton>
                </Grid>
                <Grid item xs={12} md={2} sx={{ marginLeft: '-30px' }}>
                  <SaveButton variant="contained" onClick={() => onSubmit()}>Add Section
                  </SaveButton>
                </Grid>
              </Grid>
            </Stack>
          </Card>
        </Grid>
      </Grid></>) : <>
        <Curriculum CallBack={CallBack} courseId={course?.id}/>
      </>}
    </FormProvider>
  );
}
export default  Section;


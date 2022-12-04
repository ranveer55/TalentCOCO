import * as Yup from 'yup';
import { useCallback, useState } from 'react';
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
import { Grid, Card, Chip, Stack, Button, TextField, Switch,Box, Typography, Autocomplete, FormControlLabel, FormGroup, Checkbox, } from '@mui/material';
import { GridAddIcon } from '@mui/x-data-grid';
import Iconify from '../../../../components/Iconify';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../../components/hook-form';
//
import BlogNewPostPreview from '../../blog/BlogNewPostPreview';

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
      color:'#299617',
      height:'42px',
      marginTop:'-3px'
    }));
    const SimpleButton = styled(Button)(({ theme }) => ({
      backgroundColor: theme.palette.background.paper,
      color:'#52a447',
      borderRadius: 4,
      borderColor: '#5bb450',
      boxShadow: '0 0 0 0.2rem ',
    }));
    const SaveButton = styled(Button)(({ theme }) => ({
      backgroundColor: "#46923c",
      height:'42px',
      marginTop:'-3px'
    }));  

export default function CodingExercise(){
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
  
    const { enqueueSnackbar } = useSnackbar();
  
    const handleOpenPreview = () => {
      setOpen(true);
    };
  
    const handleClosePreview = () => {
      setOpen(false);
    };
  
    const NewBlogSchema = Yup.object().shape({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      content: Yup.string().min(1000).required('Content is required'),
      cover: Yup.mixed().required('Cover is required'),
    });
  
    const defaultValues = {
      title: '',
      description: '',
      content: '',
      cover: null,
      tags: ['Logan'],
      publish: true,
      comments: true,
      metaTitle: '',
      metaDescription: '',
      metaKeywords: ['Logan'],
    };
  
    const methods = useForm({
      resolver: yupResolver(NewBlogSchema),
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
  
    const onSubmit = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        reset();
        handleClosePreview();
        enqueueSnackbar('Post success!');
        navigate(PATH_DASHBOARD.blog.posts);
      } catch (error) {
        console.error(error);
      }
    };

    return(
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
       <Grid container spacing={3} sx={{marginTop:"20px"}}>
          <Grid item xs={12} md={7}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
              <Box sx={{border:'solid 1px #EDEDED',borderRadius: 1,}}>
                  <Grid container>
                   <Grid item xs={12} md={2} sx={{ marginTop: '20px'}}>
                    <LabelStyle sx={{marginLeft:'10px'}}>Section</LabelStyle>
                  </Grid>
                  <Grid item xs={12} md={8} >
                    <FormControl sx={{ m: 1 }} variant="standard">
                     <BootstrapInput id="demo-customized-textbox" sx={{ width: '355px' }}/>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                    <FormControl sx={{ m: 1 }} variant="standard">
                       <NativeSelect
                        id="demo-customized-select-native"
                        input={<BootstrapInput />}
                      >
                        <option aria-label="None" value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                      </NativeSelect>
                    </FormControl>
                    </Grid>
                     </Grid>
                     </Box>
                     <Grid container>
                  <Grid item xs={12} md={2} sx={{ marginTop: '15px' }}>
                    <LabelStyle sx={{ marginLeft: '15px' }}>Title </LabelStyle>
                  </Grid>
                  <Grid item xs={12} md={8} >
                    <FormControl sx={{ m: 1 }} variant="standard">
                     <BootstrapInput id="demo-customized-textbox" sx={{ width: '355px' }}/>
                    </FormControl>
                    </Grid>
                  <Grid item xs={12} md={2}>{ }</Grid>
                </Grid>
                <Grid container>
                   <Grid item xs={12} md={4}>{}</Grid>
                    <Grid item xs={12} md={2}>
                    <SimpleButton type="submit" variant="contained" >Cancel
                    </SimpleButton>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{marginLeft:'-10px'}}>
                    <SaveButton type="submit" variant="contained">Add Coding Exercise
                    </SaveButton>
                    </Grid>
                     </Grid>
                     </Stack>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{marginTop:"20px"}}>
          <Grid item xs={12} md={7}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
              <Box sx={{border:'solid 1px #EDEDED',borderRadius: 1,}}>
                  <Grid container>
                   <Grid item xs={12} md={2} sx={{ marginTop: '20px'}}>
                    <LabelStyle sx={{marginLeft:'10px'}}>Section</LabelStyle>
                  </Grid>
                  <Grid item xs={12} md={8} >
                    <FormControl sx={{ m: 1 }} variant="standard">
                     <BootstrapInput id="demo-customized-textbox" sx={{ width: '355px' }}/>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} md={2}>
                    <FormControl sx={{ m: 1 }} variant="standard">
                       <NativeSelect
                        id="demo-customized-select-native"
                        input={<BootstrapInput />}
                      >
                        <option aria-label="None" value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                      </NativeSelect>
                    </FormControl>
                    </Grid>
                     </Grid>
                     </Box>
                     <Box sx={{border:'solid 1px #EDEDED',borderRadius: 1,height:'60px',padding:'20px'}}>
                     <Grid container>
                    <Grid item xs={12} md={8}>
                    <LabelStyle>Unpublished Coding Exercise:Ex1</LabelStyle>
                  </Grid>
                  <Grid item xs={12} md={1} ><Iconify icon={'eva:edit-fill'} /></Grid>
                  <Grid item xs={12} md={1}><Iconify icon={'eva:trash-2-outline'} /></Grid>
                  <Grid item xs={12} md={2}>{}</Grid>
                  </Grid>
                  </Box>
                     </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    );
  }
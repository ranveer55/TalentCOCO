import * as Yup from 'yup';
import { useCallback, useState, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Card, Chip, Stack, Button, TextField, Switch, Box, Typography, Autocomplete, FormControlLabel, FormGroup, Checkbox, } from '@mui/material';
import { GridAddIcon } from '@mui/x-data-grid';
import Iconify from '../../../../components/Iconify';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useDispatch, useSelector } from '../../../../redux/store';

// components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../../components/hook-form';
//
import BlogNewPostPreview from '../../blog/BlogNewPostPreview';
import { createCourse, updateCourse } from '../../../../pages/Courses/store/actions'
import Lecture from './Lecture';
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


export default function Curriculum(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [lectureOpen, setLecture] = useState(false);
    const [lectureType, setLectureType] = useState('text');
    const { course: { course, loading } } = useSelector((state) => state);
    const { enqueueSnackbar } = useSnackbar();

    const NewBlogSchema = Yup.object().shape({
        name: Yup.string().required('Title is required'),
    });

    const defaultValues = useMemo(
        () => ({
            name: '',
        }),
        []
    );

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

    const cb = () => {
        reset();
    }

    const onSubmit = async () => {
        try {

            if (course) {
                dispatch(updateCourse(course.id, defaultValues, cb))
            } else {

                dispatch(createCourse(defaultValues, cb));
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
    const Quiz = () => {
        setLecture(true) 
        setLectureType('MCQ')
    };
   
    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4" gutterBottom sx={{ marginTop: "60px" }}>Curriculum</Typography>
            {!lectureOpen? <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <Grid container>
                                <Grid item xs={12} md={3}>
                                    <LabelStyle>Section Name:</LabelStyle>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    {props?.lesson?.name}
                                </Grid>
                                <Grid item xs={12} md={1} ><Iconify icon={'eva:edit-fill'} /></Grid>
                                <Grid item xs={12} md={1}><Iconify icon={'eva:trash-2-outline'} /></Grid>
                                <Grid item xs={12} md={3}>{ }</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} md={2}>
                                    <SimpleButton variant="contained" onClick={() => setLecture(true)}>Lecture
                                    </SimpleButton>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <SimpleButton variant="contained" onClick={() => Quiz()}>Quiz
                                    </SimpleButton>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <SimpleButton variant="contained" >Coding Exercise
                                    </SimpleButton>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <SimpleButton variant="contained">Coding Exercise
                                    </SimpleButton>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Card>
                </Grid>
            </Grid> : <>
                <Lecture lesson={props.lesson} type={lectureType}/>
                 </>}
        </FormProvider>
    );
}
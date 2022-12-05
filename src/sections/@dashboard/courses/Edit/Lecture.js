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
import Iconify from '../../../../components/Iconify';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useDispatch, useSelector } from '../../../../redux/store';

// components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../../components/hook-form';
//
import BlogNewPostPreview from '../../blog/BlogNewPostPreview';

import { createLecture, updateLecture, getLecture } from '../../../../pages/Lectures/store/actions'
import { ProfilePostCard } from '../../user/profile';
import Quiz from './Quiz';
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


export default function Lecture(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { lecture: { lecture, lectures, loading } } = useSelector((state) => state);
    const { enqueueSnackbar } = useSnackbar();
    const [quizOpen, setQuiz] = useState(false);
    const NewSectionSchema = Yup.object().shape({
        name: Yup.string().required('Title is required'),
        type: Yup.string().required('Type is required'),
        lessonId: Yup.string().required('LectureId is required'),
    });

    const defaultValues = useMemo(
        () => ({
            name: '',
            type: 'text',
            lessonId: props?.lesson?.id
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
        if(props.type==='MCQ'){
        setQuiz(true)
        }
    }

    const onSubmit = async () => {
        try {
            if (lecture) {
                dispatch(updateLecture(lecture.id, defaultValues, cb))
            } else {

                dispatch(createLecture(defaultValues, cb));
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

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit}>
            {!quizOpen ? <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <Grid container>
                                <Grid item xs={12} md={3} sx={{ marginTop: '10px' }}>
                                    <LabelStyle>New Section</LabelStyle>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <RHFTextField name="title" size="small" onChange={(e) => handleName(e)} />
                                </Grid>
                                <Grid item xs={12} md={1}>{ }</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} md={8}>{ }</Grid>
                                <Grid item xs={12} md={2}>
                                    <SimpleButton type="submit" variant="contained" >Cancel
                                    </SimpleButton>
                                </Grid>
                                <Grid item xs={12} md={2} sx={{ marginLeft: '-30px' }}>
                                    <SaveButton variant="contained" onClick={() => onSubmit()}>Add Lecture
                                    </SaveButton>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Card>
                </Grid>
            </Grid> : <>
                {props.type === 'MCQ' && <Quiz props={props.lesson}/>}
            </>}
        </FormProvider>
    );
}



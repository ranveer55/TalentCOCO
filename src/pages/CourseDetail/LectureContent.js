
import { useState, useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Dialog from '@mui/material/Dialog';
import { LoadingButton } from '@mui/lab';
import { IconButton, Tooltip, Card, Stack, Button, Switch, Box, Typography, } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import LinearProgress from '@mui/material/LinearProgress';
import { capitalize, unescape } from 'lodash';


// redux
import { dispatch, useDispatch, useSelector } from '../../redux/store';
import { RHFEditor, FormProvider } from '../../components/hook-form';
import { getCourse } from '../Courses/store/actions';
import { updateLecture } from './storeLecture/actions';
import MCQList from './McqList';



export default function LectureContent({ lecture, cancel }) {
    const { course: { course }, lecture: { isLoading } } = useSelector((s) => s)
    const NewLectureSchema = Yup.object().shape({
        body: Yup.string().required('Content is required').min(1)
    });

    const defaultValues = useMemo(
        () => ({
            body: lecture ? unescape(lecture.body) : '',
        }),
        [lecture]
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

    const cb = () => {
        reset();
        cancel()
    }

    const onSubmit = async () => {
        try {
            const payload = defaultValues;
            if (lecture) {
                dispatch(updateLecture(lecture.id, payload, cb))
            }

        } catch (error) {
            console.error(error);
        }
    };

    const handleBody = (e) => {
        console.log(e);
        setValue('body', String(e))
        defaultValues.body = e;
    };

    
    return (
        <>
            {lecture.type === 'Lecture' ?
                <Box sx={{ m: 1 }}>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >

                        <RHFEditor simple name="body" onChange={(e) => handleBody(e)} defaultValues={defaultValues.body} />
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={1}
                        >
                            <Button size="small" onClick={cancel}>
                                Cancel
                            </Button>
                            <LoadingButton size="small" type="submit" variant="contained" loading={isLoading}>
                                Update Lecture
                            </LoadingButton>
                        </Stack>
                    </FormProvider>
                </Box>
                : null}
            {lecture.type === 'MCQ' ?
                <Box sx={{ m: 1 }}>
                    <MCQList lecture={lecture} />
                </Box>
                : null}

        </>
    );
}
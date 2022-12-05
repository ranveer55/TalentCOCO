import { useState, useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Card, Chip, Stack, Button, Switch, Box, Typography, Link } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import LinearProgress from '@mui/material/LinearProgress';
import { GridAddIcon } from '@mui/x-data-grid';
import Iconify from '../../components/Iconify';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { useDispatch, useSelector } from '../../redux/store';
// components
import { FormProvider } from '../../components/hook-form';
//
import Lecture from './Lecture';
import Quiz from './Quiz';
import CodingExercise from './CodingExercise';
import { deleteSection, getSections } from './store/actions';

// ----------------------------------------------------------------------


const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));
const SimpleButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: '#52a447',
    borderRadius: 4,
    borderColor: '#5bb450',
    boxShadow: '0 0 0 0.2rem ',
}));
const LoadingButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#90EE90",
    color: '#299617',
    height: '42px',
    marginTop: '-3px'
}));

export default function Curriculum({ CallBack, courseId }) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const sections = useSelector((state) => state.coursefigma.sections);
    const [sectionData, setSectionData] = useState([]);
    const [lectureSection, setLectureSection] = useState(null);
    const [quizSection, setQuizSection] = useState(null);
    const [exerciseSection, setExerciseSection] = useState(null);
    useEffect(() => {
        dispatch(getSections(courseId));
    }, [dispatch]);


    useEffect(() => {
        if (sections.length !== 0) {
            setSectionData(sections?.results);
        }
    }, [sections]);
       
    const handleDeleteRow = (id) => {
        setOpenModal(true)
        setDeleteId(id)
    };

    const RemoveRow = () => {
        setLoading(true)
        setOpenModal(false)
        dispatch(deleteSection(deleteId));
        setLoading(false)
        CallBack();
    };
    const handleClose = () => {
        setOpenModal(false)
        setLoading(false)
    };
    const CallBackSectionList = () => {
        setOpen(false)
    };

    return (
        <FormProvider >
            <Typography variant="h4" gutterBottom sx={{ marginTop: "60px", marginLeft: '150px' }}>Section List</Typography>
            {sectionData && sectionData?.map((item) => (<Grid container spacing={3} sx={{ marginBottom: '30px' }}>
                <Grid item xs={12} md={1}>{ }</Grid>
                <Grid item xs={12} md={7}>
                    <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            <Grid container>
                                <Grid item xs={12} md={3}>
                                    <LabelStyle>Section Name:</LabelStyle>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    {item?.name}
                                </Grid>
                                <Grid item xs={12} md={1} ><Link href="#"><Iconify icon={'eva:edit-fill'} onClick={() => CallBack(item)} /></Link></Grid>
                                <Grid item xs={12} md={1}><Link href="#"><Iconify icon={'eva:trash-2-outline'} onClick={() => handleDeleteRow(item.id)} /></Link></Grid>
                                <Grid item xs={12} md={3}>{ }</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} md={2}>
                                    <SimpleButton variant="contained" onClick={() => setLectureSection(item)}>Lecture
                                    </SimpleButton>
                                </Grid>
                                <Grid item xs={12} md={2}>
                                    <SimpleButton variant="contained" onClick={() => setQuizSection(item)}>Quiz
                                    </SimpleButton>
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <SimpleButton variant="contained" onClick={() => setExerciseSection(item)}>Coding Exercise
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
            </Grid>))}
            {lectureSection && <Lecture section={lectureSection} />}
            {quizSection && <Quiz section={quizSection} />}
            {exerciseSection && <CodingExercise section={exerciseSection} />}
            <LoadingButton variant="contained" sx={{ marginLeft: '145px', marginTop: '20px' }} onClick={() => CallBack()}><GridAddIcon /></LoadingButton>
            <div>
                <Dialog
                    open={openModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description" >
                    {loading === true ? <LinearProgress /> : <></>}
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete the Section?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={() => { handleClose() }} style={{ background: "Silver", height: "34px", width: "42px" }}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => { RemoveRow() }} autoFocus >
                            Ok
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
        </FormProvider>
    );
}
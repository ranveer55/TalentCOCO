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
import { IconButton, Tooltip, Grid, Card, Chip, Stack, Button, TextField, Switch, Box, Typography, Autocomplete, FormControlLabel, FormGroup, Checkbox, } from '@mui/material';
import { GridAddIcon } from '@mui/x-data-grid';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../components/Iconify';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { dispatch, useDispatch, useSelector } from '../../redux/store';

// components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../components/hook-form';
//

// import LessonList from './LessonList';
import DeleteAlert from './DeleteAlert';
import SectionForm from './SectionForm';
import LectureForm from './LectureForm';
import { deleteLecture } from '../Lectures/store/actions';
import { getCourse } from '../Courses/store/actions';

const EditMenu = ({ editHandler, item }) => {

    return (
        <Stack direction={'row'} justifyContent="space-between" spacing={1}>
            <Iconify icon="eva:edit-outline" size="16px" onClick={() => editHandler('edit', item)} />
            <Iconify icon="eva:trash-2-outline" onClick={() => editHandler('delete', item)} />
            <Iconify icon="eva:menu-outline" sx={{ pointer: 'cursor' }} />
        </Stack>
    )
}

const LectureType = ({ title = 'Add New', cancel, lectureId }) => {
    const [type, setType] = useState(null)

    return (
        <Card sx={{ p: 2, m: 2, border: '1px dashed' }}>
            {type ? <>
                <LectureForm type={type} lectureId={lectureId} cancel={e => setType(null)}  />
            </> :
                <Stack direction="row" spacing={2}>
                    <Button startIcon={<Iconify icon="eva:plus-circle-outline" />} onClick={e => setType('Lecture')} >
                        Add Lecture
                    </Button>
                    <Button startIcon={<Iconify icon="eva:plus-circle-outline" />} onClick={e => setType('MCQ')} >
                        Add MCQ
                    </Button>
                    <Button startIcon={<Iconify icon="eva:plus-circle-outline" />} onClick={e => setType('Exercise')}  >
                        Add Coding Exercise
                    </Button>
                    <Button color="error" startIcon={<Iconify icon="eva:close-circle-outline" />} onClick={cancel}>
                        Cancel
                    </Button>
                </Stack>
            }

        </Card>
    )
}

const EmptyLectureAddCard = ({ lectureId }) => {
    const [visible, setVisible] = useState(false)
    const onClick = () => {
        setVisible(!visible)
    }
    return (
        <Card sx={{ p: 2, m: 2 }}>
            {visible ? <LectureType hide={onClick} cancel={() => setVisible(false)} lectureId={lectureId} /> :
                <Tooltip title='Add Lecture/MCQ/Exercise'>
                    <IconButton aria-label="add" size="medium" color="primary" onClick={onClick}>
                        <Iconify icon="eva:plus-circle-outline" />
                    </IconButton>
                </Tooltip>
            }
        </Card>
    )
}




function LectureList({ lesson }) {
    const [isShown, setIsShown] = useState(null);
    const [edit, setEdit] = useState(null)
    const [deleteMe, setDelete] = useState(null)
    const [targetItem, setItem] = useState(null)
    if (!lesson || !lesson.lectures) {
        return null;
    }

    const editHandler = (editType, item) => {
        if (editType === 'delete') {
            setDelete(true)
            setItem(item)
        } else if (editType === 'edit') {
            setEdit(true)
            setItem(item)
        }
    }
    const cancel = () => {
        setDelete(null)
        setEdit(null)
        setItem(null)
    }
    const cb = () => {
        dispatch(getCourse(lesson.courseId))
        cancel()
        setItem(null)
    }
    const Iconfirm = () => {
        console.log({targetItem});
        dispatch(deleteLecture(targetItem.id, cb))
    }



    return (
        <>
            {lesson.lectures.map((lecture, lectureIndex) =>
                <Card key={lecture.id} sx={{ p: 1, m: 3, border: '1px solid' }}>
                    {edit && targetItem.id === lecture.id ?
                        <LectureForm type={lecture.type} lecture={lecture} lessonId={lecture.lessonId} cancel={cancel} courseId={lesson.courseId} />
                        :
                        <Stack direction={'row'} spacing={1} onMouseEnter={() => setIsShown(lecture)} onMouseLeave={() => setIsShown(null)}>
                            <Typography variant="p">
                                <b>{`Lecture ${lectureIndex + 1}.`}</b>
                            </Typography>
                            <Typography variant="p" >
                                {` ${lecture.name}`}
                            </Typography>
                            {isShown && isShown.id === lecture.id ? <EditMenu editHandler={editHandler} item={lecture} /> : null}


                        </Stack>
                    }
                    {/* <LectureList lecture={lecture} /> */}
                    {/* <EmptyLectureAddCard lectureId={lecture.id} /> */}
                </Card>
            )
            }
            <DeleteAlert cancel={cancel} Iconfirm={Iconfirm} open={deleteMe} />
        </>
    );
}
export default LectureList;


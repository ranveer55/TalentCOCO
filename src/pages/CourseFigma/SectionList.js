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

import { createSection, deleteSection, getCourse, updateSection } from './store/actions'
import NewLecture from './LectureForm';
import LectureList from './LectureList';
import DeleteAlert from './DeleteAlert';
import SectionForm from './SectionForm';

const EditMenu = ({ editHandler, item }) => {

    return (
        <Stack direction={'row'} justifyContent="space-between" spacing={1}>
            <Iconify icon="eva:edit-outline" size="16px" onClick={() => editHandler('edit', item)} />
            <Iconify icon="eva:trash-2-outline" onClick={() => editHandler('delete', item)} />
            <Iconify icon="eva:menu-outline" sx={{ pointer: 'cursor' }} />
        </Stack>
    )
}

const LectureType = ({ title = 'Add New', cancel, lessonId,courseId }) => {
    const [type, setType] = useState(null)

    return (
        <Card sx={{ p: 2, m: 2, border: '1px dashed' }}>
            {type ? <>
                <NewLecture type={type} lessonId={lessonId} cancel={e => setType(null)} courseId={courseId} />
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

const EmptyLectureAddCard = ({ lessonId,courseId }) => {
    const [visible, setVisible] = useState(false)
    const onClick = () => {
        setVisible(!visible)
    }
    return (
        <Card sx={{ p: 2, m: 2 }}>
            {visible ? <LectureType hide={onClick} cancel={() => setVisible(false)} lessonId={lessonId} courseId={courseId} /> :
                <Tooltip title='Add Lecture/MCQ/Exercise'>
                    <IconButton aria-label="add" size="medium" color="primary" onClick={onClick}>
                        <Iconify icon="eva:plus-circle-outline" />
                    </IconButton>
                </Tooltip>
            }
        </Card>
    )
}




function SectionList({ course }) {
    const [isShown, setIsShown] = useState(null);
    const [edit, setEdit] = useState(null)
    const [deleteMe, setDelete] = useState(null)
    const [targetItem, setItem] = useState(null)
    if (!course || !course.lessons) {
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
        dispatch(getCourse(course.id))
        cancel()
        setItem(null)
    }
    const Iconfirm = () => {
        dispatch(deleteSection(targetItem.id, cb))
    }



    return (
        <>
            {course.lessons.map((lesson, lessonIndex) =>
                <Card key={lesson.id} sx={{ p: 1, m: 3, border: '1px solid' }}>
                    {edit && targetItem.id === lesson.id ?
                        <SectionForm lesson={lesson} courseId={lesson.courseId} hide={cancel} />
                        :
                        <Stack direction={'row'} spacing={1} onMouseEnter={() => setIsShown(lesson)} onMouseLeave={() => setIsShown(null)}>
                            <Typography variant="p">
                                <b>{`Section ${lessonIndex + 1}.`}</b>
                            </Typography>
                            <Typography variant="p" >
                                {` ${lesson.name}`}
                            </Typography>
                            {isShown && isShown.id === lesson.id ? <EditMenu editHandler={editHandler} item={lesson} /> : null}


                        </Stack>
                    }
                    <LectureList lesson={lesson} />
                    <EmptyLectureAddCard lessonId={lesson.id} courseId={course.id} />
                </Card>
            )
            }
            <DeleteAlert cancel={cancel} Iconfirm={Iconfirm} open={deleteMe} />
        </>
    );
}
export default SectionList;


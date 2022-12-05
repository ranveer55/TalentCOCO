
import { useCallback, useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import { Navigate, useNavigate } from 'react-router';
import { IconButton, Tooltip, Card, Stack, Button, Switch, Box, Typography, } from '@mui/material';
import Iconify from '../../components/Iconify';
import { dispatch, useDispatch, useSelector } from '../../redux/store';
// import LessonList from './LessonList';
import DeleteAlert from './DeleteAlert';
import SectionForm from './SectionForm';
import LectureForm from './LectureForm';
import LectureContent from './LectureContent';
import { deleteLecture } from '../Lectures/store/actions';
import { getCourse } from '../Courses/store/actions';


const EditMenu = ({ editHandler, item }) => {

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}>
            <Iconify icon="eva:edit-outline" size="16px" onClick={() => editHandler('edit', item)} />
            <Iconify icon="eva:trash-2-outline" onClick={() => editHandler('delete', item)} />

        </Stack>
    )
}

const LectureType = ({ title = 'Add New', cancel, lectureId }) => {
    const [type, setType] = useState(null)

    return (
        <Card sx={{ p: 2, m: 2, border: '1px dashed' }}>
            {type ? <>
                <LectureForm type={type} lectureId={lectureId} cancel={e => setType(null)} />
            </> :
                <Stack direction="row" spacing={2}>
                    <Button size="small" startIcon={<Iconify icon="eva:plus-circle-outline" />} onClick={e => setType('Lecture')} >
                        Add Lecture
                    </Button>
                    <Button size="small" startIcon={<Iconify icon="eva:plus-circle-outline" />} onClick={e => setType('MCQ')} >
                        Add MCQ
                    </Button>
                    <Button size="small" startIcon={<Iconify icon="eva:plus-circle-outline" />} onClick={e => setType('Exercise')}  >
                        Add Coding Exercise
                    </Button>
                    <Button size="small" color="error" startIcon={<Iconify icon="eva:close-circle-outline" />} onClick={cancel}>
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
                    <IconButton size="small" aria-label="add" color="primary" onClick={onClick}>
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
    const [showContent, setShowContent] = useState(false)
    const [showContentId, setShowContentId] = useState(null)
    const navigate= useNavigate()

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
        console.log({ targetItem });
        dispatch(deleteLecture(targetItem.id, cb))
    }

    const editLectureContent =(l) =>{
        if(l.type==='Exercise'){
          navigate('/testcase')
        } else {
            setShowContentId(l.id)
            setShowContent(true)
        }
    }
    const cancelLectureEdit =() =>{
            setShowContentId(null)
            setShowContent(false)
        
    }



    return (
        <>
            {lesson.lectures.map((lecture, lectureIndex) =>
                <Card key={lecture.id} sx={{ p: 1, m: 3, border: '1px solid' }}>
                    {edit && targetItem.id === lecture.id ?
                        <LectureForm type={lecture.type} lecture={lecture} lessonId={lecture.lessonId} cancel={cancel} courseId={lesson.courseId} />
                        :
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                            onMouseEnter={() => setIsShown(lecture)} onMouseLeave={() => setIsShown(null)}
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={1}>
                                <Typography variant="p">
                                    <b>{`${lectureIndex + 1}.`}</b>
                                </Typography>
                                <Typography variant="p" >
                                    {` ${lecture.name}`}
                                </Typography>
                                {isShown && isShown.id === lecture.id ? <EditMenu editHandler={editHandler} item={lecture} /> : null}


                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                            >
                                {isShown && isShown.id === lecture.id ? <>
                                    <Button size="small" startIcon={<Iconify icon="eva:plus-circle-outline" />}
                                        onClick={e => editLectureContent(lecture)} 
                                        variant="outlined"
                                    >
                                        {lecture.type === 'Lecture' && 'Add Content'}
                                        {lecture.type === 'MCQ' && 'Add Question'}
                                        {lecture.type === 'Exercise' && 'Edit Exercise'}
                                    </Button>

                                    <Iconify icon="eva:menu-outline" sx={{ pointer: 'cursor' }} />
                                </> : null}
                            </Stack>

                        </Stack>

                    }
                    {showContent && showContentId===lecture.id ? <LectureContent lecture={lecture} cancel={cancelLectureEdit}  />: null }
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


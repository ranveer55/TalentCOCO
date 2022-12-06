
import { useCallback, useState, useMemo, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Navigate, useNavigate } from 'react-router';
import { IconButton, Tooltip, Card, Stack, Button, Switch, Box, Typography, } from '@mui/material';
import Iconify from '../../components/Iconify';
import { dispatch, useDispatch, useSelector } from '../../redux/store';
// import LessonList from './LessonList';
import DeleteAlert from './DeleteAlert';
import SectionForm from './SectionForm';
import MCQForm from './MCQForm';
// import MCQContent from './MCQContent';
import { deleteMcq } from '../MCQ/store/actions';
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



const EmptyMCQAddCard = ({ lectureId }) => {
    const [visible, setVisible] = useState(false)
    const onClick = () => {
        setVisible(!visible)
    }
    return (
        <Card sx={{ p: 1, m: 0 }}>
            {visible ? <MCQForm hide={onClick} cancel={() => setVisible(false)} lectureId={lectureId} /> :
                <Tooltip title='Add Question'>
                    <IconButton size="small" aria-label="add" color="primary" onClick={onClick}>
                        <Iconify icon="eva:plus-circle-outline" /> 
                    </IconButton>
                </Tooltip>
            }
        </Card>
    )
}




function MCQList({ lecture }) {
    const [isShown, setIsShown] = useState(null);
    const [edit, setEdit] = useState(null)
    const [deleteMe, setDelete] = useState(null)
    const [targetItem, setItem] = useState(null)
    const [showContent, setShowContent] = useState(false)
    const [showContentId, setShowContentId] = useState(null)
    const navigate= useNavigate()

    if (!lecture || !lecture.mcq) {
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
        // dispatch(getCourse(lecture.courseId))
        cancel()
        setItem(null)
    }
    const Iconfirm = () => {
        console.log({ targetItem });
        dispatch(deleteMcq(targetItem.id, cb))
    }

    const editMCQContent =(l) =>{
        if(l.type==='Exercise'){
          navigate('/testcase')
        } else {
            setShowContentId(l.id)
            setShowContent(true)
        }
    }
    const cancelMCQEdit =() =>{
            setShowContentId(null)
            setShowContent(false)
        
    }



    return (
        <>

            {lecture.mcq.map((mcq, mcqIndex) =>
                <Card key={mcq.id} sx={{ p: 1, m: 3, border: '1px solid ' }}>
                    {edit && targetItem.id === mcq.id ?
                        <MCQForm mcq={mcq} lectureId={lecture.lectureId} cancel={cancel} />
                        :
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                            onMouseEnter={() => setIsShown(mcq)} onMouseLeave={() => setIsShown(null)}
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={1}>
                                <Typography variant="p">
                                    <b>{`${mcqIndex + 1}.`}</b>
                                </Typography>
                                <Typography variant="p" >
                                    {` ${mcq.question}`}
                                </Typography>
                                {isShown && isShown.id === mcq.id ? <EditMenu editHandler={editHandler} item={mcq} /> : null}


                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                            >
                                {isShown && isShown.id === mcq.id ? <>
                                    <Button size="small" startIcon={<Iconify icon="eva:plus-circle-outline" />}
                                        onClick={e => editMCQContent(mcq)} 
                                        variant="outlined"
                                    >Edit Question
                                        
                                    </Button>

                                    <Iconify icon="eva:menu-outline" sx={{ pointer: 'cursor' }} />
                                </> : null}
                            </Stack>

                        </Stack>

                    }
                    {/* {showContent && showContentId===mcq.id ? <MCQContent mcq={mcq} cancel={cancelMCQEdit}  />: null } */}
                    
                </Card>
            )
            }
            <DeleteAlert cancel={cancel} Iconfirm={Iconfirm} open={deleteMe} />
            <EmptyMCQAddCard lectureId={lecture.id} />
        </>
    );
}
export default MCQList;


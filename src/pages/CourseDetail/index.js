import { useCallback, useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Container, IconButton, Grid, Card, Chip, Stack, Button, TextField, Switch, Box, Typography, Autocomplete, FormControlLabel, FormGroup, Checkbox, Tooltip, Divider, } from '@mui/material';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { useDispatch, useSelector } from '../../redux/store';
import SectionForm from './SectionForm';
import SectionList from './SectionList';
import { SkeletonProductItem } from '../../components/skeleton';
import { getCourse } from '../Courses/store/actions';


const EmptySectionCard = ({ courseId }) => {
  const [add, setAdd] = useState(false)
  const onClick = () => {
    setAdd(!add)
  }
  return (
    <Card sx={{ p: 2, m: 2 }}>
      
      {add ? <SectionForm hide={onClick} courseId={courseId} /> : 
      <Tooltip title="Add New Section">
      <IconButton aria-label="add" size="medium" color="primary" onClick={onClick}>
        <Iconify icon="eva:plus-circle-outline" />

      </IconButton>
    </Tooltip>
      
      }
    </Card>
  )
}

export default function CourseDetail() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course: { course, isLoading } } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getCourse(courseId));
  }, [dispatch]);
  return (<Page title="courses: Course List">
    <Container maxWidth={'lg'}>
      <Typography variant='h3'>
        Curriculum
      </Typography>
      {
        // isLoading ? <SkeletonProductItem /> :
          <>
            {
              course ? <>
                <SectionList course={course} />
                <EmptySectionCard courseId={course.id} />
              </> : null
            }

          </>
      }

    </Container>
  </Page>
  );
}

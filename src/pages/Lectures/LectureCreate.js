import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getLecturedetail } from './store/actions';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import LectureNewEditForm from '../../sections/@dashboard/lectures/Edit/LectureNewEditForm';

// ----------------------------------------------------------------------

export default function LectureCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id,CourseId, lessonId} = useParams();
  const { lectures } = useSelector((state) => state.lecture);
  const isEdit = pathname.includes('edit');
   useEffect(() => {
    if(id!==undefined){
    dispatch(getLecturedetail(id));
    }
  }, [dispatch]);

  return (
    <Page title="Lectures: Create a new Lecture">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new Lecture' : 'Edit Lecture'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Lectures',
              href: PATH_DASHBOARD.lecture(CourseId,lessonId),
            },
            { id: !isEdit ? 'New Lecture' : id },
          ]}
        />

        <LectureNewEditForm isEdit={isEdit} currentLecture={lectures} />
      </Container>
    </Page>
  );
}

import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getLesson } from './store/actions';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import LessonNewEditForm from '../../sections/@dashboard/lessons/Edit/LessonNewEditForm';

// ----------------------------------------------------------------------

export default function LessonCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { lessons } = useSelector((state) => state.lesson);
  const isEdit = pathname.includes('edit');
  const currentLesson = lessons.find((lesson) => paramCase(lesson.id) === id);
  useEffect(() => {
    dispatch(getLesson());
  }, [dispatch]);

  return (
    <Page title="Lessons: Create a new Lesson">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new Lesson' : 'Edit Lesson'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Lessons',
              href: PATH_DASHBOARD.lessons.root,
            },
            { id: !isEdit ? 'New Lesson' : id },
          ]}
        />

        <LessonNewEditForm isEdit={isEdit} currentLesson={currentLesson} />
      </Container>
    </Page>
  );
}

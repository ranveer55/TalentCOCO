import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCourseDetail } from './store/actions';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import CourseNewEditForm from '../../sections/@dashboard/courses/Edit/CourseNewEditForm';
// ----------------------------------------------------------------------

export default function CourseCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
   const { courses } = useSelector((state) => state.course);
  const isEdit = pathname.includes('edit');
  useEffect(() => {
    if(id!==undefined){
    dispatch(getCourseDetail(id));
    }
  }, [dispatch]);

  return (
    <Page title="Courses: Create a new Course">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new Course' : 'Edit Course'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Courses',
              href: PATH_DASHBOARD.course,
            },
            { id: !isEdit ? 'New Course' : id },
          ]}
        />

        <CourseNewEditForm isEdit={isEdit} currentCourse={courses} />
      </Container>
    </Page>
  );
}

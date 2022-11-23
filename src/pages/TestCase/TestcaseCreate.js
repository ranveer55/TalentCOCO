import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import TestCaseNewEditForm from '../../sections/@dashboard/testcase/Edit/TestCaseNewEditForm';

// ----------------------------------------------------------------------

export default function TestcaseCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id,CourseId, lessonId,lectureId} = useParams();
  const isEdit = pathname.includes('edit');

  return (
    <Page title="Testcases: Create a new Test Case">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new Test Case' : 'Edit Test Case'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.course.root },
            {
              name: 'Course',
              href: PATH_DASHBOARD.course.root,
            },
            {
              name: 'Lessons',
              href: PATH_DASHBOARD.course.lesson(paramCase(CourseId)),
            },
            {
              name: 'Lecture',
              href: PATH_DASHBOARD.course.lectures(CourseId,lessonId),
            },
            {
              name: 'Test Case',
              href: PATH_DASHBOARD.course.testcases(CourseId,lessonId,lectureId),
            },
            { name: !isEdit ? 'New Test Case' : id },
          ]}
        />

        <TestCaseNewEditForm isEdit={isEdit}/>
      </Container>
    </Page>
  );
}

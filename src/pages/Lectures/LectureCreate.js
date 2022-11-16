import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getLecture } from './store/actions';
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
  const { id } = useParams();
  const { lectures } = useSelector((state) => state.lecture);
  const isEdit = pathname.includes('edit');
  const currentLecture = lectures.find((lecture) => paramCase(lecture.id) === id);
  useEffect(() => {
    dispatch(getLecture());
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
              href: PATH_DASHBOARD.lectures.root,
            },
            { id: !isEdit ? 'New Lecture' : id },
          ]}
        />

        <LectureNewEditForm isEdit={isEdit} currentLecture={currentLecture} />
      </Container>
    </Page>
  );
}

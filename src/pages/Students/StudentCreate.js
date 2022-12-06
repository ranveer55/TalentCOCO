import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getStudent, getStudents } from './store/actions';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import StudentNewEditForm from '../../sections/@dashboard/students/Edit/StudentNewEditForm';
// ----------------------------------------------------------------------

export default function StudentCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { student: { students, loading } } = useSelector((state) => state);
  const [csvData, setCsvData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const isEdit = pathname.includes('edit');
  useEffect(() => {
    if (id) {
      dispatch(getStudent(id));
    }

  }, [dispatch]);
  useEffect(() => {
       dispatch(getStudents());
    }, [dispatch]);
  useEffect(() => {
        setCsvData(students?.results);
    }, [students]);

  const CSV = () => {
     setDataLoaded(true)
     setDataLoaded(false)
     const CsvData = csvData.map(u => ([
      u.role,
      u.firstName,
      u.lastName,
      u?.email,
      u?.cohort,
    ]));
    let csv = [
      "sudentId",
      "First Name",
      "Last Name",
      "email",
      "cohort",
      "\n",
    ].join(",");
    CsvData.forEach((row) => {
     csv += row.join(",");
      csv += "\n";
  });
    const hiddenElement = document.createElement("a");
    hiddenElement.href = `data:text/csv;charset=utf-8, ${encodeURI(csv)}`;
    hiddenElement.target = "_blank";
    hiddenElement.download = `Student Report.csv`;
    hiddenElement.click();
  }

  return (
    <Page title="Students: Create a new Student">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={10}>
            <HeaderBreadcrumbs
              heading={!isEdit ? 'Create a new Student' : 'Edit Student'}
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                {
                  name: 'Students',
                  href: PATH_DASHBOARD.student.root,
                },
                { id: !isEdit ? 'New Student' : id },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <LoadingButton  variant="contained" onClick={() => CSV()}>Upload Csv</LoadingButton>
          </Grid>
        </Grid>
        <StudentNewEditForm isEdit={isEdit} />
      </Container>
    </Page>
  );
}

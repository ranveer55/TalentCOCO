import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link as RouterLink, useLocation,useSearchParams } from 'react-router-dom';
// @mui
import {
  Box,
  Card,
  Table,
  Typography,
  Button,
  Switch,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import LinearProgress from '@mui/material/LinearProgress';


// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getTestCases, deleteTestCase } from './store/actions';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import TestCaseNewEditForm from '../../sections/@dashboard/testcase/Edit/TestCaseNewEditForm';
import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from '../../components/table';
// sections
import { TestcaseTableRow, TestcaseTableToolbar } from '../../sections/@dashboard/testcase/testcase-list';

export default function TestCase() {


  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { CourseId, lessonId ,lectureId} = useParams();
  const [searchParams] = useSearchParams();
  const { testcases, error, isLoading } = useSelector((state) => state.testcase);
  const [tableData, setTableData] = useState([]);
  const [open, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectDeleteId, setselectDeleteId] = useState(null);

  const [filterName, setFilterName] = useState('');
  const { pathname } = useLocation();
  const isEdit = pathname.includes('edit');

  useEffect(() => {
    dispatch(getTestCases(lectureId));
  }, [dispatch]);

  useEffect(() => {
    if (testcases.length) {
      setTableData(testcases);
    }
  }, [testcases]);



  return (
    <Page title="testcases: Test Case">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Test Case"
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
            },

          ]}
          
        />

        <Card>
        <TestCaseNewEditForm isEdit={isEdit} language={searchParams.get('language')}/>
          
        </Card>
      </Container>
    </Page>
  );
}

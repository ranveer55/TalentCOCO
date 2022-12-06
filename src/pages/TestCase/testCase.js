import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link as RouterLink, useLocation, useSearchParams } from 'react-router-dom';
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
import { SkeletonProductItem } from '../../components/skeleton';
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
  const dispatch = useDispatch();
  const { lectureId } = useParams();
  const [searchParams] = useSearchParams();
  const { testcase: { testcase, isLoading } } = useSelector(s => s)

  useEffect(() => {
    dispatch(getTestCases(lectureId));
  }, [dispatch]);

  return (
    <Page title="Exercise">
      <Container maxWidth={'lg'}>

        <Card>
          {isLoading ? <SkeletonProductItem />:
           <TestCaseNewEditForm  />}

        </Card>
      </Container>
    </Page>
  );
}

import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
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
import { getLectures, deleteLecture } from './store/actions';
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
import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from '../../components/table';
// sections
import { LectureTableRow, LectureTableToolbar } from '../../sections/@dashboard/lectures/lecture-list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'description', label: 'Description', align: 'left' },
  { id: 'type', label: 'Type', align: 'left' },
  { id: 'order', label: 'Order', align: 'center' },
  { id: 'active', label: 'Active', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function Lecture() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: 'createdAt',
  });

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { CourseId, lessonId } = useParams();
  const { lectures, error, isLoading } = useSelector((state) => state.lecture);
  const [tableData, setTableData] = useState([]);
  const [open, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectDeleteId, setselectDeleteId] = useState(null);

  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    dispatch(getLectures(lessonId));
  }, [dispatch]);

  useEffect(() => {
    if (lectures.length) {
      setTableData(lectures);
    }
  }, [lectures]);


  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };
  const handleDeleteRow = (id) => {
    setDeleteOpen(true)
    setDeleteId(id)
  };
  const handleDeleteRows = (selected) => {
    setDeleteOpen(true)
    setselectDeleteId(selected)
  };

  const handleClose = () => {
    setDeleteOpen(false)
    setLoading(false)
  };

  const RemoveRow = () => {
    let deleteRow = '';
    setLoading(true)
    setDeleteOpen(false)
    if (deleteId) {
      dispatch(deleteLecture(deleteId));
       deleteRow = tableData.filter((row) => row.id !== deleteId);
    } else if (selectDeleteId) {
      dispatch(deleteLecture(selectDeleteId));
       deleteRow = tableData.filter((row) => !selected.includes(row.id));
    }
    setSelected([]);
    setTableData(deleteRow);
    setLoading(false)
   };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.course.editLecture(CourseId, lessonId, id));
  };
  const handleViewRow = (id) => {
    navigate(PATH_DASHBOARD.course.viewLecture(CourseId, lessonId, id));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 60 : 80;

  const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);

  return (
    <Page title="lectures: Lecture List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Lecture List"
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
              name: 'Lectures',
            },

          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.course.newLecture(CourseId, lessonId)}
            >
              New Lecture
            </Button>
          }
        />

        <Card>
          <LectureTableToolbar filterName={filterName} onFilterName={handleFilterName} />

          {lectures ? <Scrollbar>
            <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <LectureTableRow
                          key={row.id}
                          row={row}
                          selected={selected.includes(row.id)}
                          onSelectRow={() => onSelectRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          onEditRow={() => handleEditRow(row.id)}
                          onViewRow={() => handleViewRow(row.id)}
                        />
                      ) : (
                        !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                      )
                    )}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar> : <Typography variant="h6">{error}</Typography>}

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
          <div>
            <Dialog
              open={open}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description" >
              {loading === true ? <LinearProgress /> : <></>}
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete the Lecture?</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={() => { handleClose() }} style={{ background: "Silver", height: "34px", width: "42px" }}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={() => { RemoveRow() }} autoFocus >
                  Ok
                </Button>

              </DialogActions>
            </Dialog>
          </div>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter((lecture) => lecture.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  return tableData;
}

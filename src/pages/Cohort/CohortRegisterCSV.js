import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Box,
  Card,
  Table,
  Button,
  Switch,
  Typography,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Divider
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import LinearProgress from '@mui/material/LinearProgress';
import { LoadingButton } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCohorts,deleteCohort,getCohort } from './store/actions';
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
import { CohortTableToolbar ,CohortCsvTableRow} from '../../sections/@dashboard/cohort/cohort-list';

// ----------------------------------------------------------------------
  const TABLE_HEAD = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'total', numeric: true, disablePadding: false, label: 'Total' },
    { id: 'success', numeric: true, disablePadding: false, label: 'Success' },
    { id: 'failed', numeric: true, disablePadding: false, label: 'Failed' },
    { id: 'created_at', numeric: true, disablePadding: false, label: 'Imported on' },
  ];

// ----------------------------------------------------------------------

export default function CohortRegisterCSV() {
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

  const { cohorts, isLoading } = useSelector((state) => state.cohort);
  const [cohort, setCohortTableData] = useState();
  const [open, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [csv, setCsv] = useState(null);
  const [output, setOutput] = useState(null);
  const [csvHistory, setCsvHistory] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [selectDeleteId, setselectDeleteId] = useState(null);
  const [filterName, setFilterName] = useState('');
  useEffect(() => {
    dispatch(getCohort());
    dispatch(getCohort());
  }, [dispatch]);

  useEffect(() => {
    if (cohort?.length !== 0 ) {
        setCohortTableData(cohort?.results);
    }
  }, [cohort]);

  useEffect(() => {
    if (csvHistory?.length !== 0 ) {
        setCsvHistory(csvHistory?.results);
    }
  }, [csvHistory]);
  useEffect(() => {
    if (output?.length !== 0 ) {
        setCsvHistory(output?.results);
    }
    setProcessing(false)
  }, [output]);

  
  const uploadCSV=() => {
    console.log('uploadCSV')
    // check if csv uploaded
    if (!csv) {
      return window.alert("Please select a file!");
    }
    // 
    setProcessing(true);
               dispatch(getCohort());
        }
        const handleFilterName = (filterName) => {
            setFilterName(filterName);
            setPage(0);
          };
          const dataFiltered = applySortFilter({
            csvHistory,
            comparator: getComparator(order, orderBy),
            filterName,
          });
        
          const denseHeight = dense ? 60 : 80;
        
          const isNotFound = (!dataFiltered?.length && !!filterName) || (!isLoading && !dataFiltered?.length);
        
      return (
      <Container>
      <HeaderBreadcrumbs
              heading={" Register to cohort using CSV"}
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                {
                  name: 'cohorts',
                  href: PATH_DASHBOARD.cohort.root,
                },
                {
                  name: 'cohortRegisterCSV',
                 },
                  ]}
            />
            {
            !cohort ? (
              <div className="row">
                {/* title */}
                <div className="col-12">
                  <Typography variant="h6" component="h6" style={{marginBottom: 20 }}>
                    Cohort Id: {cohort?.cohortId}
                  </Typography>
                  <Typography variant="h6" component="h6" style={{marginBottom: 20 }}>
                    Cohort Name: {cohort?.cohort_name}
                  </Typography>
                </div>
                {/* form */}
                <div className="col-12">
                  <input type="file" onChange={e => {
                    setCsv(e.target.files[0]);
                  }} />
                  {/* upload button */}
                  <LoadingButton variant="contained"
                    onClick={uploadCSV}
                    >
                    <span>Upload CSV</span>
                  </LoadingButton>
                </div>
                {/* loading */}
                <div className="col-12">
                  {processing ? "Processing... please wait." : <></>}
                </div>
                {/* output */}
                {
                  output ? (
                    <div className="col-12">
                      <div className="row" style={{ fontWeight: "700" }}>Successful registrations: {output?.successful}</div>
                      <div className="row">
                        <div className="col-12">More Details: </div>
                        {
                          output.results.map(result => (
                            <div className="col-12" style={{ color: result?.status ? "green" : "red", display: "block" }}>
                              [{result?.status ? "Success" : "Failed"}] {result?.email} {result?.message ? `" - " ${result?.message} `: ""}
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  ) : <></>
                }
              </div>
            ) : <></>
          }
          <Divider style={{margin:"30px auto"}}/>
            <Typography variant="h4" component="h4" style={{ marginTop: 20, marginBottom: 20 }}>
              CSV import History
           </Typography>
              <Card>
          <CohortTableToolbar filterName={filterName} onFilterName={handleFilterName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={csvHistory.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      csvHistory.map((row) => row.id)
                    )
                  }
                   />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={csvHistory?.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      csvHistory.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <CohortCsvTableRow
                          key={row.id}
                          row={csvHistory}
                          selected={selected.includes(row.id)}
                          onSelectRow={() => onSelectRow(row.id)}
                            />
                      ) : (
                        !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                      )
                    )}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, csvHistory?.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered?.length}
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
           </Card>    
          </Container>
    );
  }

//  -------------------------------------------------------------

  function applySortFilter({ csvHistory, comparator, filterName }) {
    const stabilizedThis = csvHistory?.map((el, index) => [el, index]);
  
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
  
    csvHistory = stabilizedThis?.map((el) => el[0]);
  
    if (filterName) {
        csvHistory = csvHistory?.filter((cohort) => cohort.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
    }
  
    return csvHistory;
  }
  
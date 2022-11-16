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
    Tooltip,
    TableBody,
    Container,
    IconButton,
    TableContainer,
    TablePagination,
    FormControlLabel,
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getTally ,deleteTally } from '../../redux/slices/Tally';
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
import {TallyTableRow,TallyTableToolbar} from '../../sections/@dashboard/tally/tally-list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'id', label: 'Id', align: 'left' },
    { id: 'user_id', label: 'User Id', align: 'left' },
    { id: 'date', label: 'Date', align: 'left' },
    { id: 'type', label: 'Type', align: 'left' },
    { id: 'total', label: 'Total', align: 'left' },
    { id: 'sold', label: 'Sold', align: 'left' },
    { id: 'broken', label: 'Broken', align: 'left' },
    { id: 'discount', label: 'Discount', align: 'left' },
    { id: 'extra', label: 'Extra', align: 'left' },
    { id: 'salory', label: 'Salory', align: 'left' },
    { id: 'deposit', label: 'Deposit', align: 'left' },
    { id: 'balance', label: 'Balance', align: 'left' },
];

// ----------------------------------------------------------------------

export default function Tally() {
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

    const { tallys, isLoading } = useSelector((state) => state.tally);
    console.log("tallys",tallys)
    const [tableData, setTableData] = useState([]);

    const [filterName, setFilterName] = useState('');

    useEffect(() => {
        dispatch(getTally());
    }, [dispatch]);

    useEffect(() => {
        if (tallys.length) {
            setTableData(tallys);
        }
    }, [tallys]);


    const handleFilterName = (filterName) => {
        setFilterName(filterName);
        setPage(0);
    };

    const handleDeleteRow = (id) => {
        const deleteRow = tableData.filter((row) => row.id !== id);
        setSelected([]);
        setTableData(deleteRow);
        dispatch (deleteTally(id));
    };

    const handleDeleteRows = (selected) => {
        const deleteRows = tableData.filter((row) => !selected.includes(row.id));
        setSelected([]);
        setTableData(deleteRows);
    };

    const handleEditRow = (id) => {
           navigate(PATH_DASHBOARD.tallys.edit(id));
    };

    const dataFiltered = applySortFilter({
        tableData,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const denseHeight = dense ? 60 : 80;

    const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);

    return (
        <Page title="Tally: tally List">
             <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Tally List"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        {
                            name: 'Tally',
                            href: PATH_DASHBOARD.items.root,
                        },
                        { name: 'Tally List' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                            component={RouterLink}
                            to={PATH_DASHBOARD.tallys.new}
                        >
                            New Tally
                        </Button>
                    }
                />

                <Card>
                    <TallyTableToolbar filterName={filterName} onFilterName={handleFilterName} />

                    <Scrollbar>
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
                                                <TallyTableRow
                                                    key={row.id}
                                                    row={row}
                                                    selected={selected.includes(row.id)}
                                                    onSelectRow={() => onSelectRow(row.id)}
                                                    onDeleteRow={() => handleDeleteRow(row.id)}
                                                    onEditRow={() => handleEditRow(row.id)}
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
                    </Scrollbar>

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
        tableData = tableData.filter((item) => item.title.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
    }

    return tableData;
}

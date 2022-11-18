import { paramCase } from 'change-case';
import { useState, useEffect } from 'react'
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
  FormControlLabel, DialogTitle
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import { DialogAnimate } from '../../components/animate';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from '../../components/table';
// sections
import McqTableRow from './McqTableRow';
import McqQuestion from "./McqQuestion";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'question', label: 'Question', align: 'left' },
  { id: 'action', label: 'Action', align: 'right' },
];

// ----------------------------------------------------------------------

export default function McqList({ lecture, isLoading, setMCQOrder }) {
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


  const [tableData, setTableData] = useState(lecture ? lecture.mcq : []);
  useEffect(() => {
    setTableData(lecture ? lecture.mcq : [])

  }, [lecture])

  const [filterName, setFilterName] = useState('');
  const [editMcq, setEditMcq] = useState(null);
  const [isOpenModal, openModal] = useState(false)
  const handleAddEvent = () => {
    openModal(1);
  };

  const handleCloseModal = () => {
    openModal(false);
  };


  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = (id) => {

    const deleteRow = tableData.filter((row) => row.id !== id);
    setMCQOrder(tableData.filter((row) => row.id !== id).map((item) => item.id))
    setSelected([]);
    setTableData(deleteRow);

  };

  const handleDeleteRows = (selected) => {
    setMCQOrder(tableData.filter((row) => !selected.includes(row.id)).map(item => item.id))
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (row) => {
    setEditMcq(row)
    openModal(true);
  };
  const addQuestion = (row) => {
    const defaultmcq = {
      question: '',
      answer: [],
      options: []
    }
    setEditMcq(defaultmcq)
    openModal(true);
  };
  const cb = () => {
    openModal(false);
  }
  const dataFiltered = tableData
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const options = reorder(
      tableData,
      result.source.index,
      result.destination.index
    );
    setMCQOrder(options.map((item) => item.id))
    setTableData(options);
  }


  const denseHeight = dense ? 60 : 80;

  const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);

  return (
    <>

      <Button
        variant="contained"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={addQuestion}
      >
        New Question
      </Button>
      <Card>
        {/* <Scrollbar> */}
        <TableContainer sx={{ width: '100%', position: 'relative' }}>
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
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="list">
                  {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) =>
                          row ? (
                            <Draggable draggableId={row.id} index={index}>
                              {provided => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  
                                >
                                  <McqTableRow
                                    key={row.id}
                                    row={row}
                                    selected={selected.includes(row.id)}
                                    onSelectRow={() => onSelectRow(row.id)}
                                    onDeleteRow={() => handleDeleteRow(row.id)}
                                    onEditRow={() => handleEditRow(row)}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ) : (
                            !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                          )
                        )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

              <TableNoData isNotFound={isNotFound} />
            </TableBody>
          </Table>
        </TableContainer>
        {/* </Scrollbar> */}

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
        <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
          <DialogTitle>Add Question</DialogTitle>
          <McqQuestion lectureId={lecture?.id} mcq={editMcq} cb={cb} />

        </DialogAnimate>
      </Card>
    </>
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
    tableData = tableData.filter((mcq) => mcq.question.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  return tableData;
}

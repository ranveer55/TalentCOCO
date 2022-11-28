import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkmark } from 'react-checkmark'
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem, Button } from '@mui/material';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
// Route
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

LessonTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function LessonTableRow({ CourseId,row, selected, onEditRow, onViewRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id, name, avatarUrl, description, order, isVerified, lectures, active } = row;
  const [openMenu, setOpenMenuActions] = useState(null);
  const lessonId = id
  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const onShowRow = () => {
    navigate(PATH_DASHBOARD.course.lectures(CourseId, lessonId));
  };
  const Reports = (id) => {
    navigate(`/dashboard/report?lesson=${id}`)
  };
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>

      <TableCell align="left">{description}</TableCell>
      <TableCell align="center">{order}</TableCell>
      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          sx={{ textTransform: 'capitalize' }}
        >
          {active === true ? <Checkmark size='small' /> : <span style={{ color: "red" }}>x</span>}
        </Label>
      </TableCell>
      <TableCell align="left"><Button variant="contained"
        onClick={() => {
          onShowRow();
        }}>LectureView</Button></TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        <Button
          variant="contained"
          onClick={() => { Reports(row.id) }}
        >
          ReportView
        </Button>
      </TableCell>
      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onViewRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'carbon:view-filled'} />
                View
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}

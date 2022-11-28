import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem, Button } from '@mui/material';
import { Checkmark } from 'react-checkmark'
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
// Route
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

CourseTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onShowRow: PropTypes.func,
};

export default function CourseTableRow({ row,selected, onEditRow, onViewRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id, name, description, hours, poster, totalLessons, language, level, active } = row;
  const [openMenu, setOpenMenuActions] = useState(null);
  const CourseId = id
  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const onShowRow = (CourseId) => {
    navigate(PATH_DASHBOARD.course.lesson(paramCase(CourseId)));
  };
  const Reports = (id) => {
     navigate(`/dashboard/report?course=${id}`)
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

      <TableCell align="left">{hours}</TableCell>
      <TableCell align="left">{language}</TableCell>
      <TableCell align="left">{level}</TableCell>
      <TableCell align="center">{totalLessons}</TableCell>
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
          onShowRow(id);
        }}>Lesson View</Button></TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        <Button
          variant="contained"
          onClick={() => { Reports(row.id) }}
        >
          Report View
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

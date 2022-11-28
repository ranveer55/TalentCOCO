import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem,Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Checkmark } from 'react-checkmark'
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

LectureTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function LectureTableRow({ CourseId,lessonId, row, selected, onEditRow, onViewRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id, name,subtype, avatarUrl, description, type, isVerified, order, level, active } = row;
  const [openMenu, setOpenMenuActions] = useState(null);
  const lectureId = id
  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const onShowRow = () => {
    navigate(PATH_DASHBOARD.course.testcases(CourseId, lessonId, lectureId));
  };
  const Reports = (id) => {
     navigate(`/dashboard/report?lecture=${id}`)
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
      <TableCell align="left">{type}</TableCell>
      <TableCell align="left">{subtype}</TableCell>
      <TableCell align="left">{order}</TableCell>
      <TableCell align="center">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          sx={{ textTransform: 'capitalize' }}
        >
          {active === true ? <Checkmark size='small' /> : <span style={{ color: "red" }}>x</span>}
        </Label>
      </TableCell>
      {type === 'exercise' ?<TableCell align="center"><Button variant="contained"
        onClick={() => {
          onShowRow();
        }}>TestCase View </Button></TableCell>:<TableCell >{}</TableCell >}
         <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
      <Button
            variant="contained"
            onClick={()=>{Reports(row.id)}}
            >
          Report View
          </Button>
      </TableCell>

      <TableCell align="center">
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

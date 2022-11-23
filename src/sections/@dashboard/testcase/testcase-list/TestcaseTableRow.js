import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem,Button } from '@mui/material';
import { Checkmark } from 'react-checkmark'
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

TestcaseTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function TestcaseTableRow({ CourseId, lessonId, row, selected, onEditRow, onViewRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id, name, avatarUrl, input, output, isVerified, order, level, active } = row;
  const [openMenu, setOpenMenuActions] = useState(null);
  const testcaseId = id
  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const onShowRow = () => {
    navigate(PATH_DASHBOARD.course.testcases(CourseId, lessonId, testcaseId));
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

      <TableCell align="left">{input}</TableCell>
      <TableCell align="left">{output}</TableCell>
      <TableCell align="center">{order}</TableCell>
      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          sx={{ textTransform: 'capitalize' }}
        >
          {active === true ? <Checkmark size='small' /> : <span style={{ color: "red" }}>x</span>}
        </Label>
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

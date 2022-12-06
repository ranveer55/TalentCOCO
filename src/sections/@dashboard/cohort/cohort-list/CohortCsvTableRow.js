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

CohortCsvTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};
export default function CohortCsvTableRow({ CourseId,lessonId, row, selected, onEditRow, onViewRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id, name, avatarUrl, total,success,failed,createdAt} = row;
  const [openMenu, setOpenMenuActions] = useState(null);
  const cohortId = id
  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
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

      <TableCell align="left">{total}</TableCell>
      <TableCell align="center">{success}</TableCell>
      <TableCell align="left">{failed}</TableCell>
      <TableCell align="center">{createdAt}</TableCell>
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

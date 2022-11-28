import PropTypes from 'prop-types';
import { useState } from 'react';
import { Checkmark } from 'react-checkmark'
import { useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {  Checkbox, TableRow, TableCell, Typography, MenuItem,Button } from '@mui/material';
// components
import { fDateTimeSuffix } from '../../../utils/formatTime';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';
import Avatar from '../../../components/Avatar';
import {IMAGE_PATH} from '../../../config'


// ----------------------------------------------------------------------

ReportTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function ReportTableRow({ row,selected, onEditRow,onViewRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const [openMenu, setOpenMenuActions] = useState(null);

 
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      <TableCell >
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={row?.company?.name} src={IMAGE_PATH+row?.company?.poster} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>                    
          {row?.company?.name}
        </Typography>
      </TableCell>
      </TableCell>
      <TableCell>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={row?.user?.name} src={IMAGE_PATH+row?.user?.poster} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>                    
          {row?.user?.name}
        </Typography>
      </TableCell>
      </TableCell>
      <TableCell>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={row?.course?.name} src={IMAGE_PATH+row?.course?.poster} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>                    
          {row?.course?.name}
        </Typography>
      </TableCell>
      </TableCell>
      <TableCell align="left">
        
        <Typography variant="subtitle2" noWrap>                    
          {row?.lecture?.name}
          </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="subtitle2" noWrap>                    
          {row?.lesson?.name}
          </Typography>
      </TableCell>

      <TableCell align="left">{row?.correct}</TableCell>
      <TableCell align="left">{row?.total}</TableCell>
      <TableCell align="left">{fDateTimeSuffix(row?.createdAt)}</TableCell>
      <TableCell align="left">{fDateTimeSuffix(row?.updatedAt)}</TableCell>
      </TableRow>
  );
}

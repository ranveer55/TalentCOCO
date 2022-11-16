import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, Checkbox, TableCell, Typography, MenuItem } from '@mui/material';
// utils
// components
import Image from '../../../../components/Image';
import { TableMoreMenu } from '../../../../components/table';
import Iconify from '../../../../components/Iconify';
import { fCurrency } from '../../../../utils/formatNumber';

//

// ----------------------------------------------------------------------

TallyTableRow.propTypes = {
    row: PropTypes.object,
    selected: PropTypes.bool,
    onEditRow: PropTypes.func,
    onSelectRow: PropTypes.func,
    onDeleteRow: PropTypes.func,
    onViewRow:PropTypes.func,
};

export default function TallyTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
    const theme = useTheme();

    const {id,date,type,total,sold,broken,discount,extra,salory,deposit,balance } = row;
    const userid=row.user_id;
    const [openMenu, setOpenMenuActions] = useState(null);

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
            <TableCell align="left">{id}</TableCell>
            <TableCell align="left">{userid}</TableCell>
            <TableCell align="left">{date}</TableCell>
            <TableCell align="left">{type}</TableCell>
            <TableCell align="left">{total}</TableCell>
            <TableCell align="left">{sold}</TableCell>
            <TableCell align="left">{broken}</TableCell>
            <TableCell align="left">{fCurrency(discount)}</TableCell>
            <TableCell align="left">{extra}</TableCell>
            <TableCell align="left">{fCurrency(salory)}</TableCell>
            <TableCell align="left">{fCurrency(deposit)}</TableCell>
            <TableCell align="left">{fCurrency(balance)}</TableCell>
            
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
                        </>
                    }
                />
            </TableCell>
        </TableRow>
    );
}

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

TeamTableRow.propTypes = {
    row: PropTypes.object,
    selected: PropTypes.bool,
    onEditRow: PropTypes.func,
    onSelectRow: PropTypes.func,
    onDeleteRow: PropTypes.func,
    onViewRow:PropTypes.func,
};

export default function TeamTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
    const theme = useTheme();

    const { title, id, price } = row;
    const { images } = `http://13.127.215.34/${row.path}`;
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

            <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                <Image disabledEffect alt={title} src={images} sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }} />
                <Typography variant="subtitle2" noWrap>
                    {title}
                </Typography>
            </TableCell>

            <TableCell align="right">{fCurrency(price)}</TableCell>

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

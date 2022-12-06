
import { useState, useEffect } from 'react';
import {
    Button,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import LinearProgress from '@mui/material/LinearProgress';


export default function DeleteAlert({ cancel, Iconfirm, open }) {

    return (<Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description" >
        {'loading' === true ? <LinearProgress /> : <></>}
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this item?</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" autoFocus onClick={cancel} style={{ background: "Silver", height: "34px", width: "42px" }}>
                Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={Iconfirm}  >
                Ok
            </Button>

        </DialogActions>
    </Dialog>);
}
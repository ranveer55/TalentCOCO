import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { setToast } from '../pages/app/store/actions';

export default function Toast() {
    const { enqueueSnackbar } = useSnackbar()
    const { severity, message, open } = useSelector((s) => s.app.toast)
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(setToast({
            severity, message, open: false
        }))
    };
    React.useEffect(() => {
        if (open) {
            enqueueSnackbar(message, { variant: severity, onClose: handleClose })
        }
    }, [open])

    return null;
}

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography, InputAdornment } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { createTally } from '../../../../redux/slices/Tally';
import { useDispatch, useSelector } from '../../../../redux/store';

// components
import {
  FormProvider,
  RHFEditor,
  RHFTextField,
  RHFUploadMultiFile,
  RHFUploadSingleFile,
} from '../../../../components/hook-form';

// ----------------------------------------------------------------------


const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

TallyNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentTally: PropTypes.object,
};

export default function TallyNewEditForm({ isEdit, currentTally }) {
 const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const NewTallySchema = Yup.object().shape({
    id: Yup.number().moreThan(0, 'id is required'),
    user_id: Yup.number().moreThan(0, 'date is required'),
    date: Yup.string().required('date is required'),
    type: Yup.string().required('type is required'),
    total: Yup.number().moreThan(0, 'total should not be 0.00'),
    sold: Yup.number().moreThan(0, 'sold should not be 0.00'),
    broken: Yup.string().required('broken is required'),
    discount: Yup.number().moreThan(0, 'discount should not be 0.00'),
    extra: Yup.string().required('extra is required'),
    salory: Yup.number().moreThan(0, 'salory should not be 0.00'),
    deposit: Yup.number().moreThan(0, 'deposit should not be 0.00'),
    balance: Yup.number().moreThan(0, 'balance should not be 0.00'),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentTally?.id || '',
      user_id: currentTally?.user_id || '',
      date: currentTally?.date || '',
      type: currentTally?.type || '',
      total: currentTally?.total || '',
      sold: currentTally?.sold || '',
      broken: currentTally?.broken || '',
      discount: currentTally?.discount || '',
      extra: currentTally?.extra || '',
      salory: currentTally?.salory || '',
      deposit: currentTally?.deposit || '',
      balance: currentTally?.balance || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentTally]
  );

  const methods = useForm({
    resolver: yupResolver(NewTallySchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentTally) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentTally]);

  const onSubmit = async () => {
    try {
       dispatch(createTally(defaultValues,defaultValues.id));
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.tallys.tally);
    } catch (error) {
      console.error(error);
    }
  };
  const handleId = (e) => {
    const id = e.target.value;
    setValue('id', Number(e.target.value))
    defaultValues.id = id;
  };

  const handleUserId = (e) => {
    const userid = e.target.value;
    setValue('user_id', Number(e.target.value))
    defaultValues.user_id = userid;
  };
  const handleDate = (e) => {
    const date = e.target.value;
    setValue('date', date);
    defaultValues.date = date;
  };

  const handleType = (e) => {
    const type = e.target.value;
    setValue('type', type);
    defaultValues.type = type;
  };
  const handleTotal = (e) => {
    const total = e.target.value;
    setValue('total', Number(e.target.value))
    defaultValues.total = total;
  };
  const handleSold = (e) => {
    const sold = e.target.value;
    setValue('sold', Number(e.target.value))
    defaultValues.sold = sold;
  };
  const handleBroken = (e) => {
    const broken = e.target.value;
    setValue('broken', Number(e.target.value))
    defaultValues.broken = broken;
  };
  const handleDiscount = (e) => {
    const discount = e.target.value;
    setValue('discount', Number(e.target.value))
    defaultValues.discount = discount;
  };
  const handleExtra = (e) => {
    const extra = e.target.value;
    setValue('extra', Number(e.target.value))
    defaultValues.extra = extra;
  };
  const handleSalory = (e) => {
    const salory = e.target.value;
    setValue('salory', Number(e.target.value))
    defaultValues.salory = salory;
  };
  const handleDeposit = (e) => {
    const deposit = e.target.value;
    setValue('deposit', Number(e.target.value))
    defaultValues.deposit = deposit;
  };
  const handleBalance = (e) => {
    const balance = e.target.value;
    setValue('balance', Number(e.target.value))
    defaultValues.balance = balance;
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} mb={2}>
              <RHFTextField
                name="id"
                label="Id"
                value={getValues('id') === 0 ? '' : getValues('id')}
                onChange={(e) => handleId(e)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  type: 'number',
                }}
              />

              <RHFTextField
                name="user_id"
                label="User Id"
                value={getValues('user_id') === 0 ? '' : getValues('user_id')}
                onChange={(e) => handleUserId(e)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  type: 'number',
                }}
              />
              <RHFTextField title="date" label="Date" value={defaultValues.date} onChange={(e) => handleDate(e)} />
              <RHFTextField title="type" label="type" value={defaultValues.type} onChange={(e) => handleType(e)} />

              <RHFTextField
                name="total"
                label="Total"
                placeholder="0.00"
                value={getValues('total') === 0 ? '' : getValues('total')}
                onChange={(e) => handleTotal(e)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  type: 'number',
                }}
              />
              <RHFTextField
                name="sold"
                label="Sold"
                placeholder="0.00"
                value={getValues('sold') === 0 ? '' : getValues('sold')}
                onChange={(e) => handleSold(e)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  type: 'number',
                }}
              />
              <RHFTextField
                name="broken"
                label="Broken"
                placeholder="0.00"
                value={getValues('broken') === 0 ? '' : getValues('broken')}
                onChange={(e) => handleBroken(e)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  type: 'number',
                }}
              />
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} mb={2}>

              <RHFTextField
                name="discount"
                label="Discount"
                placeholder="0.00"
                value={getValues('discount') === 0 ? '' : getValues('discount')}
                onChange={(e) => handleDiscount(e)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  type: 'number',
                }}
              />
              <RHFTextField
                name="extra"
                label="extra"
                placeholder="0.00"
                value={getValues('extra') === 0 ? '' : getValues('extra')}
                onChange={(e) => handleExtra(e)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  type: 'number',
                }}
              />
              <RHFTextField
                name="salory"
                label="Salory"
                placeholder="0.00"
                value={getValues('salory') === 0 ? '' : getValues('salory')}
                onChange={(e) => handleSalory(e)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  type: 'number',
                }}
              />
              <RHFTextField
                name="deposit"
                label="Deposit"
                placeholder="0.00"
                value={getValues('deposit') === 0 ? '' : getValues('deposit')}
                onChange={(e) => handleDeposit(e)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  type: 'number',
                }}
              />
              <RHFTextField
                name="balance"
                label="Balance"
                placeholder="0.00"
                value={getValues('balance') === 0 ? '' : getValues('balance')}
                onChange={(e) => handleBalance(e)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  type: 'number',
                }}
              />

              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {!isEdit ? 'Create Tally' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

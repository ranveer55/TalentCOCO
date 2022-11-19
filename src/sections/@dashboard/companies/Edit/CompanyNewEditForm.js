import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, InputLabel, Select, MenuItem, FormControl, FormGroup } from '@mui/material';
import { useDispatch, useSelector } from '../../../../redux/store';
// utils
import { fData } from '../../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock
import { countries } from '../../../../_mock';
import { createCompany, updateCompany } from '../../../../pages/Companies/store/actions'
// components
import Label from '../../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar, RHFEditor } from '../../../../components/hook-form';

// ----------------------------------------------------------------------
const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));


CompanyNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  company: PropTypes.object,
};

export default function CompanyNewEditForm({ isEdit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { company: { company, loading } } = useSelector((state) => state);

  const NewCompanySchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3),
    description: Yup.string().required('Description is required').min(1),
  });

  const defaultValues = useMemo(
    () => ({
      name: isEdit ? company?.name || '' : '',
      description: isEdit ? company?.description || '' : '',
      poster: isEdit ? company?.poster || '' : '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [company]
  );

  const methods = useForm({
    resolver: yupResolver(NewCompanySchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && company) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, company]);

  const cb = () => {
    reset();
    navigate('/dashboard/companies')
  }

  const onSubmit = async () => {
    try {

      if (company) {
        dispatch(updateCompany(company.id, defaultValues, cb))
      } else {

        dispatch(createCompany(defaultValues, cb));
      }

    } catch (error) {
      console.error(error);
    }
  };
  function getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      defaultValues.poster = reader.result;
      
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log(file);

      if (file) {
       const b = getBase64(file)
        setValue(
          'poster',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
       
      }
    },
    [setValue]
  );




  const handleName = (e) => {
    const name = e.target.value;
    setValue('name', String(e.target.value))
    defaultValues.name = name;
  };

  const handleDescription = (e) => {
    const description = e.target.value;
    setValue('description', String(e.target.value))
    defaultValues.description = description;
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="poster"
                accept="image/*"
                maxSize={100000}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(100000)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>

          <Box
            sx={{
              display: 'grid',
              rowGap: 3,
            }}
          >
            <RHFTextField name="name" label="Company Name" onChange={(e) => handleName(e)} />
            <RHFTextField name="description" label="Description" multiline rows={5} onChange={(e) => handleDescription(e)} />

          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!isEdit ? 'Create Company' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
      </Grid>
    </FormProvider >
  );
}

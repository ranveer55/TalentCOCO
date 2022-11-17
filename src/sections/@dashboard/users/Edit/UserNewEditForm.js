import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';
import { capitalize } from 'lodash';
import Mixed from 'yup/lib/mixed';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { useDispatch, useSelector } from '../../../../redux/store';
import CompanyAutoComplete from '../../../../pages/Companys/CompanyAutocomplete';
// utils
import { fData } from '../../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock
import { countries } from '../../../../_mock';
import { createUser, updateUser } from '../../../../pages/Users/store/actions'
// components
import Label from '../../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';




// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  user: PropTypes.object,
};

export default function UserNewEditForm({ isEdit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user: { user, loading, error,userError }, app: { masterdata } } = useSelector((state) => state);
  const roles = masterdata && masterdata.roles ? masterdata.roles: []
 

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    password: Yup.mixed().required('Password is required'),
    role: Yup.string().required('Role is required'),
    company: Yup.object().required('Company is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: user?.name || '',
      email: user?.email || '',
      password: user?.password || '',
      role: user?.role || '',
      company: user?.company || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
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
    if (isEdit && user) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, user]);

  const cb =() =>{
    reset();
    navigate('/dashboard/users/list')
  }

  const onSubmit = async () => {
    try {
      const payload ={...defaultValues, company:defaultValues?.company?.id}
      if (user) {
        delete payload.password
        dispatch(updateUser(user.id, payload,cb))
      } else {
       
        dispatch(createUser(payload,cb));
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  


  const handleName = (e) => {
    const name = e.target.value;
    setValue('name', String(e.target.value))
    defaultValues.name = name;
  };
  const handleEmail = (e) => {
    const email = e.target.value;
    setValue('email', String(e.target.value))
    defaultValues.email = email;
  };
  const handlePassword = (e) => {
    const password = e.target.value;
    setValue('password', String(e.target.value))
    defaultValues.password = password;
  };
  const handleRole = (e) => {
    const role = e.target.value;
    setValue('role', String(e.target.value))
    defaultValues.role = role;
  };
  const handleComapny = (comapny) => {
    setValue('company', comapny)
    defaultValues.company = comapny;
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="name" label="User Name" onChange={(e) => handleName(e)} />
              <RHFTextField name="email" label="Email Address" onChange={(e) => handleEmail(e)} />
              <RHFTextField name="password" label="Password" onChange={(e) => handlePassword(e)} />
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={defaultValues.role}
                  label="Language"
                  onChange={(e) => handleRole(e)}
                >
                  {roles.map((r) => <MenuItem key={r} value={r}>{capitalize(r)}</MenuItem>)}
                </Select>
              </FormControl>
              <CompanyAutoComplete  value={defaultValues.company} onAddCompanies={handleComapny}/>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={loading}>
                {!isEdit ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>{ }</Grid>
      </Grid>
    </FormProvider>
  );

}

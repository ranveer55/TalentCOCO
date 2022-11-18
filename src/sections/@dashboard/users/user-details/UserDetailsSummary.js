import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// form
import {useForm } from 'react-hook-form';
// @mui
import {styled } from '@mui/material/styles';
import {Stack, Button, Divider,Typography, Grid } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/Iconify';
import SocialsButton from '../../../../components/SocialsButton';
import { FormProvider} from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

UserDetailsSummary.propTypes = {
  onAddCart: PropTypes.func,
  onGotoStep: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,

  }),
};

export default function UserDetailsSummary({ user, onAddCart, onGotoStep, ...other }) {
   const navigate = useNavigate();

 
  return (
    <RootStyle {...other} sx={{ marginTop: "2px" }}>
          <Grid container xs={12}>
          <Grid item xs={6}>
            <Typography variant="h5" >
              Name:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography >
              {user.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Typography variant="h5" >
            Email:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography >
              {user.email}
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Typography variant="h5" >
            Role:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography >
              {user.role}
            </Typography>
          </Grid>
        </Grid>
       
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Divider sx={{ borderStyle: 'dashed' }} />
           <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
           <Grid container xs={12}>
          <Grid item xs={9}>{}</Grid>
          <Grid item xs={3}>
          <Button
            fullWidth

            size="large"
            variant="contained"
            onClick={()=>navigate(PATH_DASHBOARD.users.user)}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Back
          </Button>
          </Grid>
          </Grid>

        </Stack>

      </RootStyle>
  );
}

// ----------------------------------------------------------------------


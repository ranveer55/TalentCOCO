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

CourseDetailsSummary.propTypes = {
  onAddCart: PropTypes.func,
  onGotoStep: PropTypes.func,
  course: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,

  }),
};

export default function CourseDetailsSummary({ course, onAddCart, onGotoStep, ...other }) {
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
              {course.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Typography variant="h5" >
            Description:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography >
              {course.description}
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Typography variant="h5" >
            Hours:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography >
              {course.hours}
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Typography variant="h5" >
            Poster:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              {course.poster}
            </Typography>
          </Grid>
        </Grid>
       
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Typography variant="h5" >
            Total Lessons:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              {course.totalLessons}
            </Typography>
          </Grid>
        </Grid>
       
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Typography variant="h5" >
            Language:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              {course.language}
            </Typography>
          </Grid>
        </Grid>
       
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Typography variant="h5" >
            Level:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              {course.level}
            </Typography>
          </Grid>
        </Grid>
       
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Typography variant="h5" >
            Reviews Average:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              {course?.reviews?.avg}
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
            onClick={()=>navigate(PATH_DASHBOARD.course)}
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


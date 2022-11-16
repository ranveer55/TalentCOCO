import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Button, Divider, Typography, Grid } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/Iconify';
import SocialsButton from '../../../../components/SocialsButton';
import { FormProvider } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

LectureDetailsSummary.propTypes = {
  onAddCart: PropTypes.func,
  onGotoStep: PropTypes.func,
  lecture: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,

  }),
};

export default function LectureDetailsSummary({ lecture, onAddCart, onGotoStep, ...other }) {
  const navigate = useNavigate();

  const {
    id,
    title,
    price,
  } = lecture;
  const alreadyLecture = false

  const defaultValues = {
    id,
    title,
    price,

  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, handleSubmit } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    try {
      if (!alreadyLecture) {
        onAddCart({
          ...data,
          subtotal: data.price * data.quantity,
        });
      }
      onGotoStep(0);
      navigate(PATH_DASHBOARD.eCommerce.lecture);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCart = async () => {
    try {
      onAddCart({
        ...values,
        subtotal: values.price * values.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RootStyle {...other} sx={{ marginTop: "2px" }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Typography variant="h5" >
              Name:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography >
              {lecture.name}
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
              {lecture.description}
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Typography variant="h5" >
              Type:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography >
              {lecture.type}
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Typography variant="h5" >
              Order:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              {lecture.order}
            </Typography>
          </Grid>
        </Grid>


        <Grid container xs={12}>
          <Grid item xs={6}>
            <Typography variant="h5" >
              Lesson Id:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              {lecture.lessonId}
            </Typography>
          </Grid>
        </Grid>

        <Grid container xs={12}>
          <Grid item xs={6}>
            <Typography variant="h5" >
              Active:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              {lecture.active}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
          <Grid container xs={12}>
            <Grid item xs={3}>{ }</Grid>
            <Grid item xs={3}>
              <Button
                fullWidth

                size="large"
                color="warning"
                variant="contained"
                startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
                onClick={handleAddCart}
                sx={{ whiteSpace: 'nowrap' }}
              >
                Add to Cart
              </Button>
            </Grid>
            <Grid item xs={1}>{ }</Grid>
            <Grid item xs={3}>
              <Button fullWidth size="large" type="submit" variant="contained">
                Buy Now
              </Button>
            </Grid>
            <Grid item xs={2}>{ }</Grid>
          </Grid>

        </Stack>

        <Stack alignItems="center" sx={{ mt: 3 }}>
          <SocialsButton initialColor />
        </Stack>
      </FormProvider>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------


import PropTypes from 'prop-types';
import { useState } from 'react';
import sumBy from 'lodash/sumBy';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Rating, Button, Typography, LinearProgress, Stack, Link } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const RatingStyle = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  '&:nth-of-type(2)': {
    [theme.breakpoints.up('md')]: {
      borderLeft: `solid 1px ${theme.palette.divider}`,
      borderRight: `solid 1px ${theme.palette.divider}`,
    },
  },
}));

// ----------------------------------------------------------------------

CohortDetailsReviewOverview.propTypes = {
  cohort: PropTypes.object,
  onOpen: PropTypes.func,
};

export default function CohortDetailsReviewOverview({ cohort, onOpen }) {
  
  const [ratings, setRating] = useState([5]);
  const [totalRating, settotalRating] = useState(5);
  const [totalReview, settotaltotalReview] = useState(5);
  const total = sumBy(ratings, (star) => star.starCount);

  return (
    <Grid container>
      <GridStyle cohort xs={12} md={4}>
        <Typography variant="subtitle1" gutterBottom>
          Average rating
        </Typography>
        <Typography variant="h2" gutterBottom sx={{ color: 'error.main' }}>
          {totalRating}/5
        </Typography>
        <RatingStyle readOnly value={totalRating} precision={0.1} />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          ({fShortenNumber(totalReview)}
          &nbsp;reviews)
        </Typography>
      </GridStyle>

      <GridStyle cohort xs={12} md={4}>
        <Stack spacing={1.5} sx={{ width: 1 }}>
          {ratings
            .slice(0)
            .reverse()
            .map((rating) => (
              <ProgressCohort key={rating.name} star={rating} total={total} />
            ))}
        </Stack>
      </GridStyle>

      <GridStyle cohort xs={12} md={4}>
        <Link href="#move_add_review" underline="none">
          <Button size="large" onClick={onOpen} variant="outlined" startIcon={<Iconify icon={'eva:edit-2-fill'} />}>
            Write your review
          </Button>
        </Link>
      </GridStyle>
    </Grid>
  );
}

// ----------------------------------------------------------------------

ProgressCohort.propTypes = {
  star: PropTypes.object,
  total: PropTypes.number,
};

function ProgressCohort({ star, total }) {
  const { name, starCount, reviewCount } = star;
  return (
    <Stack direction="row" alignItem="center" spacing={1.5}>
      <Typography variant="subtitle2">{name}</Typography>
      <LinearProgress
        variant="determinate"
        value={(starCount / total) * 100}
        sx={{
          mx: 2,
          flexGrow: 1,
          bgcolor: 'divider',
        }}
      />
      <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 64, textAlign: 'right' }}>
        {fShortenNumber(reviewCount)}
      </Typography>
    </Stack>
  );
}

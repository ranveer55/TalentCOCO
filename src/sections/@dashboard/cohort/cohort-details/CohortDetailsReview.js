import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Divider, Collapse } from '@mui/material';
//
import CohortDetailsReviewForm from './CohortDetailsReviewForm';
import CohortDetailsReviewOverview from './CohortDetailsReviewOverview';

// ----------------------------------------------------------------------

CohortDetailsReview.propTypes = {
  cohort: PropTypes.object,
};

export default function CohortDetailsReview({ cohort }) {
  const [reviewBox, setReviewBox] = useState(false);

  const handleOpenReviewBox = () => {
    setReviewBox((prev) => !prev);
  };

  const handleCloseReviewBox = () => {
    setReviewBox(false);
  };

  return (
    <>
      <CohortDetailsReviewOverview cohort={cohort} onOpen={handleOpenReviewBox} />

      <Divider />

      <Collapse in={reviewBox}>
        <CohortDetailsReviewForm onClose={handleCloseReviewBox} id="move_add_review" />
        <Divider />
      </Collapse>
    
    </>
  );
}

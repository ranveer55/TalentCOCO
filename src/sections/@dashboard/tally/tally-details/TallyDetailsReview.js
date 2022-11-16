import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Divider, Collapse } from '@mui/material';
//
import TallyDetailsReviewForm from './TallyDetailsReviewForm';
import TallyDetailsReviewOverview from './TallyDetailsReviewOverview';

// ----------------------------------------------------------------------

TallyDetailsReview.propTypes = {
  item: PropTypes.object,
};

export default function TallyDetailsReview({ item }) {
  const [reviewBox, setReviewBox] = useState(false);

  const handleOpenReviewBox = () => {
    setReviewBox((prev) => !prev);
  };

  const handleCloseReviewBox = () => {
    setReviewBox(false);
  };

  return (
    <>
      <TallyDetailsReviewOverview item={item} onOpen={handleOpenReviewBox} />

      <Divider />

      <Collapse in={reviewBox}>
        <TallyDetailsReviewForm onClose={handleCloseReviewBox} id="move_add_review" />
        <Divider />
      </Collapse>
    
    </>
  );
}

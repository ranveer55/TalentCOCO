import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Divider, Collapse } from '@mui/material';
//
import TeamDetailsReviewForm from './TeamDetailsReviewForm';
import TeamDetailsReviewOverview from './TeamDetailsReviewOverview';

// ----------------------------------------------------------------------

TeamDetailsReview.propTypes = {
  item: PropTypes.object,
};

export default function TeamDetailsReview({ item }) {
  const [reviewBox, setReviewBox] = useState(false);

  const handleOpenReviewBox = () => {
    setReviewBox((prev) => !prev);
  };

  const handleCloseReviewBox = () => {
    setReviewBox(false);
  };

  return (
    <>
      <TeamDetailsReviewOverview item={item} onOpen={handleOpenReviewBox} />

      <Divider />

      <Collapse in={reviewBox}>
        <TeamDetailsReviewForm onClose={handleCloseReviewBox} id="move_add_review" />
        <Divider />
      </Collapse>
    
    </>
  );
}

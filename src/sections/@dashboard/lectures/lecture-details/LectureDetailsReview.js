import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Divider, Collapse } from '@mui/material';
//
import LectureDetailsReviewForm from './LectureDetailsReviewForm';
import LectureDetailsReviewOverview from './LectureDetailsReviewOverview';

// ----------------------------------------------------------------------

LectureDetailsReview.propTypes = {
  lecture: PropTypes.object,
};

export default function LectureDetailsReview({ lecture }) {
  const [reviewBox, setReviewBox] = useState(false);

  const handleOpenReviewBox = () => {
    setReviewBox((prev) => !prev);
  };

  const handleCloseReviewBox = () => {
    setReviewBox(false);
  };

  return (
    <>
      <LectureDetailsReviewOverview lecture={lecture} onOpen={handleOpenReviewBox} />

      <Divider />

      <Collapse in={reviewBox}>
        <LectureDetailsReviewForm onClose={handleCloseReviewBox} id="move_add_review" />
        <Divider />
      </Collapse>
    
    </>
  );
}

import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Divider, Collapse } from '@mui/material';
//
import LessonDetailsReviewForm from './lessonDetailsReviewForm';
import LessonDetailsReviewOverview from './lessonDetailsReviewOverview';

// ----------------------------------------------------------------------

LessonDetailsReview.propTypes = {
  lesson: PropTypes.object,
};

export default function LessonDetailsReview({ lesson }) {
  const [reviewBox, setReviewBox] = useState(false);

  const handleOpenReviewBox = () => {
    setReviewBox((prev) => !prev);
  };

  const handleCloseReviewBox = () => {
    setReviewBox(false);
  };

  return (
    <>
      <LessonDetailsReviewOverview lesson={lesson} onOpen={handleOpenReviewBox} />

      <Divider />

      <Collapse in={reviewBox}>
        <LessonDetailsReviewForm onClose={handleCloseReviewBox} id="move_add_review" />
        <Divider />
      </Collapse>
    
    </>
  );
}

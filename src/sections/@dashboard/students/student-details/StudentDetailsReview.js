import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Divider, Collapse } from '@mui/material';
//
import StudentDetailsReviewForm from './StudentDetailsReviewForm';
import StudentDetailsReviewOverview from './StudentDetailsReviewOverview';

// ----------------------------------------------------------------------

StudentDetailsReview.propTypes = {
  student: PropTypes.object,
};

export default function StudentDetailsReview({ student }) {
  const [reviewBox, setReviewBox] = useState(false);

  const handleOpenReviewBox = () => {
    setReviewBox((prev) => !prev);
  };

  const handleCloseReviewBox = () => {
    setReviewBox(false);
  };

  return (
    <>
      <StudentDetailsReviewOverview student={student} onOpen={handleOpenReviewBox} />

      <Divider />

      <Collapse in={reviewBox}>
        <StudentDetailsReviewForm onClose={handleCloseReviewBox} id="move_add_review" />
        <Divider />
      </Collapse>
    
    </>
  );
}

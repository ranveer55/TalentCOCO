import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Divider, Collapse } from '@mui/material';
//
import TestcaseDetailsReviewForm from './TestcaseDetailsReviewForm';
import TestcaseDetailsReviewOverview from './TestcaseDetailsReviewOverview';

// ----------------------------------------------------------------------

TestcaseDetailsReview.propTypes = {
  testcase: PropTypes.object,
};

export default function TestcaseDetailsReview({ testcase }) {
  const [reviewBox, setReviewBox] = useState(false);

  const handleOpenReviewBox = () => {
    setReviewBox((prev) => !prev);
  };

  const handleCloseReviewBox = () => {
    setReviewBox(false);
  };

  return (
    <>
      <TestcaseDetailsReviewOverview testcase={testcase} onOpen={handleOpenReviewBox} />

      <Divider />

      <Collapse in={reviewBox}>
        <TestcaseDetailsReviewForm onClose={handleCloseReviewBox} id="move_add_review" />
        <Divider />
      </Collapse>
    
    </>
  );
}

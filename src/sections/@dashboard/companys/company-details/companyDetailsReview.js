import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Divider, Collapse } from '@mui/material';
//
import CompanyDetailsReviewForm from './companyDetailsReviewForm';
import CompanyDetailsReviewOverview from './companyDetailsReviewOverview';

// ----------------------------------------------------------------------

CompanyDetailsReview.propTypes = {
  company: PropTypes.object,
};

export default function CompanyDetailsReview({ company }) {
  const [reviewBox, setReviewBox] = useState(false);

  const handleOpenReviewBox = () => {
    setReviewBox((prev) => !prev);
  };

  const handleCloseReviewBox = () => {
    setReviewBox(false);
  };

  return (
    <>
      <CompanyDetailsReviewOverview company={company} onOpen={handleOpenReviewBox} />

      <Divider />

      <Collapse in={reviewBox}>
        <CompanyDetailsReviewForm onClose={handleCloseReviewBox} id="move_add_review" />
        <Divider />
      </Collapse>
    
    </>
  );
}

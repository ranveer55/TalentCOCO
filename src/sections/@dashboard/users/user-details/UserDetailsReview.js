import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Divider, Collapse } from '@mui/material';
//
import UserDetailsReviewForm from './UserDetailsReviewForm';
import UserDetailsReviewOverview from './UserDetailsReviewOverview';

// ----------------------------------------------------------------------

UserDetailsReview.propTypes = {
  user: PropTypes.object,
};

export default function UserDetailsReview({ user }) {
  const [reviewBox, setReviewBox] = useState(false);

  const handleOpenReviewBox = () => {
    setReviewBox((prev) => !prev);
  };

  const handleCloseReviewBox = () => {
    setReviewBox(false);
  };

  return (
    <>
      <UserDetailsReviewOverview user={user} onOpen={handleOpenReviewBox} />

      <Divider />

      <Collapse in={reviewBox}>
        <UserDetailsReviewForm onClose={handleCloseReviewBox} id="move_add_review" />
        <Divider />
      </Collapse>
    
    </>
  );
}

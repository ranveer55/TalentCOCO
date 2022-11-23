import { sentenceCase,paramCase } from 'change-case';
import {useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Tab, Card, Grid, Divider, Container, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {addCart, onGotoStep } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Markdown from '../../components/Markdown';
import { SkeletonProduct } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  TestcaseDetailsSummary,
  TestcaseDetailsReview,
 } from '../../sections/@dashboard/testcase/testcase-details';

import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
import { getTestCase } from './store/actions';

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));

// ----------------------------------------------------------------------

export default function TestcaseDetails() {
  const navigate = useNavigate();
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { id,CourseId, lessonId,lectureId} = useParams();
  const [value, setValue] = useState('2');
  const { testcase} = useSelector((state) => state.testcase);
    useEffect(() => {
      if(id){
        dispatch(getTestCase(id));
      }
  }, [id]);
  return (
    <Page title="Testcase:Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Test Case Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.course.root },
            {
              name: 'Course',
              href: PATH_DASHBOARD.course.root,
            },
            {
              name: 'Lessons',
              href: PATH_DASHBOARD.course.lesson(paramCase(CourseId)),
            },
            {
              name: 'Lecture',
              href: PATH_DASHBOARD.course.lectures(CourseId,lessonId),
            },
            {
              name: 'Test Case',
              href: PATH_DASHBOARD.course.testcases(CourseId,lessonId,lectureId),
            },

             {
              name: 'Test Case Detail',
              },
            
          ]}
        />

        <CartWidget />

        {testcase && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} >
                  <TestcaseDetailsSummary
                    testcase={testcase}
                    CourseId={CourseId}
                    lessonId={lessonId}
                    lectureId={lectureId}
                  />
                </Grid>
                 </Grid>
            </Card>
          </>
        )}

        {!testcase && <SkeletonProduct />}
      </Container>
    </Page>
  );
}

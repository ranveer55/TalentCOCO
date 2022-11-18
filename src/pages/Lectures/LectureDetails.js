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
  LectureDetailsSummary,
  LectureDetailsReview,
 } from '../../sections/@dashboard/lectures/lecture-details';

import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
import { getLecture } from './store/actions';

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

export default function LectureDetails() {
  const navigate = useNavigate();
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const {id } = useParams();
  const [value, setValue] = useState('2');
  const { lecture} = useSelector((state) => state.lecture);
    useEffect(() => {
      if(id){
        dispatch(getLecture(id));
      }
  }, [id]);
  return (
    <Page title="Lecture:Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Lecture Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.course.root },
            {
              name: 'Lecture',
              href:PATH_DASHBOARD.course.lectures(CourseId,lessonId),
            },
             {
              name: 'Lecture Detail',
              },
            
          ]}
        />

        <CartWidget />

        {lecture && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} >
                  <LectureDetailsSummary
                    lecture={lecture}
                  />
                </Grid>
                 </Grid>
            </Card>
          </>
        )}

        {!lecture && <SkeletonProduct />}
      </Container>
    </Page>
  );
}

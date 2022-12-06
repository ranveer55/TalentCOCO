import { sentenceCase,paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
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
  StudentDetailsSummary,
  StudentDetailsReview,
 } from '../../sections/@dashboard/students/student-details';

import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
import { getStudent} from './store/actions';
// ----------------------------------------------------------------------

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

export default function StudentDetails() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { student: { student, loading }} = useSelector((state) => state);
    useEffect(() => {
    dispatch(getStudent(id));
  }, [dispatch]);
  
   return (
    <Page title="Student:Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Student Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Student',
              href: PATH_DASHBOARD.student.root,
            },
             {
              name: 'Student Detail',
              href: PATH_DASHBOARD.root,
            },
            
          ]}
        />

          {student && (
              <>
            <Card sx={{p:2}}>
            <Typography variant="subtitle1" gutterBottom>
                      {student.name}
                </Typography>
                <Typography variant="p" gutterBottom>
                      {student.description}
                </Typography>
            </Card>
          </>   
          )}
           </Container>
    </Page>
  );
}

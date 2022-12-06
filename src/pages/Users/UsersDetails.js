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
  UserDetailsSummary,
  UserDetailsReview,
 } from '../../sections/@dashboard/users/user-details';

import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
import { getUser } from '../../redux/slices/User';
// ----------------------------------------------------------------------

const USER_DESCRIPTION = [
  {
    title: '100% Original',
    description: 'It is made by a chemical process called fermentation that uses sugars and yeast.',
    icon: 'ic:round-verified',
  },
  {
    title: 'affordable price',
    description: 'its price is low enough that you (or most people) have enough money to buy it.',
    icon: 'ic:round-verified-user',
  }, 
];

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

export default function UserDetails() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [value, setValue] = useState('2');
  const { users, error, checkout } = useSelector((state) => state.user);
  const user = users.find((user) => paramCase(user.id) === id);
   useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleAddCart = (user) => {
    dispatch(addCart(user));
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };

  return (
    <Page title="User:Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="User Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'User',
              href: PATH_DASHBOARD.users.user,
            },
             {
              name: 'User Detail',
              href: PATH_DASHBOARD.users.root,
            },
            
          ]}
        />

        <CartWidget />

        {user && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} >
                  <UserDetailsSummary
                    user={user}
                    onAddCart={handleAddCart}
                    onGotoStep={handleGotoStep}
                  />
                </Grid>
                 </Grid>
            </Card>

            <Grid container sx={{ my: 8 }}>
              {USER_DESCRIPTION.map((user) => (
                <Grid item xs={12} md={4} key={user.name}>
                  <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {user.name}
                    </Typography>
                   </Box>
                </Grid>
              ))}
            </Grid>

            <Card>
              <TabContext value={value}>
               
                <Divider />
               <TabPanel value="2">
                  <UserDetailsReview user={user} />
                </TabPanel>
              </TabContext>
            </Card>
          </>
        )}

        {!user && <SkeletonProduct />}

        {error && <Typography variant="h6">404 Product not found</Typography>}
      </Container>
    </Page>
  );
}

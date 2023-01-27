import React from 'react';
// @mui
import { Button, Grid, Typography, Container } from '@mui/material';
import styled from '@emotion/styled';

const BackGroundImage = styled(Grid)(({ theme }) => ({
  backgroundImage:
    "url('/assets/illustrations/Rectangle 2.png')",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  [theme.breakpoints.up('md')]: {
    width: '136%',
    marginLeft: '-216px',
    marginRight: '-180px',
    padding: '0px 182px 4px 152px',
  },
  [theme.breakpoints.down('md')]: {
    width: '112%',
    marginLeft: '-15.5px',
    marginRight: '-206px',
    padding: '0px 182px 4px 22px',
  },
}));
const A = styled(Grid)(({ theme }) => ({
  '&:hover': {
    color: '#43227F',
    background:'#E0D2F7',
    borderRadius: '12px',
    width:'100%',
    },
  padding:'0px 0px 0px 10px',
}));
const A1 = styled(Grid)(({ theme }) => ({
  '&:hover': {
    color: '#43227F',
    background:'#E0D2F7',
    borderRadius: '12px',
    width:'100%',
    },
  padding:'0px 0px 0px 10px',
  [theme.breakpoints.up('md')]: {
    marginLeft:'10px'
  },
}));
const buttonText = {
  color: '#FFFFFF',
  flex: 'none',
  order: 0,
  flexGrow: 0,
  fontWeight: 600,
  fontSize: '22px',
  lineHeight: '40px',
  textTransform: 'none',
};
const button = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2px 2px',
  marginTop:'10px',
  marginLeft:'20px',
  width: '200px',
  background: '#6E39D4',
  boxShadow: '0px 0px 20px rgba(110, 57, 212, 0.3)',
  borderRadius: '12px',
};


const NavMenu = styled.div`
  display: flex;
  font-size:20px;
  padding:18px 50px 0px 50px;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navbar = () => {
  return (
    <Container>
      <BackGroundImage>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={4}>
            <Typography variant="h4" sx={{ color: 'black', padding: '15px 0px 22px 30px' }}>
              Logo
            </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6} >
            <NavMenu>
            <Grid container spacing={2}>
            <Grid item xs={12} md={2} lg={2} >
            <A> <a href="/#home" style={{ textDecoration:'none'}}>Home</a></A>
              </Grid>
              <Grid item xs={12} md={3} lg={3} >
              <A1> <a href="/#service" style={{ textDecoration:'none'}}>Service</a></A1>
              </Grid>
              <Grid item xs={12} md={3} lg={3} >
              <A><a href="/#platform" style={{textDecoration:'none'}}>Platform</a></A>
              </Grid>
              <Grid item xs={12} md={4} lg={4} >
              <A> <a href="/#contactus" style={{textDecoration:'none'}}>Contact us</a></A>
              </Grid>
              </Grid>
              </NavMenu >
              </Grid>
              <Grid item xs={12} md={2} lg={2}>
              <Button size='large' variant="contained" sx={{ ...button, ...buttonText }}>Contact us</Button>
              </Grid>
            </Grid>
         </BackGroundImage>
        </Container>
        );
};

        export default Navbar;

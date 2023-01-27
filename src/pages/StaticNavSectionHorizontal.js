import PropTypes from 'prop-types';
import { memo } from 'react';
import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import { NavLink as Link } from 'react-router-dom';

// @mui
import { Button, Stack, Grid, Typography, Container } from '@mui/material';
//
import { NavListRoot } from '../components/nav-section/horizontal/NavList';

// ----------------------------------------------------------------------


const hideScrollbar = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};
const BackGroundImage = styled(Grid)(({ theme }) => ({
  backgroundImage:
    "url('/assets/illustrations/Rectangle 2.png')",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  [theme.breakpoints.up('md')]: {
    width: '142%',
    marginLeft: '-240px',
    marginRight: '-180px',
    padding: '0px 182px 4px 152px',
  },
  [theme.breakpoints.down('md')]: {
    width: '118.5%',
    marginLeft: '-48px',
    marginRight: '-195px',
    padding: '0px 182px 4px 22px',
  },
}));

NavSectionHorizontal.propTypes = {
  navConfig: PropTypes.array,
};

function NavSectionHorizontal({ navConfig }) {
  return (
    <Container>
      <BackGroundImage>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={1}
        >        <Stack>
            <Typography variant="h4" sx={{ color: 'black', padding: '15px 0px 22px 30px' }}>
              Logo
            </Typography>
          </Stack>
          <Stack>
            <Stack >
              {navConfig.map((group) => (
                <Grid key={group.subheader} flexShrink={0} sx={{ padding: '20px 15px 0px 210px' }}>
                  {group.items.map((list) => (
                    <NavListRoot key={list.title + list.path} list={list} />
                  ))}
                </Grid>
              ))}
            </Stack>
          </Stack>
          <Stack>
            <Button size='large' fontSize="large" variant="contained" sx={{ padding: '0px 50px ', marginTop: '15px',textTransform:'none'}}>Contact us</Button>
          </Stack>
        </Stack>
      </BackGroundImage>
    </Container>
  );
}

export default memo(NavSectionHorizontal);

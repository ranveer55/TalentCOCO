import { memo } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, AppBar, Grid, Button, Typography } from '@mui/material';

// config
import { HEADER } from '../config';
// components
import NavSectionHorizontal from './StaticNavSectionHorizontal';
//
import navConfig from './StaticNavConfig';

// ----------------------------------------------------------------------

function NavbarHorizontal() {
  return (
    <Container >
        <NavSectionHorizontal navConfig={navConfig} />
    </Container>
  );
}

export default memo(NavbarHorizontal);

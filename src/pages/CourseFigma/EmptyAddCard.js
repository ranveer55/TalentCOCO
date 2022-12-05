import { useCallback, useState, useMemo, useEffect } from 'react';
import { useNavigate ,useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Container, IconButton, Grid, Card, Chip, Stack, Button, TextField, Switch, Box, Typography, Autocomplete, FormControlLabel, FormGroup, Checkbox, Tooltip, Divider, } from '@mui/material';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { useDispatch, useSelector } from '../../redux/store';
import SectionForm from './SectionForm';
import SectionList from './SectionList';
import {getCourse, createCourse, updateCourse } from './store/actions'

const EmptyAddCard = ({title='Add New'}) => {
  const [add, setAdd] = useState(false)
  const onClick = () => {
    setAdd(!add)
  }
  return (
    <Card sx={{ p: 2, m: 2 }}>
      <Tooltip title={title}>
        <IconButton aria-label="add" size="medium" color="primary" onClick={onClick}>
          <Iconify icon="eva:plus-circle-outline" />

        </IconButton>
      </Tooltip>
      {add ? <SectionForm hide={onClick} /> : null}
    </Card>
  )
}

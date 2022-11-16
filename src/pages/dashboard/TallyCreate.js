import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getTally } from '../../redux/slices/Tally';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import TallyNewEditForm from '../../sections/@dashboard/tally/Edit/tallyNewEditForm';
// ----------------------------------------------------------------------

export default function TallyCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { tallys } = useSelector((state) => state.tally);
  const isEdit = pathname.includes('edit');
  const currentTally = tallys.find((tallys) => tallys.id === 1);
  console.log("currentTally", currentTally)
  useEffect(() => {
    dispatch(getTally());
  }, [dispatch]);

  return (
    <Page title="Tally: Create a new tally">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new Tally' : 'Edit Tally'}
          links={[
            { id: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              id: 'Tally',
              href: PATH_DASHBOARD.items.root,
            },
            { id: !isEdit ? 'New Tally' : id },
          ]}
        />

        <TallyNewEditForm isEdit={isEdit} currentTally={currentTally} />
      </Container>
    </Page>
  );
}

import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import TeamNewEditForm from '../../sections/@dashboard/team/Edit/tallyNewEditForm';
import { getTeam } from '../../redux/slices/Team';

// ----------------------------------------------------------------------

export default function TeamCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { teams } = useSelector((state) => state.team);
  const isEdit = pathname.includes('edit');
  const currentTeam = teams.find((team) => paramCase(team.title) === name);
  useEffect(() => {
    dispatch(getTeam());
  }, [dispatch]);

  return (
    <Page title="Items: Create a new Team">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new Team' : 'Edit Team'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Items',
              href: PATH_DASHBOARD.teams.root,
            },
            { name: !isEdit ? 'New Team' : name },
          ]}
        />

        <TeamNewEditForm isEdit={isEdit} currentTeam={currentTeam} />
      </Container>
    </Page>
  );
}

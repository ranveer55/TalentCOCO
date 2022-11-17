import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUser } from './store/actions';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import UserNewEditForm from '../../sections/@dashboard/users/Edit/UserNewEditForm';
// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { user: { users, user, loading, error }, app: { masterdata } } = useSelector((state) => state);
  const isEdit = pathname.includes('edit');
  useEffect(() => {
    if(id){
      dispatch(getUser(id));
    }
    
  }, [dispatch]);

  return (
    <Page title="Users: Create a new User">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new User' : 'Edit User'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Users',
              href: PATH_DASHBOARD.users.root,
            },
            { id: !isEdit ? 'New User' : id },
          ]}
        />

        <UserNewEditForm isEdit={isEdit} currentUser={user} />
      </Container>
    </Page>
  );
}

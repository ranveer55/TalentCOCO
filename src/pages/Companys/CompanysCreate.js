import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCompany } from './store/actions';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import CompanyNewEditForm from '../../sections/@dashboard/companys/Edit/CompanyNewEditForm';

// ----------------------------------------------------------------------

export default function CompanyCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { companys } = useSelector((state) => state.company);
  const isEdit = pathname.includes('edit');
  const currentCompany = companys.find((company) => paramCase(company.id) === id);
  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);

  return (
    <Page title="Companys: Create a new Company">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new Company' : 'Edit Company'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Companys',
              href: PATH_DASHBOARD.companys.root,
            },
            { id: !isEdit ? 'New Company' : id },
          ]}
        />

        <CompanyNewEditForm isEdit={isEdit} currentCompany={currentCompany} />
      </Container>
    </Page>
  );
}

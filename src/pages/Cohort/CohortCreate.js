import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCohort, getCohorts } from './store/actions';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import CohortNewEditForm from '../../sections/@dashboard/cohort/Edit/CohortNewEditForm';
// ----------------------------------------------------------------------

export default function CohortCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { cohort: { cohorts, loading } } = useSelector((state) => state);
  const [csvData, setCsvData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const isEdit = pathname.includes('edit');
  useEffect(() => {
    if (id) {
      dispatch(getCohort(id));
    }

  }, [dispatch]);
  useEffect(() => {
       dispatch(getCohorts());
    }, [dispatch]);
  useEffect(() => {
        setCsvData(cohorts?.results);
    }, [cohorts]);

 
  return (
    <Page title="cohorts: Create a new cohort">
      <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
              heading={!isEdit ? 'Create a new cohort' : 'Edit cohort'}
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                {
                  name: 'cohorts',
                  href: PATH_DASHBOARD.cohort.root,
                },
                { id: !isEdit ? 'New Cohort' : id },
              ]}
            />
           <CohortNewEditForm isEdit={isEdit} />
      </Container>
    </Page>
  );
}

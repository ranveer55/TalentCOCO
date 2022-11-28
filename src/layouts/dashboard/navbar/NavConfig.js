// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
};

const navConfig = [
  
  {
    subheader: 'management',
    items: [
       {
        title: 'users',
        path: PATH_DASHBOARD.users.root,
        icon: ICONS.user,
        children: [
          { title: 'list Users', path: PATH_DASHBOARD.users.root },
          { title: 'create Users', path: PATH_DASHBOARD.users.new },
          ],
      },
     // COPMANIES

      {
        title: 'companies',
        path: PATH_DASHBOARD.companies.root,
        icon: ICONS.cart,
        children: [
          { title: 'list Companies ', path: PATH_DASHBOARD.companies.list },
          { title: 'create Companies', path: PATH_DASHBOARD.companies.new },
          ],
      },
      // COURSES
      {
        title: 'courses',
        path: PATH_DASHBOARD.course.root,
        icon: ICONS.cart,
        children: [
          { title: 'list Courses', path: PATH_DASHBOARD.course.root },
          { title: 'create Courses', path: PATH_DASHBOARD.course.new },
          ],
      },
      // REPORT
      {
        title: 'report',
        path: PATH_DASHBOARD.report.root,
        icon: ICONS.cart,
        children: [
          { title: 'Report', path: PATH_DASHBOARD.report.root },
           ],
      },

    ],
  },

];

export default navConfig;

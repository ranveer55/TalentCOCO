// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------


const navConfig = [
  
  {
    subheader: 'management',
    items: [
       {
        title: 'home',
        path: PATH_DASHBOARD.home.root,
        children: [
          { title: 'list Users', path: PATH_DASHBOARD.home.root },
          ],
      },

      
     // COURSEFIGMA 
      {
        title: 'coursefigma',
        path: PATH_DASHBOARD.coursefigma.root,
        children: [
          { title: 'CourseFigma', path: PATH_DASHBOARD.coursefigma.root },
           ],
      },
    ],
  },

];

export default navConfig;

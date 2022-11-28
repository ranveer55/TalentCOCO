import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
       
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'new-password', element: <NewPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        { path: 'banking', element: <GeneralBanking /> },
        { path: 'booking', element: <GeneralBooking /> },

        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
            { path: 'shop', element: <EcommerceShop /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
          ],
        },
        {
          children: [
            { path: 'users', element: <User /> },
            { path: 'users/new', element: <UserCreate /> },
            { path: 'users/:id/edit', element: <UserCreate /> },
            { path: 'users/:id', element: <UserDetails /> },
          ],
        },
        {
          children: [
            { path: 'companies', element: <Company /> },
            { path: 'companies/new', element: <CompanyCreate /> },
            { path: 'companies/:id/edit', element: <CompanyCreate /> },
            { path: 'companies/:id', element: <CompanyDetails /> },
          ],
        },
        {
          children: [
            { path: 'course', element: <Course /> },
            { path: 'course/:CourseId', element: <Lesson /> },
            { path: 'course/:CourseId/new', element: <LessonCreate /> },
            { path: 'course/:CourseId/:id/edit', element: <LessonCreate /> },
            { path: 'course/:CourseId/view/:id', element: <LessonDetails /> },
            { path: 'course/:CourseId/lesson/:lessonId', element: <Lecture /> },
            { path: 'course/:CourseId/lesson/:lessonId/lecture/new', element: <LectureCreate /> },
            { path: 'course/:CourseId/lesson/:lessonId/lecture/:id/edit', element: <LectureCreate /> },
            { path: 'course/:CourseId/lesson/:lessonId/lecture/view/:id', element: <LectureDetails /> },
            { path: 'course/:CourseId/lesson/:lessonId/lecture/:lectureId', element: <Testcase /> },
            { path: 'course/:CourseId/lesson/:lessonId/lecture/:lectureId/testcase/new', element: <TestcaseCreate /> },
            { path: 'course/:CourseId/lesson/:lessonId/lecture/:lectureId/testcase/:id/edit', element: <TestcaseCreate /> },
            { path: 'course/:CourseId/lesson/:lessonId/lecture/:lectureId/testcase/view/:id', element: <TestcaseDetails /> },
            { path: 'course/new', element: <CourseCreate /> },
            { path: 'course/:id/edit', element: <CourseCreate /> },
            { path: 'course/view/:id', element: <CourseDetails /> },
          ],
        },
        {
          children: [
            { path: `report`, element: <Report /> },
           ],
        },
        {
          path: 'lectures',
          children: [
            { element: <Navigate to="/dashboard/Lectures/lectures/lecture" replace />, index: true },
            { path: 'lecture', element: <Lecture /> },

          ],
        },
        {
          path: 'lessons',
          children: [
            { element: <Navigate to="/dashboard/Lessons/lessons/lesson" replace />, index: true },

          ],
        },
       
        {
          path: 'tallys',
          children: [
            { element: <Navigate to="/dashboard/tallys/tally" replace />, index: true },
            { path: 'tally', element: <Tally /> },
            { path: 'tally/new', element: <TallyCreate /> },
            { path: 'tally/:id/edit', element: <TallyCreate /> },
          ],
        },
        {
          path: 'teams',
          children: [
            { element: <Navigate to="/dashboard/teams/team" replace />, index: true },
            { path: 'team', element: <Team /> },
            { path: 'team/new', element: <TeamCreate /> },
            { path: 'team/:name/edit', element: <TeamCreate /> },
          ],
        },

        { /*
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfile /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> },
          ],
        */ },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceList /> },
            { path: ':id', element: <InvoiceDetails /> },
            { path: ':id/edit', element: <InvoiceEdit /> },
            { path: 'new', element: <InvoiceCreate /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new', element: <BlogNewPost /> },
          ],
        },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> },
          ],
        },
        {
          path: 'chat',
          children: [
            { element: <Chat />, index: true },
            { path: 'new', element: <Chat /> },
            { path: ':conversationKey', element: <Chat /> },
          ],
        },
        { path: 'calendar', element: <Calendar /> },
        { path: 'kanban', element: <Kanban /> },
        { path: 'permission-denied', element: <PermissionDenied /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <GuestGuard>
        <Login />
      </GuestGuard>,
      children: [
        { element: <HomePage />, index: true },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <Faqs /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const NewPassword = Loadable(lazy(() => import('../pages/auth/NewPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

// DASHBOARD

// GENERAL
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const GeneralBanking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));

// ECOMMERCE
const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
const EcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductDetails')));
const EcommerceProductList = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductList')));
const EcommerceProductCreate = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductCreate')));
const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));
// USERS
const User = Loadable(lazy(() => import('../pages/Users/List')));
const UserCreate = Loadable(lazy(() => import('../pages/Users/UsersCreate')));
const UserDetails = Loadable(lazy(() => import('../pages/Users/UsersDetails')));
// REPORT
const Report = Loadable(lazy(() => import('../pages/Report/Report')));
// COURSE
const Course = Loadable(lazy(() => import('../pages/Courses/Courses')));
const CourseCreate = Loadable(lazy(() => import('../pages/Courses/CoursesCreate')));
const CourseDetails = Loadable(lazy(() => import('../pages/Courses/CoursesDetails')));
// LECTURE
const Lecture = Loadable(lazy(() => import('../pages/Lectures/Lecture')));
const LectureCreate = Loadable(lazy(() => import('../pages/Lectures/LectureCreate')));
const LectureDetails = Loadable(lazy(() => import('../pages/Lectures/LectureDetails')));
// TESTCASE
const Testcase = Loadable(lazy(() => import('../pages/TestCase/testCase')));
const TestcaseCreate = Loadable(lazy(() => import('../pages/TestCase/TestcaseCreate')));
const TestcaseDetails = Loadable(lazy(() => import('../pages/TestCase/TestcaseDetails')));
// LESSONS
const Lesson = Loadable(lazy(() => import('../pages/Lessons/Lessons')));
const LessonCreate = Loadable(lazy(() => import('../pages/Lessons/LessonsCreate')));
const LessonDetails = Loadable(lazy(() => import('../pages/Lessons/LessonsDetails')));
// COMPANY
const Company = Loadable(lazy(() => import('../pages/Companies/List')));
const CompanyCreate = Loadable(lazy(() => import('../pages/Companies/CompanyCreate')));
const CompanyDetails = Loadable(lazy(() => import('../pages/Companies/CompanyDetails')));
// TALLY
const Tally = Loadable(lazy(() => import('../pages/dashboard/Tally')));
const TallyCreate = Loadable(lazy(() => import('../pages/dashboard/TallyCreate')));
// TEAM
const Team = Loadable(lazy(() => import('../pages/dashboard/Team')));
const TeamCreate = Loadable(lazy(() => import('../pages/dashboard/TeamCreate')));

// INVOICE
const InvoiceList = Loadable(lazy(() => import('../pages/dashboard/InvoiceList')));
const InvoiceDetails = Loadable(lazy(() => import('../pages/dashboard/InvoiceDetails')));
const InvoiceCreate = Loadable(lazy(() => import('../pages/dashboard/InvoiceCreate')));
const InvoiceEdit = Loadable(lazy(() => import('../pages/dashboard/InvoiceEdit')));

// BLOG
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));

// USER
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
// const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));

// APP
const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
const Kanban = Loadable(lazy(() => import('../pages/dashboard/Kanban')));

// TEST RENDER PAGE BY ROLE
const PermissionDenied = Loadable(lazy(() => import('../pages/dashboard/PermissionDenied')));

// MAIN
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));

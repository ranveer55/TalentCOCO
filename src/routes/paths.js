// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
   course: path(ROOTS_DASHBOARD, '/course'),
    lesson:(CourseId) => path(ROOTS_DASHBOARD, `/course/${CourseId}`),
    newLesson:  (CourseId) => path(ROOTS_DASHBOARD, `/course/${CourseId}/new`),
    editLesson: (CourseId,id) => path(ROOTS_DASHBOARD, `/course/${CourseId}/${id}/edit`),
    viewLesson: (CourseId,id) => path(ROOTS_DASHBOARD, `/course/${CourseId}/view/${id}`),
    lecture:(CourseId,lessonId) => path(ROOTS_DASHBOARD, `/course/${CourseId}/lesson/${lessonId}`),
    newLecture:  (CourseId,lessonId) => path(ROOTS_DASHBOARD, `/course/${CourseId}/lesson/${lessonId}/lecture/new`),
    editLecture: (CourseId,lessonId,id) => path(ROOTS_DASHBOARD, `/course/${CourseId}/lesson/${lessonId}/lecture/${id}/edit`),
    viewLecture: (CourseId,lessonId,id) => path(ROOTS_DASHBOARD, `/course/${CourseId}/lesson/${lessonId}/lecture/view/${id}`),
    new: path(ROOTS_DASHBOARD, '/course/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/course/view/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/course/${id}/edit`),
  users: {
    user: path(ROOTS_DASHBOARD, '/users/user'),
    new: path(ROOTS_DASHBOARD, '/users/user/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/users/user/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/users/user/${id}/edit`),
  },
  lectures: {
    
    
  },
  lessons: {
     new: path(ROOTS_DASHBOARD, '/lessons/lesson/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/lessons/lesson/view/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/lessons/lesson/${id}/edit`),
  },
  companys: {
    company: path(ROOTS_DASHBOARD, '/companys/company'),
    new: path(ROOTS_DASHBOARD, '/companys/company/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/companys/company/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/companys/company/${id}/edit`),
  },
  tallys: {
    tally: path(ROOTS_DASHBOARD, '/tallys/tally'),
    new: path(ROOTS_DASHBOARD, '/tallys/tally/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/tallys/tally/${name}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/tallys/tally/${id}/edit`),
  },
  teams: {
    team: path(ROOTS_DASHBOARD, '/teams/team'),
    new: path(ROOTS_DASHBOARD, '/teams/team/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/teams/team/${name}`),
    edit: (name) => path(ROOTS_DASHBOARD, `/teams/team/${name}/edit`),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';

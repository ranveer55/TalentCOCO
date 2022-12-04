import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import userReducer from  '../pages/Users/store/Reducer';
import courseReducer from '../pages/Courses/store/Reducer';
import reportReducer from '../pages/Report/store/Reducer';
import lectureReducer from '../pages/Lectures/store/Reducer';
import testcaseReducer from '../pages/TestCase/store/Reducer';
import coursefigmaReducer from '../pages/CourseFigma/store/Reducer';
import mcqReducer from '../pages/MCQ/store/Reducer';
import lessonReducer from '../pages/Lessons/store/Reducer';
import companyReducer from '../pages/Companies/store/Reducer';
import appReducer from '../pages/app/store/Reducer';
import tallyReducer from './slices/Tally';
import teamReducer from './slices/Team';
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};
const coursePersistConfig = {
  key: 'course',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};
const testcasePersistConfig = {
  key: 'testcase',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};
const lecturePersistConfig = {
  key: 'lecture',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};
const coursefigmaPersistConfig = {
  key: 'coursefigma',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};
const reportPersistConfig = {
  key: 'report',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};
const mcqPersistConfig = {
  key: 'mcq',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};
const lessonPersistConfig = {
  key: 'lesson',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};
const companyPersistConfig = {
  key: 'company',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};
const tallyPersistConfig = {
  key: 'tally',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};
const teamPersistConfig = {
  key: 'team',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};
const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};


const rootReducer = combineReducers({
  app: appReducer,
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  user: persistReducer(userPersistConfig, userReducer),
  product: persistReducer(productPersistConfig, productReducer),
  course: persistReducer(coursePersistConfig, courseReducer),
  lecture: persistReducer(lecturePersistConfig, lectureReducer),
  testcase: persistReducer(testcasePersistConfig, testcaseReducer),
  coursefigma: persistReducer(coursefigmaPersistConfig, coursefigmaReducer),
  report: persistReducer(reportPersistConfig, reportReducer),
  mcq: persistReducer(mcqPersistConfig, mcqReducer),
  lesson: persistReducer(lessonPersistConfig, lessonReducer),
  company: persistReducer(companyPersistConfig, companyReducer),
  tally: persistReducer(tallyPersistConfig, tallyReducer),
  team: persistReducer(tallyPersistConfig, teamReducer),
  
});

export { rootPersistConfig, rootReducer };

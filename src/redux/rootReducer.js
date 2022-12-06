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
import studentReducer from  '../pages/Students/store/Reducer';
import cohortReducer from  '../pages/Cohort/store/Reducer'
import courseReducer from '../pages/Courses/store/Reducer';
import reportReducer from '../pages/Report/store/Reducer';
import lectureReducer from '../pages/CourseDetail/storeLecture/Reducer';
import lessonReducer from '../pages/CourseDetail/store/Reducer';
import testcaseReducer from '../pages/TestCase/store/Reducer';
import mcqReducer from '../pages/CourseDetail/storeMcq/Reducer';
import companyReducer from '../pages/Companies/store/Reducer';
import appReducer from '../pages/app/store/Reducer';

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
const lessonPersistConfig = {
  key: 'lesson',
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
const companyPersistConfig = {
key: 'company',
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
const studentPersistConfig = {
  key: 'student',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};
const cohortPersistConfig = {
  key: 'cohort',
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
  student: persistReducer(studentPersistConfig, studentReducer),
  cohort: persistReducer(cohortPersistConfig, cohortReducer),
  product: persistReducer(productPersistConfig, productReducer),
  course: persistReducer(coursePersistConfig, courseReducer),
  lecture: persistReducer(lecturePersistConfig, lectureReducer),
  lesson: persistReducer(lessonPersistConfig, lessonReducer),
  testcase: persistReducer(testcasePersistConfig, testcaseReducer),
  report: persistReducer(reportPersistConfig, reportReducer),
  mcq: persistReducer(mcqPersistConfig, mcqReducer),
  company: persistReducer(companyPersistConfig, companyReducer),
  
});

export { rootPersistConfig, rootReducer };

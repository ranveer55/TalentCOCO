import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  courses: [],
  course: null,
  sortBy: null,
  filters: {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: '',
    rating: '',
  },
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null,
  },
};

const slice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET COURESE
    getCourseSuccess(state, action) {
      state.isLoading = false;
      state.courses = action.payload;
    },
    // ADD COURESE
    addCourseSuccess(state, action) {
      state.isLoading = false;
      state.courses = [...state.courses, action.payload];
    },

    //  SORT & FILTER courseS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },

    filterProducts(state, action) {
      state.filters.gender = action.payload.gender;
      state.filters.category = action.payload.category;
      state.filters.colors = action.payload.colors;
      state.filters.priceRange = action.payload.priceRange;
      state.filters.rating = action.payload.rating;
    },

    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload;

      const subtotal = sum(cart.map((cartCourse) => cartCourse.price * cartCourse.quantity));
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;
    },

    addCart(state, action) {
      const course = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, course];
      } else {
        state.checkout.cart = state.checkout.cart.map((_course) => {
          const isExisted = _course.id === course.id;
          if (isExisted) {
            return {
              ..._course,
              quantity: _course.quantity + 1,
            };
          }
          return _course;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, course], 'id');
    },

    deleteCart(state, action) {
      const updateCart = state.checkout.cart.filter((course) => course.id !== action.payload);

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.billing = null;
    },

    onBackStep(state) {
      state.checkout.activeStep -= 1;
    },

    onNextStep(state) {
      state.checkout.activeStep += 1;
    },

    onGotoStep(state, action) {
      const goToStep = action.payload;
      state.checkout.activeStep = goToStep;
    },

    increaseQuantity(state, action) {
      const courseId = action.payload;
      const updateCart = state.checkout.cart.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            quantity: course.quantity + 1,
          };
        }
        return course;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const courseId = action.payload;
      const updateCart = state.checkout.cart.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            quantity: course.quantity - 1,
          };
        }
        return course;
      });

      state.checkout.cart = updateCart;
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },

    applyShipping(state, action) {
      const shipping = action.payload;
      state.checkout.shipping = shipping;
      state.checkout.total = state.checkout.subtotal - state.checkout.discount + shipping;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addCart,
  resetCart,
  onGotoStep,
  onBackStep,
  onNextStep,
  deleteCart,
  createBilling,
  applyShipping,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
  sortByProducts,
  filterProducts,
} = slice.actions;

// ----------------------------------------------------------------------

export function getCourse() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/users');
      dispatch(slice.actions.getCourseSuccess(response.data.results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function createCourse(data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('http://13.127.215.34/api/courses', data);
      dispatch(slice.actions.addCourseSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------


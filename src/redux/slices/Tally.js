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
  tallys: [],
  tally: null,
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
  name: 'tally',
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

    // GET TALLYS
    getTallySuccess(state, action) {
      state.isLoading = false;
      state.tallys = action.payload.data;
    },
    // ADD TALLYS
    addTallySuccess(state, action) {
      state.isLoading = false;
      state.tallys = [...state.tallys, action.payload];
    },
    deleteTallySuccess(state, action) {
      state.isLoading = false;
      state.tallys = action.payload;
    },

    //  SORT & FILTER TALLYS
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

      const subtotal = sum(cart.map((carttally) => carttally.price * carttally.quantity));
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
      const tally = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, tally];
      } else {
        state.checkout.cart = state.checkout.cart.map((_tally) => {
          const isExisted = _tally.id === tally.id;
          if (isExisted) {
            return {
              ..._tally,
              quantity: _tally.quantity + 1,
            };
          }
          return _tally;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, tally], 'id');
    },

    deleteCart(state, action) {
      const updateCart = state.checkout.cart.filter((tally) => tally.id !== action.payload);

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
      const tallyId = action.payload;
      const updateCart = state.checkout.cart.map((tally) => {
        if (tally.id === tallyId) {
          return {
            ...tally,
            quantity: tally.quantity + 1,
          };
        }
        return tally;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const tallyId = action.payload;
      const updateCart = state.checkout.cart.map((tally) => {
        if (tally.id === tallyId) {
          return {
            ...tally,
            quantity: tally.quantity - 1,
          };
        }
        return tally;
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

export function getTally() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/tallys');
      dispatch(slice.actions.getTallySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function createTally(data, id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = id ?  await axios.put(`http://127.0.0.1:8000/api/tallys/${id}`, data):await axios.post('http://127.0.0.1:8000/api/tallys', data);
      dispatch(slice.actions.addTallySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteTally(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/tallys/delete/${id}`,);
      dispatch(slice.actions.deleteTallySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------


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
  teams: [],
  team: null,
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
  name: 'team',
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

    // GET TEAMS
    getTeamSuccess(state, action) {
      state.isLoading = false;
      state.teams = action.payload.data;
    },
    // ADD TEAMS
    addTeamSuccess(state, action) {
      state.isLoading = false;
      state.teams = [...state.teams, action.payload];
    },

    //  SORT & FILTER teamS
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

      const subtotal = sum(cart.map((cartteam) => cartteam.price * cartteam.quantity));
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
      const team = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, team];
      } else {
        state.checkout.cart = state.checkout.cart.map((_team) => {
          const isExisted = _team.id === team.id;
          if (isExisted) {
            return {
              ..._team,
              quantity: _team.quantity + 1,
            };
          }
          return _team;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, team], 'id');
    },

    deleteCart(state, action) {
      const updateCart = state.checkout.cart.filter((team) => team.id !== action.payload);

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
      const teamId = action.payload;
      const updateCart = state.checkout.cart.map((team) => {
        if (team.id === teamId) {
          return {
            ...team,
            quantity: team.quantity + 1,
          };
        }
        return team;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const teamId = action.payload;
      const updateCart = state.checkout.cart.map((team) => {
        if (team.id === teamId) {
          return {
            ...team,
            quantity: team.quantity - 1,
          };
        }
        return team;
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

export function getTeam() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('http://localhost:8000/api/admin/team/1');
      dispatch(slice.actions.getTeamSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function createTeam(data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('http://localhost:8000/api/admin/team', data);
      console.log("teamdata",data)
      dispatch(slice.actions.addTeamSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------


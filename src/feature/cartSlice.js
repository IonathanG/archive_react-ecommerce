import { createSlice } from "@reduxjs/toolkit";

// check for local storage cart items
const storedData = window.localStorage.state
  ? JSON.parse(localStorage.getItem("state"))
  : undefined;

const initialState = {
  listItems: storedData === undefined ? [] : storedData.cart.listItems,
  totalQuantity: storedData === undefined ? 0 : storedData.cart.totalQuantity,
  wishList: storedData === undefined ? [] : storedData.cart.wishList,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //add item to the cart or add quantity of an item already in the cart
    addItem: (state, { payload }) => {
      let itemFound = false;
      state.totalQuantity += payload.quantity;

      if (state.listItems.length > 0) {
        for (let i = 0; i < state.listItems.length; i++) {
          if (
            state.listItems[i].id === payload.id &&
            state.listItems[i].size === payload.size &&
            state.listItems[i].color === payload.color
          ) {
            state.listItems[i].quantity += payload.quantity;
            itemFound = true;
          }
        }
      }

      if (!itemFound) {
        state.listItems.push({
          name: payload.name,
          id: payload.id,
          quantity: payload.quantity,
          price: payload.price,
          color: payload.color,
          size: payload.size,
          img: payload.img,
          //ref: payload.ref,
        });
      }
    },

    //remove an item from the cart
    removeItem: (state, { payload }) => {
      let newArray = [];

      for (let i = 0; i < state.listItems.length; i++) {
        i !== payload
          ? newArray.push(state.listItems[i])
          : (state.totalQuantity -= state.listItems[i].quantity);
      }
      state.listItems = [...newArray];
    },

    //adding quantity to an item from the cart
    addQuantity: (state, { payload }) => {
      for (let i = 0; i < state.listItems.length; i++) {
        if (
          state.listItems[i].id === payload.id &&
          state.listItems[i].color === payload.color &&
          state.listItems[i].size === payload.size
        ) {
          state.listItems[i].quantity += 1;
          state.totalQuantity += 1;
        }
      }
    },

    //removing quantity to an item from the cart
    removeQuantity: (state, { payload }) => {
      for (let i = 0; i < state.listItems.length; i++) {
        if (
          state.listItems[i].id === payload.id &&
          state.listItems[i].color === payload.color &&
          state.listItems[i].size === payload.size
        ) {
          if (state.listItems[i].quantity > 1) state.listItems[i].quantity -= 1;
          state.totalQuantity -= 1;
        }
      }
    },

    //delete listItems
    deleteCart: (state) => {
      state.listItems = [];
      state.totalQuantity = 0;
    },

    //add to wishList
    handleWishList: (state, { payload }) => {
      let itemFound = false;
      let newArray = [];

      if (state.wishList.length > 0) {
        for (let i = 0; i < state.wishList.length; i++) {
          state.wishList[i].id !== payload.id
            ? newArray.push(state.wishList[i])
            : (itemFound = true);
        }
      }

      itemFound
        ? (state.wishList = [...newArray])
        : state.wishList.push(payload);
    },
  },
});

export const {
  addItem,
  removeItem,
  addQuantity,
  removeQuantity,
  deleteCart,
  handleWishList,
} = cartSlice.actions;
export default cartSlice.reducer;

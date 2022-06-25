import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase.config";

// initialise data from firestore
export const getUserData = createAsyncThunk(
  "data/getUserData",
  async (userID) => {
    const docRef = doc(db, "users", `${userID}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      const storedData = window.localStorage.state
        ? JSON.parse(localStorage.getItem("state"))
        : undefined;

      return { dataDB: docSnap.data(), storedData };
    } else {
      console.log("No such document");
    }
  }
);

// initialise data from local storage
export const getGuestData = createAsyncThunk("data/getGuestData", () => {
  console.log("guest data");
  const storedData = window.localStorage.state
    ? JSON.parse(localStorage.getItem("state"))
    : undefined;

  return storedData;
});

const initialState = {
  listItems: [],
  totalQuantity: 0,
  wishList: [],
  initUser: false,
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

    //reset the store on session logout
    resetStore: (state) => {
      state.listItems = [];
      state.totalQuantity = 0;
      state.wishList = [];
    },
  },

  // initialise async data from firestore
  extraReducers: {
    [getUserData.pending]: (state) => {
      console.log("pending");
      state.initUser = false;
    },
    [getUserData.fulfilled]: (state, { payload }) => {
      console.log("fulfilled");
      if (payload.storedData === undefined) {
        console.log("empty localStorage");
        state.listItems = payload.dataDB.listItems;
        state.totalQuantity = payload.dataDB.totalQuantity;
        state.wishList = payload.dataDB.wishList;
      } else {
        console.log("found localStorage");
        state.listItems = [
          ...payload.dataDB.listItems,
          ...payload.storedData.listItems,
        ];
        state.totalQuantity =
          payload.dataDB.totalQuantity + payload.storedData.totalQuantity;
        state.wishList = [
          ...payload.dataDB.wishList,
          ...payload.storedData.wishList,
        ];
      }
      state.initUser = true;
    },
    [getUserData.rejected]: (state) => {
      console.log("rejected");
      state.initUser = false;
    },
    [getGuestData.pending]: (state) => {
      state.initUser = false;
    },
    [getGuestData.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.listItems = payload.listItems;
        state.totalQuantity = payload.totalQuantity;
        state.wishList = payload.wishList;
      }
      state.initUser = true;
    },
    [getGuestData.rejected]: (state) => {
      state.initUser = false;
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
  resetStore,
} = cartSlice.actions;
export default cartSlice.reducer;

// check for local storage cart items
// const storedData = window.localStorage.state
//   ? JSON.parse(localStorage.getItem("state"))
//   : undefined;

// const initialState = {
//   listItems: storedData === undefined ? [] : storedData.cart.listItems,
//   totalQuantity: storedData === undefined ? 0 : storedData.cart.totalQuantity,
//   wishList: storedData === undefined ? [] : storedData.cart.wishList,
//   isLoading: false,
// };

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

      localStorage.removeItem("state");
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
        console.log("local storage undefined");
        state.listItems = payload.dataDB.listItems;
        state.totalQuantity = payload.dataDB.totalQuantity;
        state.wishList = payload.dataDB.wishList;
      } else {
        console.log("local storage exist");

        // listItems
        if (payload.dataDB.listItems.length > 0) {
          console.log("break listItems");
          let newListItems = [
            ...payload.dataDB.listItems,
            ...payload.storedData.listItems,
          ];

          // let newListItems = payload.dataDB.listItems;
          // for (let i = 0; i < payload.dataDB.listItems.length; i++) {
          //   for (let j = 0; j < payload.storedData.listItems.length; j++) {
          //     if (
          //       payload.dataDB.listItems[i].id ===
          //         payload.storedData.listItems[j].id &&
          //       payload.dataDB.listItems[i].color ===
          //         payload.storedData.listItems[j].color &&
          //       payload.dataDB.listItems[i].size ===
          //         payload.storedData.listItems[j].size
          //     ) {
          //       newListItems[i].quantity +=
          //         payload.storedData.listItems[j].quantity;
          //     } else {
          //       newListItems.push(payload.storedData.listItems[j]);
          //     }
          //   }
          // }
          state.listItems = newListItems;
        } else {
          state.listItems = payload.storedData.listItems;
        }
        // totalQuantity
        state.totalQuantity =
          payload.dataDB.totalQuantity + payload.storedData.totalQuantity;

        // wishList
        if (payload.dataDB.wishList.length > 0) {
          console.log("break wishlist");
          // only keeping items with different id => avoid duplicate in wishList
          let id_wishList = new Set(
            payload.dataDB.wishList.map((item) => item.id)
          );
          state.wishList = [
            ...payload.dataDB.wishList,
            ...payload.storedData.wishList.filter(
              (item) => !id_wishList.has(item.id)
            ),
          ];
        } else {
          state.wishList = payload.storedData.wishList;
        }
      }
      state.initUser = true;
    },
    [getUserData.rejected]: (state) => {
      console.log("rejected");
      state.initUser = false;
    },

    //initialise data from local storage
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

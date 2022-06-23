import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../feature/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// store.subscribe(() => {
//   const state = store.getState();
//   const serializedState = JSON.stringify(state);
//   localStorage.setItem("state", serializedState);
// });

export default store;

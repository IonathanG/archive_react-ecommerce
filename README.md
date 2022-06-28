## React Shopping App with Redux Toolkit and Firebase

This react project is part of a series of individual apps built to showcase some of my personal Front End Development Skills.

The website is designed as a scalable full stack application E-Commerce Page (clothing items).

It uses a fully responsive UI Design, allowing each user to create an account and to save items onto their shopping cart via their personal profile.

Other projects can be found within the following Portolio website as well as on this GitHub Repositories.

## Project Overview

An E-Commerce Shopping website created with reactJS, showcasing clothing items.

The app contains the following features:

- A clear and clean responsive UI design for a smooth navigation
- A Register/Login option for the user to create a personalised account (Firebase and Context API)
- A shopping cart for checkout as well as a wishlist for further purchases (Redux Toolkit)
- The possibility for each user to retrieve their shopping cart on any device (Firestore via user.uid)
- Loads the pre existing cart onto Redux Toolkit via asynchronous-Thunk
- The use of local storage for non signed in user to save their shopping cart on the current device
- Each item added while being signed out to be automatically added to the existing or newly created account once logged in
- A history of purchased items following the checkout
- Option to add the email address to a Newsletter

## Screenshots

<img src="/public/screenshots/shopping-cart-data.png" width="100" height="100">

## Tech/framework used

<b>Built with</b>

- [reactJS](https://reactjs.org/)
- [Sass](https://sass-lang.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Context API](https://reactjs.org/docs/context.html)
- [Firebase & Firestore](https://firebase.google.com/)
- [Material UI](https://mui.com/)

## Features

What makes your project stand out?

## Code Feature

Load Firestore into Redux Toolkit with AsyncThunk and extraReducers (user not logged in):

```javascript
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
```

```javascript
extraReducers: {
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
  }
```

## Installation

Use the package manager npm to install the app once project is downloaded.

For dependencies

```bash
npm install
```

## Launch the App

```javascript
npm start

```

## How to use?

For an easy start, click on the following link to access the live website:
https://react-ecommerce-ionyshop.netlify.app/

- Start by browing the website items, add a few products to the shopping cart and some others to the wishList.
- Each product of different color and size will be shown as a different item in your cart.
- The cart will persist if the page is reloaded or closed.
- Now register a new account or log in on an account.
- The items added while being signed out will be added to any pre existing cart.
- Proceed to checkout. Retrieve your purchase history.
- Subscribe to the Newsletter by adding your email to the form

## Contribute

Any contributions is welcome! Please suggest any new feature, suggestion or improvement and they will be implemented.
Thank you for the support.

## Credits

I would like to thank:

- Lama Dev for the UI inspiration
- The Net Ninja for the practical use of Firestore V9

## Created by

() => © [Ionathan](https://github.com/IonathanG)

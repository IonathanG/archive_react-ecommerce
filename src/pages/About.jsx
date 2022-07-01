import React from "react";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";

const About = () => {
  return (
    <div>
      <div className="about-container">
        <section className="about">
          <h2>About this Website</h2>
          <p>
            This react project is part of a series of individual apps built to
            showcase some of my personal Front End Development Skills. The
            website is designed as a scalable full stack application E-Commerce
            Page (clothing items). It uses a fully responsive UI Design,
            allowing each user to create an account and to save items onto their
            shopping cart in Firestore via their personal profile. Other
            projects can be found within the following Portolio website as well
            as on this GitHub Repositories.
          </p>
          <div className="img-container">
            <img
              src="/screenshots/screenshot1.png"
              alt="screenshot-of-website"
            />
            <img
              src="/screenshots/screenshot3.png"
              alt="screenshot-of-website"
            />
            <img
              src="/screenshots/screenshot2.png"
              alt="screenshot-of-website"
            />
          </div>
        </section>
        <section className="features">
          <h2>Project Features</h2>
          The app contains the following features:
          <ul>
            <li>
              A clear and clean responsive UI design for a smooth navigation
            </li>
            <li>
              A Register/Login option for the user to create a personalised
              account <span> - (Firebase and Context API)</span>
            </li>
            <li>
              A shopping cart for checkout as well as a wishlist for further
              purchases
              <span> - (Redux Toolkit)</span>
            </li>
            <li>
              The possibility for each user to retrieve their shopping cart on
              any device
              <span> - (Firestore via user.uid)</span>
            </li>
            <li>
              Loads the pre existing cart onto Redux Toolkit via
              <span> asynchronous-Thunk</span>
            </li>
            <li>
              Create, Read, Update, Delete items in the cart{" "}
              <span> - (CRUD)</span>
            </li>
            <li>
              The use of local storage for non signed in user to save their
              shopping cart on the current device
            </li>
            <li>
              Each item added while being signed out to be automatically added
              to the existing or newly created account once logged in
            </li>
            <li>A history of purchased items following the checkout</li>
            <li>Option to add the email address to a Newsletter</li>
          </ul>
        </section>
        <section className="data-flow">
          <h2>Data Flow</h2>
          <img
            src="/screenshots/shopping-cart-data.png"
            alt="image_of_data-flow"
          />
        </section>
        <section className="tech">
          <h2>Tech/framework used</h2>
          Built with:
          <ul>
            <li>reactJS</li>
            <li>Sass</li>
            <li>Redux Toolkit</li>
            <li>Context API</li>
            <li>Firebase and Firestore</li>
            <li>Material UI</li>
          </ul>
        </section>
        <section className="how-to-use">
          <h2>How to use?</h2>
          For an easy start, click on the following link to access the live
          website:{" "}
          <a
            href="https://react-ecommerce-ionyshop.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ionyShop
          </a>
          <li>
            Start by browing the website items, add a few products to the
            shopping cart and some others to the wishList.
          </li>
          <li>
            Each product of different color and size will be shown as a
            different item in your cart.
          </li>
          <li>The cart will persist if the page is reloaded or closed.</li>
          <li>Now register a new account or log in on an account.</li>
          <li>
            The items added while being signed out will be added to any pre
            existing cart.
          </li>
          <li>Proceed to checkout. Retrieve your purchase history.</li>
          <li>Subscribe to the Newsletter by adding your email to the form</li>
          <h2>Contribute</h2>
          <p>
            Any contributions is welcome! Please suggest any new feature,
            suggestion or improvement and they will be implemented. Thank you
            for the support.
          </p>
        </section>
        <section className="credits">
          <h2>Credits</h2>
          <p>I would like to thank:</p>
          <ul>
            <li>Lama Dev for the UI inspiration</li>
            <li>The Net Ninja for the practical use of Firestore V9</li>
          </ul>
        </section>
        <section className="created-by">
          Created by <span>Ionathan</span>
        </section>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default About;

// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from './CartContext';
import { GlobalProvider } from './GlobalContext';
import Homepage from './pages/Homepage';
import CartPage from './pages/CartPage';
import HomepageGolden from "./pages/GoldenHomepage";
import GoldenCartPage from "./pages/GoldenCartPage";
import InitialPromptPage from './pages/InitialPromptPage';
import SecondPromptPage from './pages/SecondPromptPage';
import AfterSurveyPage from './pages/AfterSurveyPage';
import ThankYouPage from './pages/ThankYouPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <InitialPromptPage />
  },
  {
    path: "/second-prompt",
    element: <SecondPromptPage />
  },
  {
    path: "/after-survey",
    element: <AfterSurveyPage />
  },
  {
    path: "/thank-you",
    element: <ThankYouPage />
  },
  {
    path: "/homepage",
    element: <Homepage />
  },
  {
    path: "/golden",
    element: <HomepageGolden />
  },
  {
    path: "/cart",
    element: <CartPage /> 
  },
  {
    path: "/golden-cart",
    element: <GoldenCartPage />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </GlobalProvider>
  </React.StrictMode>
);

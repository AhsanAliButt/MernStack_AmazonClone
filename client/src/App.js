// eslint-disable-next-line no-unused-vars
import MainPage from "./pages/homePage/MainPage";
import Routing from "./Routing/Routing";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectlastRoute,
} from "./redux/slicers/authSlice";
import { useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import { customTheme } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStates from "./components/hooks/useStates";
import { setItemsFromList } from "./redux/slicers/cartSlice";

// console.log("Last Route: " + selectlastRoute);

function App() {
  const { userCartItems } = useStates();
  console.log("USER CART ITEMS", userCartItems);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(setItemsFromList(userCartItems));
  // }, [userCartItems]);

  return <Routing />;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <ThemeProvider theme={customTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <ToastContainer />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

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

// console.log("Last Route: " + selectlastRoute);

function App() {
  return <Routing />;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

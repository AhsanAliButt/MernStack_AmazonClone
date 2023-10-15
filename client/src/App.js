// eslint-disable-next-line no-unused-vars
import MainPage from "./pages/homePage/MainPage";
import Routing from "./Routing/Routing";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store/store";
import { Provider } from "react-redux";

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

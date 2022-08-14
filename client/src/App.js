import MainPage from "./pages/homePage/MainPage";
import Routing from "./Routing/Routing";
import { store } from "./redux/store/store";
import { Provider } from "react-redux";

function App() {
  return <Routing />;
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

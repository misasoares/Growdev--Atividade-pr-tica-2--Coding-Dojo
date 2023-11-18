import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import Auth from "./components/Auth";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Auth />
      </PersistGate>
    </Provider>
  );
}

export default App;

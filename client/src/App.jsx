import { RouterProvider } from "react-router-dom";
import { router } from "../src/router";
import { Provider } from "react-redux";
import store from "./store";

// import './App.css'

function App() {
  return (
    <>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    </>
  );
}

export default App;

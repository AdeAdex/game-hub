// app/redux/Provider.js

'use client'

import { Provider as ReduxProvider } from "react-redux";
import store from "./store";

const ReduxProviders = ({ children }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default ReduxProviders;

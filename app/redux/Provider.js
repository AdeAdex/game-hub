// app/redux/Provider.ts

'use client'


import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./store";

const ReduxProviders = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </ReduxProvider>
  );
};

export default ReduxProviders;


// import { Provider as ReduxProvider } from "react-redux";
// import store from "./store";

// const ReduxProviders = ({ children }) => {
//   return <ReduxProvider store={store}>{children}</ReduxProvider>;
// };

// export default ReduxProviders;




// 'use client';

// import React, { ReactNode } from 'react';
// import { Provider as ReduxProvider } from 'react-redux';
// import store from './store';

// interface ReduxProvidersProps {
//   children: ReactNode;
// }

// const ReduxProviders: React.FC<ReduxProvidersProps> = ({ children }) => {
//   return <ReduxProvider store={store}>{children}</ReduxProvider>;
// };

// export default ReduxProviders;

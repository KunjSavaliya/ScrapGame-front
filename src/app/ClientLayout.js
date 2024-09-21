// src/app/ClientLayout.js
'use client';

import { Provider } from 'react-redux';
import store from './Redux/store';
import { SearchProvider } from './Components/SerchContext.jsx';
import Header from './Components/Header';
import Footer from './Components/Footer';

const ClientLayout = ({ children }) => {
  return (
    <Provider store={store}>
      <SearchProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </SearchProvider>
    </Provider>
  );
};

export default ClientLayout;

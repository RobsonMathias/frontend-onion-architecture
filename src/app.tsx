import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'stores';
import { Router } from './pages/router';
import { ServicesProvider } from 'services';

function App() {
  return (
    <Provider store={store}>
      <ServicesProvider>
        <Router />
      </ServicesProvider>
    </Provider>
  );
}

export default App;

import React from 'react';
import Main from './scr/components/Main/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './scr/redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Loading } from './scr/components/Loading/LoadingComponent';

const {persistor, store} = ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<Loading />}
          persistor={persistor}
        >
          <Main />
        </PersistGate>
      </Provider>
    )
  };
};

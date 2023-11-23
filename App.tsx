/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Navigation from './src/Navigators';
import { store } from "./src/Redux/Store/Store";
import { Provider } from "react-redux";
function App(): JSX.Element {
  
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
    
  );
}

export default App;
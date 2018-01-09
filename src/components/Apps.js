
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';

import { SideMenu } from './Routers';

StatusBar.setHidden(true);

export default class Apps extends Component {
  
    render() {
        return (
            <Provider store={store}>
            <SideMenu />
            </Provider>
        );
    }
}

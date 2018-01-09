import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getFromMemo, onSignIn } from '../../redux/action';
import Collection from './Collection';
import Category from './Category';
import TopProduct from './TopProduct';
import Header from './Header';

import initData from '../../../api/initData';
import getCart from '../../../api/getCart';
import checkLogin from '../../../api/checkLogin';
import getToken from '../../../api/getToken';
import refreshToken from '../../../api/refreshToken';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            types: [],
            topProducts: []
        };
    }

    componentDidMount() {
        initData()
        .then(resJSON => {
            const { type, product } = resJSON;
            this.setState({ types: type, topProducts: product });
        });
        getCart().then(cartArray => this.props.getFromMemo(cartArray));
        getToken()
        .then(token => checkLogin(token))
        .then(res => this.props.onSignIn(res.user))
        .catch(err => console.log('LOI CHECK LOGIN', err));
        refreshToken();
    }
    
    render() {
        const { types, topProducts } = this.state;
        return (
             <ScrollView style={{ flex: 1, backgroundColor: '#DBDBDB' }}>
                 <Header navigation={this.props.navigation} />
                 <Collection navigation={this.props.navigation} />
                 <Category navigation={this.props.navigation} types={types} /> 
                 <TopProduct navigation={this.props.navigation} topProducts={topProducts} />
             </ScrollView>
             
        );
    }
}

export default connect(null, { getFromMemo, onSignIn })(Home);

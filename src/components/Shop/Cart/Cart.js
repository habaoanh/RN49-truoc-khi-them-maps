import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, FlatList,
    Dimensions, StyleSheet, Image, Alert
} from 'react-native';
import { connect } from 'react-redux';
import Header from '../Home/Header';
import { Add, Sub, Remove } from '../../redux/action';
import sendOrder from '../../../api/sendOrder';
import getToken from '../../../api/getToken';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

const url = 'https://mylifevungtau.000webhostapp.com/api/images/product/';

class Cart extends Component {
    
    async onSendOrder() {
        try {
            const token = await getToken();
            const arrayDetail = this.props.cartArray.map(e => ({
                id: e.product.id,
                quantity: e.quantity
            }));
            const kq = await sendOrder(token, arrayDetail);
            if (kq === 'THEM_THANH_CONG') {
                console.log('THEM THANH CONG');
                Alert.alert(
                    'Notice',
                    'Email has been used by other',
                    [
                        { text: 'OK', onPress: this.gotoConfirmCart.bind(this) }
                    ],
                    { cancelable: false }
                );
            } else {
                console.log('THEM THAT BAI', kq);
                Alert.alert(
                    'Notice',
                    'You have to sign in to...', //can phai them tieng anh vao
                    [
                        { text: 'OK', onPress: this.openMenu.bind(this) }
                    ],
                    { cancelable: false }
                );
            }
        } catch (e) {
            console.log(e);
        }
    }
    openMenu() {
        const { navigation } = this.props;
        navigation.navigate('DrawerOpen');
    }
    gotoDetail(product) {
        const { navigate } = this.props.navigation;
        navigate('Manhinh_ProductDetail', { product });
    }
    gotoConfirmCart() {
        const { navigate } = this.props.navigation;
         navigate('Manhinh_ConfirmCart');
     }
    render() {
        const { main, checkoutButton, checkoutTitle, wrapper,
            productStyle, mainRight, productController,
            txtName, txtPrice, productImage, numberOfProduct,
            txtShowDetail, showDetailContainer } = styles;
        const { cartArray } = this.props;
        const arrTotal = cartArray.map(e => e.product.price * e.quantity);
        const total = arrTotal.length ? arrTotal.reduce((a, b) => a + b) : 0;

        return (
            <View style={{ flex: 1, backgroundColor: '#DBDBDB' }}>
                <Header navigation={this.props.navigation} />
                <View style={wrapper}>
                    <FlatList
                        contentContainerStyle={main}
                        data={cartArray}
                        keyExtractor={item => item.product.id}

                        renderItem={({ item }) => (
                            <View style={productStyle}>
                                <Image
                                    source={{ uri: `${url}${item.product.images[0]}` }}
                                    style={productImage}
                                />
                                <View style={[mainRight]}>
                                    <View
                                        style={{ justifyContent: 'space-between', flexDirection: 'row' }}
                                    >
                                        <Text style={txtName}>{toTitleCase(item.product.name)}</Text>
                                        <TouchableOpacity
                                            onPress={() => this.props.Remove(item.product.id)}
                                        >
                                            <Text
                                                style={{ fontFamily: 'Avenir', color: '#969696' }}
                                            >X</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={txtPrice}>{item.product.price}$</Text>
                                    </View>
                                    <View style={productController}>
                                        <View style={numberOfProduct}>
                                            <TouchableOpacity
                                                onPress={() => this.props.Add(item.product.id)}
                                            >
                                                <Text>+</Text>
                                            </TouchableOpacity>
                                            <Text>{item.quantity}</Text>
                                            <TouchableOpacity
                                                onPress={() => this.props.Sub(item.product.id)}
                                            >
                                                <Text>-</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={showDetailContainer} onPress={() => this.gotoDetail(item.product)}>
                                            <Text style={txtShowDetail}>SHOW DETAILS</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                    <TouchableOpacity style={checkoutButton} onPress={this.onSendOrder.bind(this)}>
                        <Text style={checkoutTitle}>TOTAL {total}$ CHECKOUT NOW</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#DFDFDF'
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        //marginTop: 0,
        backgroundColor: '#2ABB9C',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        width, backgroundColor: '#DFDFDF'
    },
    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
    productStyle: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: imageWidth,
        height: imageHeight,
        flex: 1,
        resizeMode: 'center'
    },
    mainRight: {
        flex: 3,
        justifyContent: 'space-between'
    },
    productController: {
        flexDirection: 'row'
    },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtName: {
        paddingLeft: 20,
        color: '#A7A7A7',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
        color: '#C21C70',
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        color: '#C21C70',
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Avenir',
        textAlign: 'right',
    },
    showDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

function mapStateToProps(state) {
    return {
        cartArray: state.cartArray
    };
}

export default connect(mapStateToProps, { Add, Sub, Remove })(Cart);

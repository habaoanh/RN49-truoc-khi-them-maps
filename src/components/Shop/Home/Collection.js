import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import bannerImage from '../../../media/temp/banner.jpg';

const { width } = Dimensions.get('window');
export default class Collection extends Component {
    gotoListProduct() {
        const { navigation } = this.props;
        const category = { id: 'COLLECTION', name: 'SPRING COLLECTION' };
         navigation.navigate('Manhinh_ListProduct', { category });//day la cach truyen cai chuoi Json khong phai la mang qua man hinh khac
     }

    render() {
        const { wrapper, textStyle, imageStyle } = styles;
        return (
            <View style={wrapper}>
                <View style={{ height: 50, justifyContent: 'center' }} >
                    <Text style={textStyle} >SPRING COLLECTION</Text>
                </View>
                <TouchableOpacity style={{ flex: 4, justifyContent: 'flex-end' }} onPress={this.gotoListProduct.bind(this)}>
                <Image source={bannerImage} style={imageStyle} />    
                </TouchableOpacity>
            </View>

        );
    }
}

    //933 x 465
const imageWidth = width - 40;
const imageHeight = (imageWidth / 933) * 465;

const styles = StyleSheet.create({
    wrapper: {
        width: width - 20,
        backgroundColor: '#FFF',
        margin: 10,
        shadowColor: '#2E272B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        padding: 10,
        paddingTop: 0
    },
    textStyle: {
        fontSize: 20,
        color: '#AFAEAF'
    },
    imageStyle: {
        height: imageHeight, 
        width: imageWidth
    }
});

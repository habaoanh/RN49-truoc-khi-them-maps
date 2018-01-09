import React, { Component } from 'react';
import {
    Text, View,
    Dimensions, Image, TouchableOpacity,
    TextInput, StyleSheet
} from 'react-native';
import search from '../../../api/searchProduct';

import icLogo from '../../../media/appIcon/ic_logo.png';
import icMenu from '../../../media/appIcon/ic_menu.png';

const { height } = Dimensions.get('window');

//chua bam hinh de chuyen sang drawer duoc, giai phap: truyen navigate qua props : OK
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtSearch: ''
        };
    }
    
    onSearch() {
        const { txtSearch } = this.state;
        this.setState({ txtSearch: '' });
        search(txtSearch)
        .then(arrProduct => this.props.setSearchArray(arrProduct))
        .catch(err => console.log(err));
    }
    openMenu() {
        const { navigation } = this.props;
        navigation.navigate('DrawerOpen');
    }
    gotoSearch() {
        const { navigate } = this.props.navigation;
        navigate('Searchtab');//note dung cach nay de chuyen sang tab khac nhung van chua truyen duoc tham so ve google 
    }
    render() {
        const { wrapper, row1, textInput, iconStyle, titleStyle } = styles;
        return (
            <View style={wrapper}>
                <View style={row1}>
                    <TouchableOpacity onPress={this.openMenu.bind(this)}>
                        <Image source={icMenu} style={iconStyle} />
                    </TouchableOpacity>
                    <Text style={titleStyle}>Wearing a Dress</Text>
                    <Image source={icLogo} style={iconStyle} />
                </View>
                <TextInput
                    style={textInput}
                    placeholder="What do you want to buy?"
                    underlineColorAndroid="transparent"
                    value={this.state.txtSearch}
                    onChangeText={text => this.setState({ txtSearch: text })}
                    onFocus={() => this.gotoSearch()} 
                    onSubmitEditing={this.onSearch.bind(this)}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: { 
        height: height / 8, 
        backgroundColor: '#34B089', 
        padding: 10, 
        justifyContent: 'space-around' 
    },
    row1: { flexDirection: 'row', justifyContent: 'space-between' },
    textInput: { 
        height: height / 23, 
        backgroundColor: '#FFF', 
        paddingLeft: 10,
        paddingVertical: 0 
    },
    titleStyle: { color: '#FFF', fontFamily: 'Avenir', fontSize: 20 },
    iconStyle: { width: 25, height: 25 }
});

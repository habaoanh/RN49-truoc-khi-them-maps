import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, Alert, StyleSheet, TextInput
} from 'react-native';
import { connect } from 'react-redux';
import getToken from '../../../api/getToken';
import changeInfoApi from '../../../api/changeinfo';
import { onSignIn } from '../../redux/action';

import backWhite from '../../../media/appIcon/back_white.png';

class ChangeInfo extends Component {
    constructor(props) {
        super(props);
        const { name, address, phone } = this.props.user;
        this.state = {
            txtName: name,
            txtAddress: address,
            txtPhone: phone
        };
    }
    goBackToMain() {
        const { navigation } = this.props;
        navigation.goBack();
    }
    alertSuccess() {
        Alert.alert(
            'Notice',
            'Update info successfully',
            [
                { text: 'OK', onPress: this.goBackToMain.bind(this) }
            ],
            { cancelable: false }
        );
    }
    change() {
        const { txtName, txtPhone, txtAddress } = this.state;
        getToken()
            .then(token => changeInfoApi(token, txtName, txtPhone, txtAddress))
            .then(user => {
                this.alertSuccess();
                this.props.onSignIn(user);
            })
            .catch(err => console.log(err));
    }

    render() {
        const {
            wrapper, header, headerTitle, backIconStyle, body,
            signInContainer, signInTextStyle, textInput
        } = styles;
        const { txtName, txtAddress, txtPhone } = this.state;
        return (
            <View style={wrapper}>
                <View style={header}>
                    <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
                        <Image source={backWhite} style={backIconStyle} />
                    </TouchableOpacity>
                    <Text style={headerTitle}>User Infomation</Text>
                    <View style={{ width: 30 }} />
                </View>
                <View style={body}>
                    <TextInput
                        style={textInput}
                        placeholder="Enter your name"
                        autoCapitalize="none"
                        value={txtName}
                        onChangeText={text => this.setState({ ...this.state, txtName: text })}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Enter your address"
                        autoCapitalize="none"
                        value={txtAddress}
                        onChangeText={text => this.setState({ ...this.state, txtAddress: text })}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Enter your phone number"
                        autoCapitalize="none"
                        value={txtPhone}
                        onChangeText={text => this.setState({ ...this.state, txtPhone: text })}
                        underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity style={signInContainer} onPress={this.change.bind(this)} >
                        <Text style={signInTextStyle}>CHANGE YOUR INFOMATION</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}
export default connect(mapStateToProps, { onSignIn })(ChangeInfo);

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#fff' },
    header: { flex: 1, backgroundColor: '#2ABB9C', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
    headerTitle: { fontFamily: 'Avenir', color: '#fff', fontSize: 20 },
    backIconStyle: { width: 30, height: 30 },
    body: { flex: 10, backgroundColor: '#F6F6F6', justifyContent: 'center' },
    textInput: {
        height: 45,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Avenir',
        paddingLeft: 20,
        borderRadius: 20,
        marginBottom: 20,
        borderColor: '#2ABB9C',
        borderWidth: 1
    },
    signInTextStyle: {
        color: '#FFF', fontFamily: 'Avenir', fontWeight: '600', paddingHorizontal: 20
    },
    signInContainer: {
        marginHorizontal: 20,
        backgroundColor: '#2ABB9C',
        borderRadius: 20,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    signInStyle: {
        flex: 3,
        marginTop: 50
    }
});

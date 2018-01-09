import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

import profileIcon from '../../../media/temp/profile.png';
import saveToken from '../../../api/saveToken';
import { onSignIn } from '../../redux/action';

class Menu extends Component {
    onSignOut() {
        this.props.onSignIn(null);
        saveToken('');
    }
    gotoAuthentication() {
        const { navigate } = this.props.navigation;
        navigate('Authentication');
    }
    gotoChangeInfo() {
        const { navigate } = this.props.navigation;
        navigate('Changeinfo');
    }
    gotoOrderHistory() {
        const { navigate } = this.props.navigation;
        navigate('OrderHistory');
    }
    render() {
        const {
            container, profile, btnStyle, btnText,
            btnSignInStyle, btnTextSignIn, loginContainer,
            username
        } = styles;
        const { user } = this.props;
        const logoutJSX = (
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={btnStyle} onPress={this.gotoAuthentication.bind(this)}>
                    <Text style={btnText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        );
        const loginJSX = (
            <View style={loginContainer}>
                <Text style={username}>{user ? user.name : ''}</Text>
                <View>
                    <TouchableOpacity
                        style={btnSignInStyle} onPress={this.gotoOrderHistory.bind(this)}
                    >
                        <Text style={btnTextSignIn}>Order History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={btnSignInStyle} onPress={this.gotoChangeInfo.bind(this)}
                    >
                        <Text style={btnTextSignIn}>Change Info</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={btnSignInStyle} onPress={this.onSignOut.bind(this)}>
                        <Text style={btnTextSignIn}>Sign out</Text>
                    </TouchableOpacity>
                </View>
                <View />
            </View>
        );
        const mainJSX = user ? loginJSX : logoutJSX;
        return (
            <View style={container}>
                <Image source={profileIcon} style={profile} />
                {mainJSX}
            </View>

        );
    }
}

function mapStateToProps(state) {
    return { 
        user: state.user
    };
}
export default connect(mapStateToProps, { onSignIn })(Menu);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34B089',
        borderRightWidth: 3,
        borderColor: '#fff',
        alignItems: 'center'
    },
    profile: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginVertical: 30
    },
    btnStyle: {
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 70
    },
    btnText: {
        color: '#34B089',
        fontSize: 20
    },
    btnSignInStyle: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 5,
        width: 200,
        marginBottom: 10,
        justifyContent: 'center',
        paddingLeft: 10
    },
    btnTextSignIn: {
        color: '#34B089',
        fontSize: 15
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    username: {
        color: '#fff',
        fontFamily: 'Avenir',
        fontSize: 15
    }
});

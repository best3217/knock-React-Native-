import React, { Component } from 'react'
import { Text, View, StatusBar, TouchableOpacity, StyleSheet, ImageBackground, Platform, } from 'react-native'

import styles from './NearByStyles';


import AntDesign from 'react-native-vector-icons/AntDesign';

export default class WhosThere extends Component {
    render() {
        StatusBar.setBarStyle('light-content', true);

        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('transparent', true);
            StatusBar.setTranslucent(true);
        }
        return (
            <View style={{ flex: 1 }}>

                {/* <View style={style.header}>

                    <View style={{ alignItems: 'center', width: '10%', }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                            style={{ width: '100%', justifyContent: 'center' }}
                        >
                            <AntDesign name='left' size={20} color='white' />
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center', width: '90%' }}>
                        <Text style={styles.headerTitle}>Knock</Text>
                    </View>
                </View> */}

                {/* <View style={style.contentContainer}> */}
                <ImageBackground
                    resizeMode= 'stretch'
                    source={require('../../assets/theme.jpg')}
                    style={{ width: '100%', height: '100%', }}>

                    <View style={style.header}>

                        <View style={{ alignItems: 'center', width: '10%', }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                <AntDesign name='arrowleft' size={25} color='black' />
                            </TouchableOpacity>
                        </View>

                        {/* <View style={{ alignItems: 'center', width: '90%' }}>
                        <Text style={styles.headerTitle}>Knock</Text>
                    </View> */}
                    </View>

                </ImageBackground>
                {/* </View> */}
            </View>
        )
    }
}

const style = StyleSheet.create({
    header: {
        height: 130,
        // backgroundColor: '#2d324f',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 10,
        // alignItems: 'center',
        // paddingTop: 10,
        paddingHorizontal: 20,
        // marginBottom: 10
    },
    contentContainer: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // padding: 10
    },
})

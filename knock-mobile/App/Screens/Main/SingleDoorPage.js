import React, { Component } from 'react'
import { Text, View, StatusBar, TouchableOpacity, StyleSheet, Image, ImageBackground, Platform, Alert } from 'react-native'

import styles from './NearByStyles';
import ModalPostCard from './ModalPostCard';

import AntDesign from 'react-native-vector-icons/AntDesign';

export default class SingleDoorPage extends Component {
    constructor(props){
        super(props)
        this.postCardModal = React.createRef()
    }

    showAlert = () =>
        Alert.alert(
            "Knocked",
            "",
            [
                {
                    text: "Cancel",
                    onPress: () => Alert.alert("Cancel Pressed"),
                    style: "cancel",
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            {
                cancelable: true,
                onDismiss: () =>
                    Alert.alert(
                        "This alert was dismissed by tapping outside of the alert dialog."
                    ),
            },
            
        );

        handlePostCardModal = () => {
            this.postCardModal.current.modalHandle()
        }

    render() {
        StatusBar.setBarStyle('light-content', true);

        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('transparent', true);
            StatusBar.setTranslucent(true);
        }
        return (
            <View style={{ flex: 1 }}>

                <ImageBackground
                    source={require('../../assets/Knock.jpg')}
                    style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}>

                    <View style={style.header}>

                        <View style={{ alignItems: 'center', width: '10%', }}>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                <AntDesign name='arrowleft' size={25} color='black' />
                            </TouchableOpacity>
                        </View>

                        <Image
                            style={{ width: 25, height: 25, alignSelf: 'center', marginLeft: 5 }}
                            source={require('../../assets/ring.jpg')}

                        />

                        <View style={{ alignItems: 'center', width: '78%' }}>
                            <Text style={styles.headerTitle}>Who's There?</Text>
                        </View>
                    </View>

                    <View style={{ flex: 0.8, justifyContent: 'space-between', marginBottom: 40, }}>

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.showAlert()}
                                activeOpacity={1}
                            >
                                <Image
                                    style={{ width: 50, height: 50, alignSelf: 'center' }}
                                    source={require('../../assets/bell.jpg')}

                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 10, marginBottom: 100, }}>
                            <TouchableOpacity onPress={() => alert('Knock')}
                                activeOpacity={1}
                            >
                                <Image
                                    style={{ width: 50, height: 80, alignSelf: 'center' }}
                                    source={require('../../assets/handle.jpg')}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginBottom: 70 }}>

                            <TouchableOpacity onPress={() => this.handlePostCardModal()}
                                activeOpacity={1}
                            >
                                <Image
                                    style={{ width: '80%', height: 60, alignSelf: 'center' }}
                                    source={require('../../assets/post.jpg')}
                                />
                            </TouchableOpacity>

                        </View>

                    </View>
                    <ModalPostCard ref={this.postCardModal}/>

                </ImageBackground>

                

            </View>
        )
    }
}

const style = StyleSheet.create({
    header: {
        height: 150,
        // backgroundColor: '#2d324f',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 10,
        // alignItems: 'center',
        // paddingTop: 10,
        paddingHorizontal: 10,
        // marginBottom: 10
    },
    contentContainer: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // padding: 10
    },
})

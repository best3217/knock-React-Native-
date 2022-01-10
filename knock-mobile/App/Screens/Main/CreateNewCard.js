import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StatusBar,
    Platform,
    TouchableOpacity,
    FlatList,
    BackHandler,
    I18nManager,
    ScrollView,
    StyleSheet,
    ImageBackground,
} from 'react-native';

import styles from './FavoriteStyles'

import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { TextInput } from 'react-native-gesture-handler';

import { Fonts, Metrics } from '../../Themes';

// import PhotoUpload from 'react-native-photo-upload'
import ImagePicker from 'react-native-image-crop-picker';
import Modal from "react-native-modal";

export default class CreateNewCard extends Component {
    state = {
        title: '',
        imagePath: '',
        visible: false
    }

    selectImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image.path);
            this.setState({ imagePath: image.path })
        });
    }

    OpenCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
        })
    }


    modalClose = () => {
        this.setState({ visible: !this.state.visible })
    }

    saveImage = () => {
        // alert('Image Save')
        alert(this.props.addImage)
        this.props.addImage(this.state.imagePath)
        this.setState({ visible: !this.state.visible })
    }

    handleSubmit = () => {
        this.props.handleAddImage({
            id: '${(todos[todos.length-1] && parseInt(todos[todos.length-1].key)+1) || 1 }',
            uploadImage: this.state.imagePath,
            comment: this.state.title,
            likes: 1234,
            comments: 123
        })
        this.modalClose()
    }

    render() {
        StatusBar.setBarStyle('light-content', true);

        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('transparent', true);
            StatusBar.setTranslucent(true);
        }
        return (
            <Modal
                isVisible={this.state.visible}
                onBackButtonPress={this.modalClose}
                style={{ margin: 0 }}
            >
                <View style={{ flex: 1, backgroundColor: 'white' }}>

                    <View style={style.header}>

                        <View style={{ alignItems: 'center', width: '10%', }}>
                            <TouchableOpacity onPress={() => this.modalClose()}
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                <AntDesign name='left' size={20} color='white' />
                            </TouchableOpacity>
                        </View>

                        <View style={{ alignItems: 'center', width: '90%' }}>
                            <Text style={styles.headerTitle}>Create New Card</Text>
                        </View>
                    </View>

                    <View style={style.contentContainer}>

                        <View style={{ marginBottom: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                            <TouchableOpacity onPress={() => this.selectImage()}
                                activeOpacity = {0.5}
                            >
                                <View style={{ borderRadius: 100, justifyContent: 'center', alignItems: 'center', width: 150, height: 150, borderWidth: 1, borderColor: 'lightgrey' }}>

                                    {this.state.imagePath == '' ?
                                        <EvilIcons name='camera' size={30} color='lightgrey'/>
                                            :
                                        <Image
                                            style={{ width: 150, height: 150, resizeMode: 'cover', borderRadius: 100 }}
                                            source={{ uri: this.state.imagePath }}
                                        >
                                        </Image>
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Text>Title</Text>
                            <TextInput
                                style={style.input}
                                placeholder='Title'
                                placeholderTextColor='lightgrey'

                                onChangeText={value => this.setState({ title: value })}
                            />
                        </View>
                        <View>
                            {/* <Text>Choose Image</Text> */}

                            <TouchableOpacity
                                style={style.connectWithTwitterBg}
                                onPress={() => { this.handleSubmit() }}>
                                <Text style={style.connectWithTwitterFbTxt}>
                                    Create Postcard
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            {/* <TouchableOpacity
                                style={style.connectWithFacebookBg}
                                onPress={() => this.saveImage()}>
                                <Text style={style.connectWithTwitterFbTxt}>
                                    Save Postcard
                                </Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>

                </View>
            </Modal>
        )
    }
}

const style = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: '#2d324f',
        flexDirection: 'row',
        paddingTop: 10,
        // alignItems: 'center',
        // paddingTop: 10,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    contentContainer: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 10
    },
    input: {
        backgroundColor: 'white',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'lightgrey'
    },
    imageButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#4cda64',
        marginVertical: 10,
        borderRadius: 5
    },
    buttonContainer: {
        marginVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#4cda64',
        marginVertical: 10,
        borderRadius: 5
    },
    connectWithTwitterBg: {
        backgroundColor: '#0691ce',
        width: Metrics.WIDTH * 0.82,
        ...Platform.select({
            android: {
                height: Metrics.HEIGHT * 0.07,
            },
            ios: {
                height: Metrics.HEIGHT * 0.06,
            },
        }),
        alignSelf: 'center',
        marginTop: Metrics.HEIGHT * 0.03,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    connectWithFacebookBg: {
        backgroundColor: '#3b5999',
        width: Metrics.WIDTH * 0.82,
        ...Platform.select({
            android: {
                height: Metrics.HEIGHT * 0.07,
            },
            ios: {
                height: Metrics.HEIGHT * 0.06,
            },
        }),
        alignSelf: 'center',
        marginTop: Metrics.HEIGHT * 0.015,
        marginBottom: Metrics.HEIGHT * 0.04,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    connectWithTwitterFbTxt: {
        color: '#fff',
        textAlign: 'center',
        fontSize: Fonts.moderateScale(15),
        fontFamily: Fonts.type.SFUIDisplayMedium,
        marginTop: -1,
    },
})
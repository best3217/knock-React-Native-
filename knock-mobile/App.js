import React, {useEffect} from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PermissionsAndroid } from 'react-native';
import Navigation from './App/Navigation/AppNavigation';
import { Provider } from 'react-redux';
import store from './App/store';
import { PERMISSIONS, check, RESULTS, request } from 'react-native-permissions';

if (typeof originalXMLHttpRequest !== 'undefined') {
    XMLHttpRequest = originalXMLHttpRequest;
}

export default function App(props) {
    const getMicrophonePermission = () => {
        const audioPermission = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;

        return PermissionsAndroid.check(audioPermission).then(async (result) => {
            if (!result) {
                await PermissionsAndroid.request(audioPermission, {
                    title: 'Microphone Permission',
                    message: 'Tone needs access to you microphone ' + 'so you can talk with other users.',
                    buttonPositive: 'Allow Now',
                });
            }
        });
    };

    if (Platform.OS == 'android') {
        getMicrophonePermission();
    } else if (Platform.OS == 'ios') {
        check(PERMISSIONS.IOS.MICROPHONE)
            .then((result) => {
                switch (result) {
                    case RESULTS.UNAVAILABLE:
                        console.log('Microphone is not available');
                        break;
                    case RESULTS.DENIED:
                        console.log('Microphone is denied');
                        request(PERMISSIONS.IOS.MICROPHONE)
                            .then((result) => console.log('Permission for microphone', result))
                            .catch((err) => console.log('Permission microphone request error', err));
                        break;
                    case RESULTS.LIMITED:
                        console.log('Microphone is limited');
                        break;
                    case RESULTS.GRANTED:
                        console.log('Microphone is Granted');
                        break;
                    case RESULTS.BLOCKED:
                        console.log('Microphone is Blocked');
                        break;
                    default:
                        break;
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <Navigation />
            </SafeAreaProvider>
        </Provider>
    );
}

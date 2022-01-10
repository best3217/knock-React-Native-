import React, {useEffect} from 'react';
import { ImageBackground } from 'react-native';
import {Container} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { LOCAL_STORAGE_KEY } from '../../consts';

export default function Splash() {
    const { replace } = useNavigation();
    const dispatch = useDispatch();
    
    useEffect(() => {
        (async () => {
            const user = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.USER);

            if (user) {                
                replace('Main');
            } else {
                replace('Home');
            }
        })();
    }, [dispatch, replace]);

    return (
      <Container>
        <ImageBackground
          source={require('../../assets/background.png')}
          style={{flex: 1, resizeMode: 'contain'}}>                    
        </ImageBackground>
      </Container>
    );
}

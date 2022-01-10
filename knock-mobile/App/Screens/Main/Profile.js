import React, {Component, useEffect} from 'react';
import {
  Text,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  View,
  BackHandler,
  I18nManager,
} from 'react-native';
import {
  Container,
  Right,
  Left,
  Content,
  Body,
  Header,
  Title,
} from 'native-base';
import TextAvatar from "react-native-text-avatar";
import { useUser } from '../../store/hooks';
import styles from './styles';

const profileImg =
  'https://antiqueruby.aliansoftware.net//Images/profile/ic_profile_pic_pnineteen.jpg';

export default function Profile() {

  const {user, logout} = useUser();
  
  console.log(user);
  useEffect(() => {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function () {
      that.props.navigation.navigate('Profile');
      return true;
    });
  },[])

  StatusBar.setBarStyle('light-content', true);
  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('#2d324f', true);
    StatusBar.setTranslucent(true);
  }
  
    return (
      <Container style={styles.main}>
       
        <Content>
          <TextAvatar
            backgroundColor={'#3b5999'}
            textColor={'#FFFFFF'}
            size={100}
            type={'circle'} // optional
            style={styles.profileImg}
          >{user?.name}</TextAvatar>          
          <Text style={styles.nameTxt}>{user?.name}</Text>                   
          <TouchableOpacity
            style={styles.connectWithFacebookBg}
            onPress={() => logout()}>
            <Text style={styles.connectWithTwitterFbTxt}>
              Log Out
            </Text>
          </TouchableOpacity>
          <View style={styles.dividerHorizontal} />
          <View style={styles.accountInfoBg}>
            <Text style={styles.accountInfoTxt}>ACCOUNT INFORMATION</Text>
          </View>
          <View style={styles.dividerHorizontal} />
          <View style={{flexDirection: 'column'}}>
            <View style={styles.infoFieldBg}>
              <Text style={styles.infoFieldTitleTxt}>Name</Text>
              <Text style={styles.infoFieldDetailTxt}>{user?.name}</Text>
            </View>
            <View style={styles.fieldDivider} />
          </View>
          <View style={{flexDirection: 'column'}}>
            <View style={styles.infoFieldBg}>
              <Text style={styles.infoFieldTitleTxt}>Email</Text>
              <Text style={styles.infoFieldDetailTxt}>
                {user?.email}
              </Text>
            </View>
            <View style={styles.fieldDivider} />
          </View>
          <View style={{flexDirection: 'column'}}>
            <View style={styles.infoFieldBg}>
              <Text style={styles.infoFieldTitleTxt}>Phone</Text>
              <Text style={styles.infoFieldDetailTxt}>{user?.phone}</Text>
            </View>
            <View style={styles.fieldDivider} />
          </View>          
        </Content>
      </Container>
    );
  
}

import React, {Component} from 'react';
import {
  View,
  Platform,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  I18nManager,
} from 'react-native';
import {Container, Form, Footer, Header, Left, Right, Body} from 'native-base';
import Swiper from 'react-native-swiper';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
// Screen Styles
import styles from './styles';
import {Metrics} from '../../Themes';

export default class App extends Component {
  componentDidMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function () {
      that.props.navigation.navigate('Home');
      return true;
    });
  }

  render() {
    StatusBar.setBarStyle('light-content', true);

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }

    return (
      <Container>
        <ImageBackground
          source={require('../../assets/background.png')}
          style={{flex: 1, resizeMode: 'contain',}}>
          <Header style={styles.header}>
            <Left style={styles.left}>
              <TouchableOpacity
                style={styles.backArrow}
                onPress={() => this.props.navigation.navigate('DrawerStackAntiqueruby')}>
                <FontAwesome
                  name={I18nManager.isRTL ? 'angle-right' : 'angle-left'}
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            </Left>
            <Body style={styles.body}>
              <Text style={styles.textTitle} />
            </Body>
            <Right style={styles.right} />
          </Header>
          <View style={styles.view01}>            
          </View>
          <Swiper
            showsButtons={false}
            autoplay={true}
            autoplayTimeout={2.5}
            activeDot={<View style={styles.activedots} />}
            dot={<View style={styles.dots} />}>
            <View style={styles.slide1}>
              <Text style={styles.headertext}>
                Knock Knock
              </Text>
              <Text style={styles.desctext}>
                Who's There?
              </Text>
            </View>
            <View style={styles.slide1}>
              <Text style={styles.headertext}>
                Please sign up to knock Doors
              </Text>
              <Text style={styles.desctext}>
                You can freely communicate with others cross the contries
              </Text>
            </View>           
          </Swiper>
          <Footer>
            <TouchableOpacity
              style={styles.footerLogin}
              onPress={() => this.props.navigation.navigate('SignIn')}>
              <Text autoCapitalize="words" style={styles.footerText}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerSignup}
              onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text autoCapitalize="words" style={styles.footerText}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </Footer>
        </ImageBackground>
      </Container>
    );
  }
}

import {StyleSheet} from 'react-native';
import {Fonts, Metrics, Colors} from '../../Themes';

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.transparent,
    height: Metrics.WIDTH * 0.22,
    borderBottomWidth: 0,
    elevation: 0,
  },
  left: {
    flex: 0.5,
    backgroundColor: 'transparent',
  },
  body: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    marginTop: 20,
  },
  activedots: {
    backgroundColor: '#ffffff',
    width: 10,
    height: 10,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  dots: {
    backgroundColor: '#8796a6',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  view01: {
    height: Metrics.HEIGHT * 0.1,
  },

  logostyle: {
    alignSelf: 'center',
    marginTop: Metrics.HEIGHT * 0.1,
    width: Metrics.WIDTH * 0.3,
    height: Metrics.HEIGHT * 0.13,
  },
  slide1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: Metrics.HEIGHT * 0.25,
  },

  headertext: {
    fontFamily: 'PlayfairDisplay-Bold',
    backgroundColor: 'transparent',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 28,
    width: Metrics.WIDTH * 0.9,
    color: 'white',
  },

  desctext: {
    fontFamily: 'Bariol',
    backgroundColor: 'transparent',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 16,
    width: Metrics.WIDTH * 0.9,
    color: 'white',
    marginTop: Metrics.WIDTH * 0.07,
  },

  footerText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: Fonts.SFUIDisplayMedium,
    fontSize: 16,
  },
  footerLogin: {
    width: Metrics.WIDTH * 0.5,
    backgroundColor: Colors.loginBlue,
    justifyContent: 'center',
  },
  footerSignup: {
    width: Metrics.WIDTH * 0.5,
    backgroundColor: Colors.loginGreen,
    justifyContent: 'center',
  },
});
export default styles;

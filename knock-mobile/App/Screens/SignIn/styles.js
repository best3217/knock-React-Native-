import {Platform, StyleSheet} from 'react-native';
import {Fonts, Metrics, Colors} from '../../Themes';

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.transparent,
    height: Metrics.WIDTH * 0.1,
    borderBottomWidth: 0,
    ...Platform.select({
      ios: {},
      android: {
        marginTop: Fonts.moderateScale(25),
      },
    }),
    elevation: 0,
  },
  left: {
    flex: 0.5,
    backgroundColor: 'transparent',
  },
  backArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
  },
  body: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  textTitle: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16),
    marginTop: 5,
    alignSelf: 'center',
    fontFamily: Fonts.type.sfuiDisplaySemibold,
  },
  right: {
    flex: 0.5,
  },
  inputFieldSec: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: Colors.snow,
    borderRadius: 5,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    alignSelf: 'center',
    width: Metrics.WIDTH * 0.84,
    fontSize: Fonts.moderateScale(14),
  },
  chboxConatiner: {
    flexDirection: 'row',
    width: Metrics.WIDTH * 0.84,
    height: Metrics.HEIGHT * 0.1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  textRememberMe: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    marginLeft: Fonts.moderateScale(10),
  },
  textForgotPwd: {
    color: Colors.snow,
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(16),
    textAlign: 'right',
  },
  signInSec: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSignIn: {
    backgroundColor: '#4cda64',
    borderRadius: Fonts.moderateScale(5),
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: Metrics.WIDTH * 0.84,
  },
  textWhite: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(14),
    fontFamily: Fonts.type.sfuiDisplaySemibold,
  },
  createAccount: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textSignUp: {
    color: '#919191',
    fontSize: Fonts.moderateScale(14),
    fontFamily: Fonts.type.sfuiDisplaySemibold,
  },
  errorMessage : {
    fontSize : 15, 
    alignSelf : "flex-start", 
    marginLeft : 35, 
    marginTop : 5
  }
});
export default styles;

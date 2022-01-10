import {Platform, StyleSheet, I18nManager} from 'react-native';
import {Fonts, Metrics} from '../../Themes';

const styles = StyleSheet.create({
  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },

  header: {
    backgroundColor: '#2d324f',
    height: 65,
    width: Metrics.WIDTH,
    flexDirection: 'row',
    borderBottomColor: 'transparent',
    paddingTop: 15,
  },
  left: {
    flex: 1,
  },
  backArrow: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  body: {
    flex: 2,
    alignItems: 'center',
  },
  title: {
    marginTop: 2,
    color: 'white',
    fontSize: Fonts.moderateScale(18),
    fontFamily: Fonts.type.SFUIDisplaySemibold,
  },
  profileImg: {
    width: Metrics.WIDTH * 0.24,
    height: Metrics.WIDTH * 0.24,
    borderRadius: Metrics.WIDTH * 0.12,
    alignSelf: 'center',
    marginTop: Metrics.HEIGHT * 0.1,
  },

  nameTxt: {
    color: '#6f6f6f',
    fontFamily: Fonts.type.SFUIDisplayMedium,
    fontSize: Fonts.moderateScale(18),
    alignSelf: 'center',
    marginTop: Metrics.HEIGHT * 0.01,
  },

  designationTxt: {
    color: '#b7b7b7',
    fontSize: Fonts.moderateScale(12),
    fontFamily: Fonts.type.SFUIDisplayRegular,
    marginTop: 3,
    alignSelf: 'center',
  },

  descTxt: {
    width: Metrics.WIDTH * 0.75,
    alignSelf: 'center',
    color: '#6f6f6f',
    fontSize: Fonts.moderateScale(14),
    fontFamily: Fonts.type.SFUIDisplayLight,
    textAlign: 'center',
    marginTop: Metrics.WIDTH * 0.045,
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
    marginTop: Metrics.HEIGHT * 0.08,
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

  dividerHorizontal: {
    backgroundColor: '#d6d6d6',
    height: 1,
    width: Metrics.WIDTH,
    alignSelf: 'center',
  },

  accountInfoBg: {
    backgroundColor: '#f1f1f1',
    height: Metrics.HEIGHT * 0.072,
    width: Metrics.WIDTH,
  },

  accountInfoTxt: {
    color: '#adadad',
    fontSize: Fonts.moderateScale(12),
    width: Metrics.WIDTH * 0.82,
    paddingTop: Metrics.HEIGHT * 0.035,
    paddingLeft: I18nManager.isRTL ? 0 : Metrics.WIDTH * 0.09,
    paddingRight: I18nManager.isRTL ? Metrics.WIDTH * 0.09 : 0,
    fontFamily: Fonts.type.SFUIDisplayRegular,
    textAlign: 'left',
  },

  infoFieldBg: {
    width: Metrics.WIDTH * 0.82,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'column',
  },

  infoFieldTitleTxt: {
    color: '#b7b7b7',
    fontSize: Fonts.moderateScale(12),
    fontFamily: Fonts.type.SFUIDisplayLight,
    textAlign: 'left',
  },

  infoFieldDetailTxt: {
    color: '#6f6f6f',
    textAlign: 'left',
    ...Platform.select({
      android: {
        fontSize: Fonts.moderateScale(18),
      },
      ios: {
        fontSize: Fonts.moderateScale(16),
      },
    }),
    fontFamily: Fonts.type.SFUIDisplayLight,
  },

  fieldDivider: {
    backgroundColor: '#f2f2f2',
    width: Metrics.WIDTH * 0.91,
    alignSelf: 'flex-end',
    height: 1,
  },
});

export default styles;

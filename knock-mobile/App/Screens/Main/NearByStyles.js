import {StyleSheet} from 'react-native';

// Screen Styles
import {Fonts, Metrics, Colors} from '../../Themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: '#F2F2F2',
    flexDirection: 'column',
  },
  backArrow: {
    width: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  header: {
    backgroundColor: '#2d324f',
    height: Metrics.HEIGHT * 0.1,
    borderBottomWidth: 0,
    paddingTop: Metrics.HEIGHT * 0.03,
    elevation: 0,
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingRight: Metrics.WIDTH * 0.05,
  },

  left: {
    flex: 0.5,
    paddingTop: 0,
  },

  body: {
    flex: 3,
    alignItems: 'center',
  },

  right: {
    flex: 0.5,
    paddingTop: 0,
  },

  headerTitle: {
    color: Colors.snow,
    fontFamily: Fonts.type.sfuiDisplayBold,
    paddingTop: 0,
    fontSize: Fonts.moderateScale(17),
    letterSpacing: 0.7,
  },

  rowMain: {
    margin: Metrics.WIDTH * 0.035,
    flexDirection: 'row',
  },

  images: {
    height: Metrics.HEIGHT * 0.15,
    width: Metrics.WIDTH * 0.3,
    resizeMode: 'cover',
    marginTop: Metrics.HEIGHT * 0.007,
  },

  newsContent: {
    width: Metrics.WIDTH * 0.6,
    marginLeft: Metrics.WIDTH * 0.05,
  },

  name: {
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    fontSize: Fonts.moderateScale(17),
    color: '#363636',
    textAlign: 'left',
  },

  comment: {
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(13),
    color: '#6f6f6f',
    marginTop: Metrics.HEIGHT * 0.005,
    textAlign: 'left',
  },

  followContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrics.HEIGHT * 0.015,
  },

  likeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Metrics.WIDTH * 0.1,
  },

  textStyle: {
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(13),
    color: '#6f6f6f',
    marginLeft: Metrics.WIDTH * 0.02,
    textAlign: 'center',
  },

  separatorStyle: {
    height: Metrics.HEIGHT * 0.001,
    backgroundColor: '#d7d7d7',
    marginLeft: Metrics.WIDTH * 0.035,
  },

  tabUnderLine: {
    backgroundColor: Colors.snow,
  },
  tabUnderLineTrans: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: Fonts.moderateScale(14),
  },

  likeCommentShareImage: {
    width: Metrics.WIDTH * 0.05,
    height: Metrics.HEIGHT * 0.02,
    resizeMode: 'contain',
  },
});

export default styles;

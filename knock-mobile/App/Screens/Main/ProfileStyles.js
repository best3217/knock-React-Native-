import {StyleSheet} from 'react-native';
import {Fonts, Metrics, Colors} from '../../Themes';

const styles = StyleSheet.create({
  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: Colors.transparent,
    flexDirection: 'column',
  },

  header: {
    backgroundColor: '#fa6b7b',
    height: Metrics.HEIGHT * 0.1,
    width: Metrics.WIDTH,
    flexDirection: 'row',
    borderBottomColor: '#fa6b7b',
    paddingTop: Metrics.WIDTH * 0.05,
  },

  body: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  right: {
    flex: 1,
  },

  mainView: {
    height: Metrics.HEIGHT * 0.8,
    width: Metrics.WIDTH,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profile: {
    height: Metrics.HEIGHT * 0.2,
    width: Metrics.HEIGHT * 0.2,
    borderRadius: Metrics.HEIGHT * 0.1,
    borderWidth: 2,
    borderColor: '#fa6b7b',
  },

  name: {
    fontSize: Fonts.moderateScale(18),
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    color: '#fa6b7b',
    marginTop: Metrics.HEIGHT * 0.015,
  },
});

export default styles;

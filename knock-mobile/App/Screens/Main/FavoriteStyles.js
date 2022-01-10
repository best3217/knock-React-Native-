import {Platform, StyleSheet} from 'react-native';

// Screen Styles
import {Fonts, Metrics, Colors} from '../../Themes';

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#2d324f',
  },

  backArrow: {
    width: 35,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  searchIcon: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(22),
  },

  logosec: {
    height: Metrics.HEIGHT * 0.095,
    marginTop: Platform.OS === 'ios' ? 0 : Metrics.HEIGHT * 0.035,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  slidesec: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.snow,
  },

  header: {
    backgroundColor: '#2d324f',
    height: Metrics.HEIGHT * 0.1,
    width: Metrics.WIDTH,
    flexDirection: 'row',
    borderBottomColor: '#2d324f',
    ...Platform.select({
      ios: {
        marginTop: Metrics.HEIGHT * 0.007,
        paddingTop: 0,
      },
      android: {},
    }),
  },

  left: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 15 : 0,
  },

  body: {
    flex: 2,
    alignItems: 'center',
  },

  right: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 15 : 0,
  },

  headerTitle: {
    color: Colors.snow,
    fontFamily: Fonts.type.sfuiDisplayBold,
    paddingTop: Platform.OS === 'ios' ? 15 : 0,
    fontSize: Fonts.moderateScale(17),
    letterSpacing: 0.7,
  },

  comments: {
    color: '#6f6f6f',
    fontSize: Fonts.moderateScale(17),
    marginVertical: Metrics.HEIGHT * 0.005,
  },

  listContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: Metrics.HEIGHT * 0.01,
  },

  rowMain: {
    backgroundColor: Colors.snow,
    width: Metrics.WIDTH * 0.445,
    margin: Metrics.WIDTH * 0.0165,
    borderRadius: 2,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    elevation: 5,
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: Metrics.HEIGHT * 0.002,
      width: 0,
    },
  },

  rowImage: {
    width: Metrics.WIDTH * 0.445,
    height: Metrics.WIDTH * 0.445,
    borderRadius: 2,
    resizeMode: 'cover',
  },

  rowProImage: {
    width: Metrics.WIDTH * 0.08,
    height: Metrics.WIDTH * 0.08,
    borderRadius: Metrics.WIDTH * 0.04,
    position: 'absolute',
    resizeMode: 'cover',
    marginLeft: Metrics.WIDTH * 0.03,
    marginTop: Metrics.WIDTH * 0.4,
    borderWidth: 1.5,
    borderColor: Colors.snow,
    zIndex: 10,
  },

  rowTitle: {
    color: '#6f6f6f',
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(15),
    marginTop: Metrics.HEIGHT * 0.03,
    marginHorizontal: Metrics.WIDTH * 0.03,
    textAlign: 'left',
  },

  rowdevider: {
    backgroundColor: '#f2f2f2',
    width: Metrics.WIDTH * 0.445,
    height: Metrics.HEIGHT * 0.001,
    marginTop: Metrics.HEIGHT * 0.02,
  },

  rowCount: {
    flexDirection: 'row',
    marginVertical: Metrics.WIDTH * 0.03,
  },

  subRow: {
    flexDirection: 'row',
    width: Metrics.WIDTH * 0.22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconSize: {
    width: Metrics.WIDTH * 0.04,
    height: Metrics.WIDTH * 0.04,
    marginRight: Metrics.WIDTH * 0.02,
    resizeMode: 'contain',
  },

  countSize: {
    color: '#6f6f6f',
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(15),
    marginLeft: Metrics.WIDTH * 0.015,
  },

  verticaldevider: {
    backgroundColor: '#d4d4d4',
    height: Metrics.HEIGHT * 0.028,
    width: Metrics.WIDTH * 0.003,
    alignSelf: 'center',
  },

  searchicon: {
    marginRight: 10,
    color: '#fff',
    fontSize: 24,
  },
});

export default styles;

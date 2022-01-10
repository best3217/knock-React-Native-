import React, {Component} from 'react';
import {
  Text,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  FlatList,
  BackHandler,
  I18nManager,
} from 'react-native';

// Screen Styles
import styles from './NearByStyles';
import {View} from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Images, Fonts} from '../../Themes';

import {
  Container,
  Body,
  Right,
  Left,
  Header,
  Tab,
  Tabs,
  ScrollableTab,
} from 'native-base';

export default class NearBy extends Component {
  componentDidMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function () {
      that.props.navigation.navigate('Social');
      return true;
    });
  }

  constructor(props) {
    super(props);

    const cardImageOne =
    'https://antiqueruby.aliansoftware.net//Images/profile/ic_profile_pic_pnineteen.jpg';
    const cardImageTwo =
    'https://antiqueruby.aliansoftware.net//Images/profile/ic_profile_pic_pnineteen.jpg';
    const cardImageThree =
    'https://antiqueruby.aliansoftware.net//Images/profile/ic_profile_pic_pnineteen.jpg';
    const cardImageFour =
    'https://antiqueruby.aliansoftware.net//Images/profile/ic_profile_pic_pnineteen.jpg';
    const cardImageFive =
    'https://antiqueruby.aliansoftware.net//Images/profile/ic_profile_pic_pnineteen.jpg';

    const dataObjects = [
      {
        id: 1,
        name: 'citizenM NY Times Square',
        comment:
          'Lorem ipsum dolor sit amet, conses adipisi, sed do eiusmod tempor ince idunt ut labore et dolore.',
        likes: 12,
        comments: 35,
        image: {uri: cardImageOne},
      },
      {
        id: 2,
        name: 'The Roosevelt Hotel',
        comment:
          'Lorem ipsum dolor sit amet, conses adipisi, sed do eiusmod tempor ince idunt ut labore et dolore.',
        likes: 12,
        comments: 35,
        image: {uri: cardImageTwo},
      },
      {
        id: 3,
        name: 'EVEN Hotel Times Square',
        comment:
          'Lorem ipsum dolor sit amet, conses adipisi, sed do eiusmod tempor ince idunt ut labore et dolore.',
        likes: 12,
        comments: 35,
        image: {uri: cardImageThree},
      },
      {
        id: 4,
        name: 'Wellington Hotel',
        comment:
          'Lorem ipsum dolor sit amet, conses adipisi, sed do eiusmod tempor ince idunt ut labore et dolore.',
        likes: 12,
        comments: 35,
        image: {uri: cardImageFour},
      },
      {
        id: 5,
        name: 'Waldorf Astoria New York',
        comment:
          'Lorem ipsum dolor sit amet, conses adipisi, sed do eiusmod tempor ince idunt ut labore et dolore.',
        likes: 12,
        comments: 35,
        image: {uri: cardImageFive},
      },
    ];

    this.state = {
      isLoading: true,
      dataSource: dataObjects,
    };
  }

  _renderRow(rowData) {
    var rowData = rowData.item;
    return (
      <View>
        <View style={styles.rowMain}>
          <Image source={rowData.image} style={styles.images} />
          <View style={styles.newsContent}>
            <Text numberOfLines={1} style={styles.name}>
              Tianyang Gao
            </Text>
            <Text numberOfLines={3} style={styles.comment}>
              Last called 20 mins ago
            </Text>
            <View style={styles.followContent}>              
              <View style={styles.likeContent}>
                <TouchableOpacity onPress={() => alert('Comment')}>
                  <Image
                    style={styles.likeCommentShareImage}
                    source={Images.comments}
                  />
                </TouchableOpacity>
                <Text style={styles.textStyle}>{rowData.comments}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.separatorStyle} />
      </View>
    );
  }
  render() {
    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#2d324f', true);
      StatusBar.setTranslucent(true);
    }

    var that = this;

    return (
      <Container style={styles.main}>
        <Header style={styles.header}>
          <Left style={styles.left}>           
          </Left>
          <Body style={styles.body}>
            <Text style={styles.headerTitle}>History</Text>
          </Body>
          <Right style={styles.right}>
            <TouchableOpacity onPress={() => alert('Search')}>
              <AntDesign name="search1" size={20} color="white" />
            </TouchableOpacity>
          </Right>
        </Header>

        <Tabs tabBarUnderlineStyle={{backgroundColor: 'transparent'}}>
          <Tab
            heading="All"
            tabStyle={{
              backgroundColor: '#383d5a',
            }}
            activeTabStyle={{
              backgroundColor: '#383d5a',
            }}
            textStyle={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: Fonts.moderateScale(12),
              fontFamily: Fonts.type.sfuiDisplayRegular,
            }}
            activeTextStyle={{
              color: '#fff',
              fontSize: Fonts.moderateScale(12),
              fontFamily: Fonts.type.sfuiDisplayRegular,
            }}>
            <View>
              <FlatList
                contentContainerStyle={styles.listContent}
                data={this.state.dataSource}
                renderItem={this._renderRow.bind(this)}
                renderSeparator={this._renderSeparator}
                enableEmptySections
                pageSize={4}
              />
            </View>
          </Tab>

          <Tab
            heading="Old"
            tabStyle={{
              backgroundColor: '#383d5a',
            }}
            activeTabStyle={{
              backgroundColor: '#383d5a',
            }}
            textStyle={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: Fonts.moderateScale(12),
              fontFamily: Fonts.type.sfuiDisplayRegular,
            }}
            activeTextStyle={{
              color: '#fff',
              fontSize: Fonts.moderateScale(12),
              fontFamily: Fonts.type.sfuiDisplayRegular,
            }}>
            <View>
              <FlatList
                contentContainerStyle={styles.listContent}
                data={this.state.dataSource}
                renderItem={this._renderRow.bind(this)}
                renderSeparator={this._renderSeparator}
                enableEmptySections
                pageSize={4}
              />
            </View>
          </Tab>

          <Tab
            heading="Archive"
            tabStyle={{
              backgroundColor: '#383d5a',
            }}
            activeTabStyle={{
              backgroundColor: '#383d5a',
            }}
            textStyle={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: Fonts.moderateScale(12),
              fontFamily: Fonts.type.sfuiDisplayRegular,
            }}
            activeTextStyle={{
              color: '#fff',
              fontSize: Fonts.moderateScale(12),
              fontFamily: Fonts.type.sfuiDisplayRegular,
            }}>
            <View>
              <FlatList
                contentContainerStyle={styles.listContent}
                data={this.state.dataSource}
                renderItem={this._renderRow.bind(this)}
                renderSeparator={this._renderSeparator}
                enableEmptySections
                pageSize={4}
              />
            </View>
          </Tab>

        </Tabs>
      </Container>
    );
  }
}

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  TouchableOpacity,
  I18nManager,
  ScrollView,
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
// Screen Styles
import styles from './DiscoveryStyles';


export default class Discovery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          DoorImage: require('../../assets/1.jpg'),
        },
        {
          id: 2,
          DoorImage: require('../../assets/2.jpg'),
        },
        {
          id: 3,
          DoorImage: require('../../assets/3.jpg'),
        },
        {
          id: 4,
          DoorImage: require('../../assets/4.jpg'),
        },
        {
          id: 5,
          DoorImage: require('../../assets/5.jpg'),
        },
        {
          id: 6,
          DoorImage: require('../../assets/6.jpg'),
        },
        {
          id: 7,
          DoorImage: require('../../assets/7.jpg'),
        },
        {
          id: 8,
          DoorImage: require('../../assets/8.jpg'),
        },
        {
          id: 9,
          DoorImage: require('../../assets/9.jpg'),
        },
        {
          id: 10,
          DoorImage: require('../../assets/10.jpg'),
        },
        {
          id: 11,
          DoorImage: require('../../assets/4.jpg'),
        },
        {
          id: 12,
          DoorImage: require('../../assets/6.jpg'),
        },
      ],
    };
  }

  onLearnMore = user => {
    // this.props.navigation.navigate('NearByDetail');
    Actions.tab_3_2();
  };

  render() {
    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#fa6b7b', true);
      StatusBar.setTranslucent(true);
    }

    return (
      <Container style={styles.main}>
        <Header style={styles.header}>
          <Left style={styles.left}>
          </Left>
          <Body style={styles.body}>
            <Text style={styles.headerTitle}>All Doors</Text>
          </Body>
          <Right style={styles.right}>
            <TouchableOpacity onPress={() => alert('Search')}>
              <AntDesign name="search1" size={20} color="white" />
            </TouchableOpacity>
          </Right>
        </Header>
        <View style={styles.listBg}>
          <ScrollView>
            <View style={styles.listContent}>
              {this.state.data.map((item, index) => {
                return (
                  <View style={styles.rowMain} key={index}>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('SingleDoorPage')}>
                      <ImageBackground resizeMode= 'cover'
                        source={item.DoorImage}
                        style={styles.imgContainer}>

                      </ImageBackground>
                    </TouchableOpacity> 
                    
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </Container>
    );
  }

  _fnChangeItem(listId) {
    // const newArray = this.state.data;

    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id == listId) {
        // alert(listId + '  ' +this.state.data[i].id)
        const newArray1 = [];

        for (i = 0; i < this.state.data.length; i++) {
          if (this.state.data[i].id == listId) {
            newArray1.push({
              id: this.state.data[i].id,
              name: this.state.data[i].name,
              cardBgImage: this.state.data[i].cardBgImage,
              profileImage: this.state.data[i].profileImage,
              WatchCount: this.state.data[i].WatchCount,
              isLiked: !this.state.data[i].isLiked,
            });
          } else {
            newArray1.push({
              id: this.state.data[i].id,
              name: this.state.data[i].name,
              cardBgImage: this.state.data[i].cardBgImage,
              profileImage: this.state.data[i].profileImage,
              WatchCount: this.state.data[i].WatchCount,
              isLiked: this.state.data[i].isLiked,
            });
          }
        }

        this.setState({ data: newArray1 });
      }
    }
  }
}

import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  FlatList,
  BackHandler,
  I18nManager,
  ScrollView,
} from 'react-native';
import {
  Container,
  Icon,
  Right,
  Header,
  Left,
  Body,
  Title,
  Content,
  Form,
} from 'native-base';

import {
  Scene,
  Router,
  Actions,
  Reducer,
  Overlay,
  Tabs,
  Stack,
  Lightbox,
} from 'react-native-router-flux';

import CreateNewCard from './CreateNewCard';
import EditPage from './EditPage';


// Screen Styles
import styles from './FavoriteStyles';
import { Images } from '../../Themes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

/**
 *  Profile Screen
 */
export default class Social11 extends Component {
  componentDidMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function () {
      that.props.navigation.navigate('Social');
      return true;
    });
  }

  constructor(props) {
    super(props);
    this.modalRef1 = React.createRef()
    this.modalRef2 = React.createRef()

    const dataObjects = [
      {
        id: 1,
        uploadImage:
          'https://antiqueruby.aliansoftware.net//Images/social/card_1_sc11.png',
        comment: 'KFC',
        likes: 1234,
        comments: 223,
      },
      {
        id: 2,
        uploadImage:
          'https://antiqueruby.aliansoftware.net//Images/social/card_02_sc11.png',
        comment: 'Been Stack',
        likes: 1234,
        comments: 223,
      },
      {
        id: 3,
        uploadImage:
          'https://antiqueruby.aliansoftware.net//Images/social/card_03_sc11.png',
        comment: 'Water Pool',
        likes: 1234,
        comments: 223,
      },
      {
        id: 4,
        uploadImage:
          'https://antiqueruby.aliansoftware.net//Images/social/card_04_sc11.png',
        comment: 'New One',
        likes: 1234,
        comments: 223,
      },
    ];

    this.state = {
      dataSource: dataObjects,
    };
  }

  _renderRow(rowData) {
    var rowData = rowData.item;
    var temp = '';
    if (rowData.flag == 'gflag') {
      temp = Images.gflagicon;
    } else if (rowData.flag == 'bflag') {
      temp = Images.bflagicon;
    } else {
      temp = '';
    }
    return (
      <View style={styles.rowMain}>
        <Image source={{ uri: rowData.uploadImage }} style={styles.rowImage} />

        <View style={styles.rowConTitle}>
          <Text style={styles.rowTitle}>{rowData.comment}</Text>
        </View>
        <View style={styles.rowdevider} />
        <View style={styles.rowCount}>
          <View style={styles.subRow}>
            <TouchableOpacity onPress={() => this.handleTriggerEdit(rowData)}>
              <MaterialIcons name="edit" size={20} color="#d4d4d4" />
            </TouchableOpacity>
            <Text style={styles.countSize}>Edit</Text>
          </View>
          <View style={styles.verticaldevider} />
          <View style={styles.subRow}>
            <TouchableOpacity onPress={() => alert('Comment')}>
              <MaterialIcons name="remove-circle-outline" size={20} color="#d4d4d4" />
            </TouchableOpacity>
            <Text style={styles.countSize}>Remove</Text>
          </View>
        </View>
      </View>
    );
  }

  handleAddImage = (newData) => {
    const newArray = [...this.state.dataSource, newData]
    // newArray.push(path)
    this.setState({ dataSource: newArray })
  }

  //   handleEditTodo = (editedTodo) => {
  //     const newTodos = [...todos]
  //     const todoIndex = todos.findIndex((todo) => todo.key === editedTodo.key)
  //     newTodos.splice(todoIndex, 1, editedTodo)
  //     setTodos(newTodos)
  //     setTodoToBeEdited(null)
  //     setModalVisible(false)
  // }

  handleTriggerEdit = (editData) => {
    this.modalRef2.current.triggerEdit(editData)
  }

  handleEdit = (editData) => {
    const newArray = [...this.state.dataSource]
    const dataIndex = this.state.dataSource.findIndex((image) => image.id === editData.id)
    newArray.splice(dataIndex, 1, editData)
    this.setState({ dataSource: newArray })
  }

  addPostCard = () => {
    this.modalRef1.current.modalClose()
  }



  render() {
    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent', true);
      StatusBar.setTranslucent(true);
    }

    var that = this;
    console.log(this.state.dataSource)
    return (
      <Container style={styles.main}>
        <View style={styles.logosec}>
          <Header style={styles.header}>
            {/* Take up the space */}
            <Left style={styles.left}>
              <TouchableOpacity
                style={styles.backArrow}
                onPress={() => that.props.navigation.navigate('Social')}>
                {I18nManager.isRTL ? (
                  <TouchableOpacity onPress={() => that.props.navigation.navigate('CreateNewCard')}>
                    <MaterialIcons name="add-circle-outline" size={35} color="#fff" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => this.addPostCard()}>
                    <MaterialIcons name="add-circle-outline" size={35} color="#fff" />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            </Left>

            {/* Title */}
            <Body style={styles.body}>
              <Title style={styles.headerTitle}>Post Cards</Title>
            </Body>

            {/* Right Icon */}
            <Right style={styles.right}>
              <TouchableOpacity onPress={() => alert('Search')}>
                <AntDesign name="search1" style={styles.searchIcon} />
              </TouchableOpacity>
            </Right>
          </Header>
        </View>
        <View style={styles.slidesec}>
          <ScrollView>
            <FlatList
              contentContainerStyle={styles.listContent}
              data={this.state.dataSource}
              renderItem={this._renderRow.bind(this)}
              enableEmptySections
              pageSize={4}
            />
            {/* <Text>{this.props.navigation.getParam('params')}</Text> */}

            <CreateNewCard ref={this.modalRef1}
              handleAddImage={this.handleAddImage}
            />

            <EditPage ref={this.modalRef2}
              handleEdit={this.handleEdit}
            />


          </ScrollView>
        </View>

      </Container>
    );
  }
}

import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StatusBar,
  BackHandler,
  I18nManager,
} from 'react-native';
import {Container, Right, Header, Left, Body} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useUser} from '../../store/hooks'
import { validateEmail } from '../../helper/globalFunction';

// Screen Styles
import styles from './styles';

    
const SignIn_06 = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneNoError, setPhoneNoError] = useState("");

  const {userSignup} = useUser();
  
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => navigation.navigate("Home")
    )

    return () => {
      backHandler.remove();
    };
  },[])

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
    setNameError("");
    setPhoneNoError("");
  }

  const onSignupPress = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter valid Email");
    } else if (!password.length) {
      setPasswordError("Please enter valid Password");
    } else if(!name?.length){
      setNameError("Please enter Name")
    } else if(!phoneNo?.length){
      setPhoneNoError("Please enter valid Phone number")
    } else {
      clearErrors();
      const credentials = {
        email : email,
        name : name,
        password : password,
        role : "user",
        phone : phoneNo
      }
      userSignup(credentials);
    }
  };

    return (
      <Container>
        <StatusBar translucent = {true} transparent = {true} />
        <ImageBackground style={styles.imgContainer} source={require('../../assets/background.png')}>
          <Header style={styles.header}>
            <Left style={styles.left}>
              <TouchableOpacity
                style={styles.backArrow}
                onPress={() => navigation.navigate('Home')}
                >
                <FontAwesome
                  name={I18nManager.isRTL ? 'angle-right' : 'angle-left'}
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity>
            </Left>
            <Body style={styles.body}>
              <Text style={styles.textTitle}>Sign Up</Text>
            </Body>
            <Right style={styles.right} />
          </Header>
          <View>
            <View style={styles.inputFieldSec}>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                value={email}
                onChangeText = {(val) => setEmail(val) }
                placeholderTextColor="#b7b7b7"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
                keyboardType="email-address"
              />
              {emailError?.length > 0 && <Text style = {styles.errorMessage} >{emailError}</Text>}
              <TextInput
                style={styles.textInput}
                placeholder="Name"
                value={name}
                onChangeText = {(val) => setName(val) }
                placeholderTextColor="#b7b7b7"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
                keyboardType="email-address"
              />
              {nameError?.length > 0 && <Text style = {styles.errorMessage}>{nameError}</Text>}
              <TextInput
                style={styles.textInput}
                placeholder="Phone Number"
                value={phoneNo}
                onChangeText = {(val) => setPhoneNo(val) }
                placeholderTextColor="#b7b7b7"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                textAlign={I18nManager.isRTL ? 'right' : 'left'}                
              />
              {phoneNoError?.length > 0 && <Text style = {styles.errorMessage}>{phoneNoError}</Text>}
              <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                placeholder="Password"
                value={password}
                onChangeText = {(val) => setPassword(val) }
                placeholderTextColor="#b7b7b7"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
                keyboardType="default"
              />
              {passwordError?.length > 0 && <Text style = {styles.errorMessage}>{passwordError}</Text>}
            </View>
            
            <View style={styles.signInSec}>
              <TouchableOpacity
                style={styles.buttonSignIn}
                onPress={onSignupPress}
                >
                <Text style={styles.textWhite}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.createAccount}>
              <Text style={styles.textWhite}>Already have the account? </Text>
              <TouchableOpacity onPress={() => navigate('SignIn')}>
                <Text style={styles.textSignUp}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </Container>
    );
}

export default SignIn_06;
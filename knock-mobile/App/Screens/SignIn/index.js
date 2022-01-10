import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  BackHandler,
  I18nManager,
} from 'react-native';
import {Container, Right, Header, Left, Body} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CheckBox from 'react-native-check-box';
import { validateEmail } from '../../helper/globalFunction';
import { useNavigation } from '@react-navigation/native';

// Screen Styles
import styles from './styles';
import {Images} from '../../Themes';
import { useUser } from '../../store/hooks';

const SignIn_09 = ({navigation}) => {
  
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  
  const {user,userLogin, error} = useUser();
  const { replace } = useNavigation();

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
  }
    const onLoginPress = async () => {
      if (!validateEmail(email)) {
        setEmailError("Please enter valid Email");
      } else if (!password.length) {
        setPasswordError("Please enter valid Password");
      }  else {
        clearErrors();
        const credentials = {
          email : email,
          password : password,
        }

        try{
          const result = await userLogin(credentials);
          if(result){
            replace("Main");
          }else{
            alert(error);
          }
        }catch(error){
          console.log(error);
        }
      }
    }

    return (
      <Container>
        <StatusBar translucent />
        <ImageBackground style={styles.imgContainer} source={require('../../assets/background.png')}>
          <Header style={styles.header}>
            <Left style={styles.left}>
              <TouchableOpacity
                style={styles.backArrow}
                onPress={() => navigation.navigate('Home')}>
                <FontAwesome
                  name={I18nManager.isRTL ? 'angle-right' : 'angle-left'}
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity>
            </Left>
            <Body style={styles.body}>
              <Text style={styles.textTitle}>Sign In</Text>
            </Body>
            <Right style={styles.right} />
          </Header>
          <View>
            <View style={styles.inputFieldSec}>
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                value = {email}
                onChangeText={(val) => setEmail(val)}
                placeholderTextColor="#b7b7b7"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
                keyboardType="email-address"
              />
              {emailError?.length > 0 && <Text style = {styles.errorMessage} >{emailError}</Text>}

              <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                placeholder="Password"
                value={password}
                onChangeText = {(val) => setPassword(val)}
                placeholderTextColor="#b7b7b7"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
                keyboardType="default"
              />
              {emailError?.length > 0 && <Text style = {styles.errorMessage} >{passwordError}</Text>}
              
            </View>
            <View style={styles.chboxConatiner}>
              <CheckBox
                style={styles.chboxRemember}
                onClick={() => setIsChecked(true)}
                isChecked={isChecked}
                checkedImage={
                  <Image
                    source={Images.chbox_selected}
                    style={{height: 22, width: 22}}
                  />
                }
                unCheckedImage={
                  <MaterialIcons
                    name="check-box-outline-blank"
                    size={25}
                    color="#FFF"
                  />
                }
              />

              <Text style={styles.textRememberMe}>Remember me</Text>
              <Right>
                <TouchableOpacity onPress={() => alert('Forgot password')}>
                  <Text style={styles.textForgotPwd}>Forgot password?</Text>
                </TouchableOpacity>
              </Right>
            </View>
            <View style={styles.signInSec}>
              <TouchableOpacity
                style={styles.buttonSignIn}
                onPress={onLoginPress}>
                <Text style={styles.textWhite}>Sign In</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.createAccount}>
              <Text style={styles.textWhite}>Don&apos;t have an account? </Text>
              <TouchableOpacity onPress={() =>navigation.navigate('SignUp')}>
                <Text style={styles.textSignUp}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </Container>
    );
}

export default SignIn_09;
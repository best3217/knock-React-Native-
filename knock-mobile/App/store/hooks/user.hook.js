import { useDispatch, useSelector } from 'react-redux'

import {UserService} from '../../services'
import { LOCAL_STORAGE_KEY } from '../../consts'
import {
  USER_INIT, USER_SUCCESS, USER_FAILED, USER_RESET
} from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../../helper/navigationService';

const { JWT_TOKEN, USER } = LOCAL_STORAGE_KEY;

export const useUser = () => {
  const dispatch = useDispatch();
  const {
    data: user,    
    loading,
    error,
  } = useSelector(({ user }) => user)

  const userLogin = async (email, password) => {
    try {
      if (user) {
        return user
      }

      dispatch({ type: USER_INIT })      
      const { data } = await UserService.login(email, password)
      await AsyncStorage.setItem(JWT_TOKEN, data.token)
      await AsyncStorage.setItem(USER, JSON.stringify(data.user))
      const payload = data.user
      dispatch({ type: USER_SUCCESS, payload })

      return payload
    } catch ({ response, message }) {
      dispatch({
        type: USER_FAILED,
        payload: response?.data?.message || message
      })      
      return false
    }
  }

  const userSignup = async (body) => {
    try {
      if (user) {
        return true
      }
      dispatch({ type: USER_INIT })
      const { data } = await UserService.signup(body);
      await AsyncStorage.setItem(JWT_TOKEN, data.token);
      await AsyncStorage.setItem(USER, JSON.stringify(data.user));
      dispatch({ type: USER_SUCCESS, payload: data.user });
      navigate("SignIn")
      return true;
    } catch ({ response, message }) {
      dispatch({
        type: USER_FAILED,
        payload: response?.data?.message || message
      });
      return false;
    }
  }


  const logout = async () => {
    await Promise.all([
      await AsyncStorage.removeItem(JWT_TOKEN),
      await AsyncStorage.removeItem(USER),
    ])
    dispatch({ type: USER_RESET });
  }

  const updateUser = (payload) => dispatch({ type: USER_SUCCESS, payload });

  const getUser = async () => {
    try {
      const payload = await UserService.getUser()
      dispatch({ type: USER_SUCCESS, payload: payload.data })
    } catch ({ response, message }) {

    }
  }

  const updateProfile = async (data) => {
    try {
      const payload = await UserService.updateProfile(data)
      dispatch({ type: USER_SUCCESS, payload: payload.data })
    } catch(err) {

    }
  }

  return {
    user,
    error,
    loading,
    userLogin,
    logout,
    getUser,
    updateUser,
    userSignup,
    updateProfile,
  }
}

// Initializer
export const initUserFromStorage = async (dispatch) => {
  const saved = await AsyncStorage.getItem(USER);

  if (!saved) {
    return;
  }

  try {
    const payload = await UserService.getUser();
    dispatch({ type: USER_SUCCESS, payload: payload.data });
  } catch(err) {
    await Promise.all([
      await AsyncStorage.removeItem(JWT_TOKEN),
      await AsyncStorage.removeItem(USER),
    ])
    dispatch({ type: USER_RESET });
  }
};

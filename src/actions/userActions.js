import Axios from 'axios';
import Cookie from 'js-cookie';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from '../constants/userConstants';
const qs = require('qs');

const signin = (email, password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
    try {
        const {data} = await Axios.post("https://findcomputer-api.herokuapp.com/user/login", qs.stringify({'email': email, 'password': password}));
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
}

const register = (name, email, password) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {name, email, password}});
    try {
        const {data} = await Axios.post("https://findcomputer-api.herokuapp.com/user/register", qs.stringify({'name': name, 'email': email, 'password': password}));
        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
}

const update = (auth, profile) => async (dispatch) => {
  const form_data = new FormData();
  form_data.append('tokenId', auth.tokenId);
  for(var key in profile){
    form_data.append(key, profile[key]);
  }
  try {
    dispatch({type: USER_UPDATE_REQUEST, payload: profile});
    const {data} = await Axios.put("https://findcomputer-api.herokuapp.com/user/update", form_data);
    Cookie.set('userInfo', JSON.stringify({'tokenId': auth.tokenId, 'data': data}));
    dispatch({type: USER_UPDATE_SUCCESS, payload: data});
  } catch (error) {
    dispatch({type: USER_UPDATE_FAIL, payload: error.message});
  }
}

export { signin, register, update };
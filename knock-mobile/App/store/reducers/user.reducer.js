import {
    USER_INIT, USER_SUCCESS, USER_FAILED, USER_RESET
} from '../types';

const initialState = {
    data: null,
    error: '',
    initialized: false,
    loading: false,    
};

export default function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        case USER_INIT:
            return {
                ...state,
                data: null,
                error: '',
                initialized: true,
                loading: true,                
            };
        case USER_SUCCESS:
            return {
                ...state,
                data: {...state.data, ...payload},
                error: '',
                initialized: true,
                loading: false,
            };
        case USER_FAILED:
            return {
                ...state,
                data: null,
                error: payload,
                initialized: true,
                loading: false,
            };
        case USER_RESET:
            return {
                ...state,
                data: null,
                error: '',
                initialized: false,
                loading: false,
            };        
        default:
            return state;
    }
}
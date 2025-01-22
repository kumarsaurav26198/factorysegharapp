import { ActionTypes } from '../constants/actiontypes';

const initialState = {
    data: [],
    fetchLoading: false,
    addLoading: false,
    updateLoading: false,
    fetchError: null,
    addError: null,
    updateError: null,
    done: null,
};

export const addressReducers = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_USER_ADDRESS_REQUEST:
            return {
                ...state,
                fetchLoading: true,
                fetchError: null,
            };

        case ActionTypes.FETCH_USER_ADDRESS_SUCCESS:
            // console.log("FETCH_USER_ADDRESS_SUCCESS=====>>",JSON.stringify(action,null,2))

            return {
                ...state,
                data: action?.data,
                fetchLoading: false,
                fetchError: null,
            };

        case ActionTypes.FETCH_USER_ADDRESS_FAILURE:
            return {
                ...state,
                fetchLoading: false,
                fetchError: action.error,
            };

        case ActionTypes.ADD_ADDRESS_REQUEST:
            return {
                ...state,
                addLoading: true,
                addError: null,
            };

        case ActionTypes.ADD_ADDRESS_SUCCESS:
            // console.log("ADD_ADDRESS_SUCCESS=====>>",JSON.stringify(action,null,2))
            return {
                ...state,
                addLoading: false,
                data: [...state.data, action?.data?.data],
                addError: null,
                done: true,
            };

        case ActionTypes.ADD_ADDRESS_FAILURE:
            return {
                ...state,
                addLoading: false,
                addError: action.error,
            };

        case ActionTypes.UPDATE_USER_ADDRESS_REQUEST:
            return {
                ...state,
                updateLoading: true,
                updateError: null,
            };

        case ActionTypes.UPDATE_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                data: state.data.map(address => 
                    address._id === action.payload._id ? action.payload : address
                ), // Update the existing address
                updateError: null,
            };

        case ActionTypes.UPDATE_USER_ADDRESS_FAILURE:
            return {
                ...state,
                updateLoading: false,
                updateError: action.error,
            };

        default:
            return state;
    }
};

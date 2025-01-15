import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../store/action/authActions"; 

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(authActions, dispatch); 
};

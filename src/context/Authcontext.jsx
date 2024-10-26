import { createContext,useReducer, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthReducer = (state,action) => {
    switch(action.type){
        case "LOGIN":
            return {user: action.payload}
        case "LOGOUT":
            return {user: null}
        default:
            return state;
        }
}

export const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(AuthReducer,{
        user: null
    });
    const checkUser = async (user) => {
        try {
            const decodedToken = jwtDecode(user?.token.toString());
            if ( user && decodedToken.exp * 1000 > Date.now()) {
                dispatch({ type: "LOGIN", payload: user });
            }else{
                dispatch({type: 'LOGOUT',payload: user});
            }
        } catch (error) {
            console.error(error);
            dispatch({type: 'LOGOUT',payload: user});
        }
    };
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user?.token){
            checkUser(user);
        } else{
            dispatch({type: 'LOGOUT',payload: user});
        }
    },[]);

    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
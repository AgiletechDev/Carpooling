import { types } from "../types/types";

/*--PETICION HTTP SIMULADA--*/
const dataRequest = () => {
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve({
                user:'user@gmail.com',
                pass:'user'
            });
        }, 1000)
    })
}

const asyncCall = async (user, pass) => {
    const result = await dataRequest();
    result.user === user && result.pass === pass ? true : false;
}
/*------------------------------*/

export const authUser = (user, pass) => {
    return (dispatch) => {
        asyncCall(user, pass)
            .then((result)=>{
                result === true ? dispatch(login(user, pass)) : dispatch(logout());
            })
    }
}

const login = (user, pass) => {
    return {
        type:types.login,
        payload:{
            user,
            pass,
        }
    }
}

export const logout = () => {
    return {
        type:types.logout,
        payload:{}
    }
}
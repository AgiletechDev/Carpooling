import { types } from '../types/types';

/*--PETICION HTTP SIMULADA--*/
// const dataRequest = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         user: 'user@gmail.com',
//         pass: 'user',
//       });
//     }, 1000);
//   });
// };

const dataRequest = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        usuario: {
          nombre: 'Username',
          correo: 'user@gmail.com',
          fechaNacimeinto: '',
          rol: 'CONDUCTOR_ROLE',
          estado: true,
          uid: '123',
        },
        token: '123456789',
      });
    }, 1000);
  });
};

const asyncCall = async (user, pass) => {
  const result = await dataRequest();
  return result.user === user && result.pass === pass ? true : false;
};
/*------------------------------*/

export const authUser = (user, pass) => {
  return (dispatch) => {
    asyncCall(user, pass).then((result) => {
      result === true ? dispatch(login(user, pass)) : dispatch(logout());
    });
  };
};

export const startLogin = (email, password) => {
  return async (dispatch) => {
    // const resp = await fetch();
    const resp = await dataRequest();
    // const body = await resp.json();
    localStorage.setItem('token', resp.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(
      login({
        uid: resp.usuario.uid,
        name: resp.usuario.nombre,
      })
    );
  };
};

const login = (user) => {
  return {
    type: types.login,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: types.logout,
  };
};

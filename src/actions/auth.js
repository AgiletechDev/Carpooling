import { fetchSinToken } from '../helpers/fetch';
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

export const startLogin = (correo, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      'auth/login',
      { correo, password },
      'POST'
    );
    const body = await resp.json();
    console.log(body);

    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    dispatch(
      login({
        uid: body.usuario.uid,
        name: body.usuario.nombre,
      })
    );
  };
};

export const startRegister = (values) => {
  return async (dispatch) => {
    const resp = await fetchSinToken('usuarios', values, 'POST');
    const body = await resp.json();
    console.log(body);

    // localStorage.setItem('token', body.token);
    // localStorage.setItem('token-init-date', new Date().getTime());
    // dispatch(
    //   login({
    //     uid: body.usuario.uid,
    //     name: body.usuario.nombre,
    //   })
    // );
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    // const resp = await fetchConToken('auth/renew');
    // const body = await resp.json();
    const body = await dataRequest();

    localStorage.setItem('token', body.token);
    localStorage.setItem('token-init-date', new Date().getTime());
    // dispatch(
    //   login({
    //     uid: body.usuario.uid,
    //     name: body.usuario.nombre,
    //   })
    // );

    dispatch(checkingFinish());

    // if (body.ok) {
    //   localStorage.setItem('token', body.token);
    //   localStorage.setItem('token-init-date', new Date().getTime());
    //   dispatch(
    //     login({
    //       uid: body.uid,
    //       name: body.name,
    //     })
    //   );
    // } else {
    //   dispatch(checkingFinish());
    // }
  };
};

const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

const login = (user) => {
  return {
    type: types.authLogin,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: types.authLogout,
  };
};

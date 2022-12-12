/* eslint-disable no-useless-escape */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { auth, LoginPOST, edit } from '../../actions/actions';

import 'antd/dist/antd.css';
import './loginacc.css';

const LoginAcc = ({ auth, Login, EditART, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    localStorage['auth'] = JSON.stringify(false);
  }, []);

  if (auth) {
    EditART(true);
    return <Navigate to="/" replace />;
  }
  return (
    <div className="login-conteiner">
      <div className="login-title">Sign In</div>

      <form
        className="login-form"
        onSubmit={handleSubmit((data) => {
          Login(data);
          //
        })}
      >
        <label className="login-info">Email addres</label>
        <input
          className="login-info"
          {...register('Emailaddres', {
            required: 'This is required',
            pattern: {
              value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
              message: 'Please enter valid email',
            },
          })}
          placeholder="Email addres"
        />
        <p className="login-info">{errors['Emailaddres']?.message}</p>
        <label className="login-info">Password</label>
        <input
          type="password"
          className="login-info"
          {...register('Password', {
            required: 'This is required',
          })}
          placeholder="Password"
        />
        <p className="login-info">{errors.Password?.message}</p>
        <input className="login-submit" type="submit" value="Login" />
        {error ? <p className="login-info">Invalid login or password</p> : null}
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    slug: state.slug,
    auth: state.auth,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Login: (id) => dispatch(LoginPOST(id)),
    Auth: () => dispatch(auth()),
    EditART: (id) => dispatch(edit(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginAcc);

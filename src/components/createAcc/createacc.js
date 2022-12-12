/* eslint-disable no-useless-escape */
import React from 'react';
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { Checkbox } from 'antd';
import { Navigate } from 'react-router-dom';

import { AuthPOST, check } from '../../actions/actions';

import 'antd/dist/antd.css';
import './createacc.css';

const CreateAcc = ({ Auth, check, Check }) => {
  // const Password = useRef({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    // errors,
    control,
    watch,
  } = useForm();

  // Password.current = watch('Password', '');
  const val = watch();
  check;
  if (check) {
    Check(false);
    return <Navigate to="/sign-up" replace />;
  }
  console.log(errors);

  return (
    <div className="auth-container">
      <div className="auth-title">Create new account</div>
      <form
        className="auth-form"
        onSubmit={handleSubmit((data) => {
          console.log(data);
          // console.log(AuthPOST);
          Auth(data);
        })}
      >
        <label className="auth-info">Username</label>
        <input
          className="auth-info"
          {...register('Username', {
            required: 'This is required',
            minLength: { value: 3, message: 'Your username needs to be at least 3 characters.' },
            maxLength: { value: 20, message: 'Your username needs to be at more  20 characters.' },
          })}
          placeholder="Username"
        />
        <p className="auth-info">{errors.Username?.message}</p>
        <label className="auth-info">Email addres</label>
        <input
          className="auth-info"
          {...register('Emailaddres', {
            pattern: {
              value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
              message: 'Please enter valid email',
            },
          })}
          placeholder="Email addres"
        />
        <p className="auth-info">{errors['Emailaddres']?.message}</p>
        <label className="auth-info">Password</label>
        <input
          className="auth-info"
          type="password"
          // name="Password"
          {...register('Password', {
            required: 'This is required',
            minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
            maxLength: { value: 40, message: 'Your password needs to be at more  40 characters.' },
          })}
          placeholder="Password"
        />
        <p className="auth-info">{errors.Password?.message}</p>
        <label className="auth-info">Repeat Password</label>
        <input
          className="auth-info"
          type="password"
          // name="Repeat"
          {...register('Repeat', { validate: (value) => value === val.Password || 'The passwords do not match' })}
          placeholder="Password"
        />
        {errors.Repeat && <p className="auth-info">{errors.Repeat.message}</p>}
        <div className="auth-info">
          <Controller
            name="checkbox"
            control={control}
            rules={{
              required: 'This is required',
            }}
            render={({ field }) => <Checkbox {...field} />}
          />
          <label className="auth-info"> I agree to the processing of my personal information</label>
        </div>

        <p className="auth-info">{errors.checkbox?.message}</p>
        <input className="auth-submit" type="submit" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    check: state.check,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Auth: (id) => dispatch(AuthPOST(id)),
    Check: (id) => dispatch(check(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateAcc);

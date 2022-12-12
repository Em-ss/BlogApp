/* eslint-disable no-useless-escape */
import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { EditPOST, check } from '../../actions/actions';

import 'antd/dist/antd.css';
import './editacc.css';

const EditAcc = ({ Edit, create }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let token = JSON.parse(localStorage['token']);
  if (create) {
    // Check(false);
    return <Navigate to="/" replace />;
  }

  return (
    <div className="edit-conteiner">
      <div className="edit-title">Edit profile</div>
      <form
        className="edit-form"
        onSubmit={handleSubmit((data) => {
          Edit(data, token);
        })}
      >
        <label className="edit-info">Username</label>
        <input
          className="edit-info"
          {...register('Username', {
            required: 'This is required',
            minLength: { value: 3, message: 'Your username needs to be at least 3 characters.' },
            maxLength: { value: 20, message: 'Your username needs to be at more  20 characters.' },
          })}
          placeholder="Username"
        />
        <p className="edit-info">{errors.Username?.message}</p>
        <label className="edit-info">Email addres</label>
        <input
          className="edit-info"
          {...register('Emailaddres', {
            pattern: {
              value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
              message: 'Please enter valid email',
            },
          })}
          placeholder="Email addres"
        />
        <p className="edit-info">{errors['Emailaddres']?.message}</p>
        <label className="edit-info">New password</label>
        <input
          className="edit-info"
          {...register('Password', {
            required: 'This is required',
            minLength: { value: 6, message: 'Your password needs to be at least 3 characters.' },
            maxLength: { value: 40, message: 'Your password needs to be at more  20 characters.' },
          })}
          placeholder="New password"
        />
        <p className="edit-info">{errors.Password?.message}</p>
        <label className="edit-info">Avatar image</label>
        <input
          className="edit-info"
          {...register('Avatarimage', {
            pattern: {
              value: /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/,
              message: 'Please enter valid email',
            },
          })}
          placeholder="Avatar image"
        />

        <p className="edit-info">{errors.Avatarimage?.message}</p>
        <input type="submit" className="edit-submit" value="Save" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tokeN: state.token,
    create: state.create,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Edit: (id, tok) => dispatch(EditPOST(id, tok)),
    Check: (id) => dispatch(check(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditAcc);

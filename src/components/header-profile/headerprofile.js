import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth, edit } from '../../actions/actions.js';
import './headerprofile.css';

const HeaderProfile = ({ Auth, EditART }) => {
  let user = JSON.parse(localStorage['user']);
  const logOut = () => {
    localStorage.clear();
    localStorage['auth'] = JSON.stringify(false);
    EditART(false);
    Auth();
  };

  const onChange = () => {
    EditART(false);
  };

  return (
    <div className="header-profile">
      <Link to="/">
        <button className="btn-profile btn-profile-logout" onClick={logOut}>
          Log Out
        </button>
      </Link>
      <Link to="/profile">
        <div className="aricle-list-profile">
          <div className="aricle-list-profile-box">
            <div className="aricle-list-profile-name">{user.user.username}</div>
          </div>
          <div className="aricle-list-profile-img">
            <img className="aricle-list-profile-img" src={user.user.image ? user.user.image : '../../img/Logo.png'} />
          </div>
        </div>
      </Link>
      <Link to="/new-article">
        <button className="btn-profile" onClick={onChange}>
          Create article
        </button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    aauth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    Auth: () => dispatch(auth()),
    EditART: (id) => dispatch(edit(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderProfile);

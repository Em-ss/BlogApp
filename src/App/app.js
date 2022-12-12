import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';

import { Header } from '../components/header/header';
import HeaderProfile from '../components/header-profile/headerprofile.js';
import AllLists from '../components/alllists/alllists';
import EditAcc from '../components/editacc/editacc.js';
import { getArticles, auth } from '../actions/actions';
import Article from '../components/article/article.js';
import CreateAcc from '../components/createAcc/createacc';
import LoginAcc from '../components/loginacc/loginacc.js';
import CreateArticle from '../components/createarticle/createarticle.js';
import './app.css';
import 'antd/dist/antd.css';

const App = ({ auth, Auth, loading, loading2, tickets, offset, page }) => {
  useEffect(() => {
    tickets(offset, page);
  }, []);

  if (localStorage.getItem('auth')) {
    Auth();
  }

  const header = auth ? <HeaderProfile></HeaderProfile> : <Header></Header>;

  return (
    <div className="container">
      {header}

      <Routes>
        <Route path="/" element={loading ? <AllLists /> : <Spin tip="Loading..." />}></Route>
        <Route path="/articles" element={loading ? <AllLists /> : <Spin tip="Loading..." />}></Route>
        <Route path="/articles/:id" element={loading2 ? <Article /> : <Spin tip="Loading..." />}></Route>
        <Route path="/sign-in" element={<CreateAcc />}></Route>
        <Route path="/sign-up" element={<LoginAcc />}></Route>
        <Route path="/profile" element={<EditAcc />}></Route>
        <Route path="/new-article" element={<CreateArticle />}></Route>
        <Route path="/articles/:id/edit" element={<CreateArticle />}></Route>
      </Routes>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ticketss: state.articles['articles'],
    check: state.check,
    auth: state.auth,
    loading: state.loading,
    loading2: state.loading2,
    articles: state.articles,
    offset: state.offset,
    page: state.page,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    Auth: () => dispatch(auth()),
    tickets: (offset, page) => dispatch(getArticles(offset, page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

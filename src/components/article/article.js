import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { getArticlesSlug, edit, Deleterticle, modal, getArticles, CreateLike } from '../../actions/actions';
import { Modal } from '../../components/modal/modal.js';
import 'antd/dist/antd.css';
import './article.css';

const Article = ({
  article,
  getArt,
  EditART,
  deleterticle,
  slug,
  auth,
  modalF,
  ModalF,
  tickets,
  offset,
  page,
  like,
}) => {
  const { id } = useParams();
  useEffect(() => {
    console.log('new');
    getArt(id);
  }, []);
  console.log(id);
  let img = article.author.image;
  let date = new Date(article.createdAt);
  let token;
  if (localStorage.getItem('token')) {
    token = JSON.parse(localStorage['token']);
  }
  const onEdit = () => {
    EditART(true);
  };

  const onModal = () => {
    ModalF(!modalF);
  };
  console.log(modalF);
  const onDelete = () => {
    deleterticle(token, slug);
    tickets(offset, page);
  };

  const onLike = () => {
    like(slug, token);
  };

  return (
    <>
      <Modal active={modalF} onDelete={onDelete} onModal={onModal}></Modal>
      <div className="aricle-list">
        <div className="aricle-list-box">
          <div className="aricle-list-box-title">
            <span className="aricle-list-box-title">
              <span>{article.title}</span>
              <div onClick={onLike} className="list-like">
                <span>
                  <img
                    className="list-like-img"
                    src={article.favorited ? '../../img/heart.png' : '../../img/Vector.png'}
                  />
                  {article.favoritesCount}
                </span>
              </div>
            </span>
          </div>

          <div className="aricle-list-box-tag">
            {article.tagList.map((key, id) => {
              return <span key={id}>{key}</span>;
            })}
          </div>
          <div className="aricle-list-box-info">
            <span>{<ReactMarkdown>{article.description}</ReactMarkdown>}</span>
            {auth ? (
              // <Link to={'/'}>
              <button className="article-btn del" onClick={onModal}>
                Delete
              </button>
            ) : // </Link>
            null}
            {auth ? (
              <Link to={`/articles/${id}/edit`}>
                <button className="article-btn edit" onClick={onEdit}>
                  Edit
                </button>
              </Link>
            ) : null}
          </div>
        </div>
        <div className="aricle-list-profile">
          <div className="aricle-list-profile-box">
            <div className="aricle-list-profile-name">{article.author.username}</div>
            <div className="aricle-list-profile-date">{date.toDateString()}</div>
          </div>
          <div className="aricle-list-profile-img">
            <img className="aricle-list-profile-img" src={img} />
          </div>
        </div>
      </div>
      <div className="aricle-description">
        <span>{<ReactMarkdown>{article.body}</ReactMarkdown>}</span>
      </div>
    </>
  );
};

//   return <div>{id}</div>;
// };

const mapStateToProps = (state) => {
  return {
    article: state.article['article'],
    page: state.getPage,
    slug: state.slug,
    auth: state.auth,
    modalF: state.modal,
    offset: state.offset,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getArt: (id) => dispatch(getArticlesSlug(id)),
    EditART: (id) => dispatch(edit(id)),
    deleterticle: (token, slug) => dispatch(Deleterticle(token, slug)),
    ModalF: (check) => dispatch(modal(check)),
    tickets: (offset, page) => dispatch(getArticles(offset, page)),
    like: (slug, token) => dispatch(CreateLike(slug, token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Article);

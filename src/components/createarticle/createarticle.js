import React from 'react';
import { connect } from 'react-redux';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import { CreatePOST, check, EditArticle } from '../../actions/actions';

import 'antd/dist/antd.css';
import './createarticle.css';

const CreateArticle = ({ check, Create, article, Check, edit, editArticle, slug }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: edit
      ? {
          Title: article.title,
          ShortDescription: article.description,
          Text: article.body,
          tagList: article.tagList,
        }
      : null,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });
  if (check) {
    Check();
    return <Navigate to="/" replace />;
  }
  let token = JSON.parse(localStorage['token']);

  let title = edit ? 'Edit article' : 'Create new article';

  return (
    <div className="create-conteiner">
      <div className="create-title">{title}</div>
      <form
        className="create-form"
        onSubmit={handleSubmit((data) => {
          console.log(data);
          // console.log(AuthPOST);
          edit ? editArticle(data, token, slug) : Create(data, token);
        })}
      >
        <label className="create-info">Title</label>
        <input
          className="create-info"
          {...register('Title', {
            required: 'This is required',
            maxLength: { value: 20, message: 'Your username needs to be at more  20 characters.' },
          })}
          placeholder="Title"
        />
        <p className="create-info">{errors.Title?.message}</p>
        <label className="create-info">Short description</label>
        <input
          className="create-info"
          {...register('ShortDescription', {
            required: 'This is required',
          })}
          placeholder="Short description"
        />
        <p className="create-info">{errors['ShortDescription']?.message}</p>
        <label className="create-info">Text</label>
        <textarea
          className="create-info create-text"
          {...register('Text', {
            required: 'This is required',
          })}
          placeholder="Text"
        />
        <p className="create-info">{errors.Text?.message}</p>
        <label className="create-info">Tags</label>
        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
              <Controller render={({ field }) => <input {...field} />} name={`tagList.${index}`} control={control} />
              <button className="btn-delete" type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button className="btn-add" type="button" onClick={() => append(null)}>
          Add tag
        </button>

        <p className="create-info">{errors.checkbox?.message}</p>
        <input className="create-submit" type="submit" value="Send" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    check: state.check,
    article: state.article['article'],
    edit: state.edit,
    slug: state.slug,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Create: (id, token) => dispatch(CreatePOST(id, token)),
    editArticle: (id, token, slug) => dispatch(EditArticle(id, token, slug)),
    Check: () => dispatch(check()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);

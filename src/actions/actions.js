export const check = () => ({ type: 'CHECK', payload: false });
export const edit = (check) => ({ type: 'EDIT_ART', payload: check });
export const modal = (check) => ({ type: 'MODAL', payload: check });

export const auth = () => {
  return async (dispatch) => {
    dispatch({
      type: 'AUTH_CHECK',
      payload: JSON.parse(localStorage['auth']),
    });
  };
};

export const getArticles = (offset, page) => {
  return async (dispatch) => {
    await fetch(`https://blog.kata.academy/api/articles?offset=${offset}&limit=5`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Vse ploxo');
        }
        // console.log(response.json());
        return response.json();
      })
      .then((dat) => {
        // console.log(page);

        dispatch({
          type: 'LOAD_ARTICLES',
          payload: dat,
          loading: true,
          getOffset: offset,
          getPage: page,
        });
      });
  };
};

export const getArticlesSlug = (id) => {
  return async (dispatch) => {
    await fetch(`https://blog.kata.academy/api/articles/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Vse ploxo');
        }
        // console.log(response.json());
        return response.json();
      })
      .then((dat) => {
        // console.log('load');

        dispatch({
          type: 'LOAD_ARTICLE',
          payload2: dat,
          loading2: true,
          getSlug: id,
        });
      });
  };
};

export const AuthPOST = (data) => {
  // console.log('auth');
  return async (dispatch) => {
    await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: data.Username,
          email: data['Emailaddres'],
          password: data.Password,
        },
      }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error('Vse ploxo');
        }
        // console.log(response.json());
        return response.json();
      })
      .then((dat) => {
        // console.log(dat);

        dispatch({
          type: 'AUTH',
          payload: dat,
          check: true,
        });
      });
  };
};
export const LoginPOST = (data) => {
  // console.log('auth');
  return async (dispatch) => {
    await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email: data['Emailaddres'],
          password: data.Password,
        },
      }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          dispatch({
            type: 'ERROR',
            payload: true,
          });
          throw new Error('Vse ploxo');
        }
        // console.log(response.json());
        // console.log(response);
        return response.json();
      })
      .then((dat) => {
        console.log(dat);
        localStorage['user'] = JSON.stringify(dat);
        localStorage['token'] = JSON.stringify(dat.user.token);
        localStorage['auth'] = JSON.stringify(true);
        dispatch({
          type: 'LOGIN',
          payload: dat,
          auth: true,
          error: false,
        });
      });
  };
};

export const EditPOST = (data, token) => {
  // console.log('auth');
  return async (dispatch) => {
    await fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        user: {
          email: data['Emailaddres'],
          password: data.Password,
          username: data.Username,
          // bio: 'string',
          image: data.Avatarimage,
        },
      }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error('Vse ploxo');
        }
        // console.log(response.json());
        return response.json();
      })
      .then((dat) => {
        // console.log(dat);
        localStorage['user'] = JSON.stringify(dat);
        localStorage['token'] = JSON.stringify(dat.user.token);

        dispatch({
          type: 'EDIT',
          payload: dat,
          auth: false,
          create: true,
        });
      });
  };
};

export const CreatePOST = (data, token) => {
  // console.log('auth');
  return async (dispatch) => {
    await fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        article: {
          title: data.Title,
          description: data.ShortDescription,
          body: data.Text,
          tagList: data.tagList,
        },
      }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error('Vse ploxo');
        }
        // console.log(response.json());
        return response.json();
      })
      .then((dat) => {
        console.log(dat);
        // localStorage['user'] = JSON.stringify(dat);
        // localStorage['token'] = JSON.stringify(dat.user.token);
        dispatch({
          type: 'CREATE',
          payload: true,
        });
      });
  };
};

export const EditArticle = (data, token, slug) => {
  // console.log('auth');
  return async (dispatch) => {
    await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        article: {
          title: data.Title,
          description: data.ShortDescription,
          body: data.Text,
          tagList: data.tagList,
        },
      }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error('Vse ploxo');
        }
        // console.log(response.json());
        return response.json();
      })
      .then((dat) => {
        console.log(dat);
        // localStorage['user'] = JSON.stringify(dat);
        // localStorage['token'] = JSON.stringify(dat.user.token);
        dispatch({
          type: 'EDIT_ARTICLE',
          payload: true,
        });
      });
  };
};

export const Deleterticle = (token, slug) => {
  // console.log('auth');
  return async (dispatch) => {
    await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      // body: JSON.stringify({
      //   article: {
      //     title: data.Title,
      //     description: data.ShortDescription,
      //     body: data.Text,
      //     tagList: data.tagList,
      //   },
      // }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error('Vse ploxo');
        }
        // console.log(response.json());
        return response.json();
      })
      .then((dat) => {
        console.log(dat);
        // localStorage['user'] = JSON.stringify(dat);
        // localStorage['token'] = JSON.stringify(dat.user.token);
        dispatch({
          type: 'DELETE_ARTICLE',
          payload: true,
        });
      });
  };
};

export const CreateLike = (slug, token) => {
  // console.log('auth');
  return async (dispatch) => {
    await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error('Vse ploxo');
        }
        // console.log(response.json());
        return response.json();
      })
      .then((dat) => {
        console.log(dat);
        // localStorage['user'] = JSON.stringify(dat);
        // localStorage['token'] = JSON.stringify(dat.user.token);
        dispatch({
          type: 'LIKE',
          payload: dat,
        });
      });
  };
};

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';

import { getArticles, getArticlesSlug } from '../../actions/actions';
import List from '../list/list';
import './alllist.css';

const AllLists = ({ tickets, ticketss = [], offset, page }) => {
  useEffect(() => {
    console.log('use');
    tickets(offset, page);
    // getArt(slug);
    // console.log(ticketss);
  }, []);

  const onChange = (page) => {
    tickets(page * 5 - 5, page);
  };
  console.log(tickets);

  let elements = ticketss.map((item) => {
    return <List key={item.slug} item={item} />;
  });

  console.log(page);

  // console.log(articles);
  // return <div>2</div>;
  return (
    <>
      <div>{elements}</div>
      <div className="pagination">
        <Pagination current={page} onChange={onChange} total={50} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ticketss: state.articles['articles'],
    offset: state.offset,
    slug: state.slug,
    page: state.page,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    tickets: (offset, page) => dispatch(getArticles(offset, page)),
    getArt: (id) => dispatch(getArticlesSlug(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllLists);

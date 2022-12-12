import React from 'react';
import { Link } from 'react-router-dom';

import './modal.css';

export const Modal = ({ active, onDelete, onModal }) => {
  console.log(active);

  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => {
        onModal();
      }}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p className="modal-label">Are you sure to delete this article?</p>
        <button
          className="modal-btn"
          onClick={() => {
            onModal();
          }}
        >
          No
        </button>
        <Link to={'/'}>
          <button
            className="modal-btn"
            onClick={() => {
              // onModal();
              onDelete();
            }}
          >
            Yes
          </button>
        </Link>
      </div>
    </div>
  );
};

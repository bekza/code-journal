import '../App.css';
import React from 'react';

function Entries({ state, onEdit, handleDelete }) {
  return (
    <div className='entries'>
      {state.length === 0 ? (
        <p className='no-entries'>Please add a new entry...</p>
      ) : (
        <p>List of entries</p>
      )}
      <ul>
        {state.map((entry) => {
          const { title, image, description, entryId } = entry;
          return (
            <li key={entryId} data-id={entryId}>
              <div className='img-wrapper'>
                <img src={image} alt={title} />
              </div>
              <div className='entry-content'>
                <h3>{title}</h3>
                <p className='content-description'>{description}</p>
                <div className='content-footer'>
                  <button
                    className='delete-btn'
                    onClick={() => {
                      handleDelete(entryId);
                    }}
                  >
                    Delete entry
                  </button>
                  <button className='edit' onClick={() => onEdit(entryId)}>
                    Edit
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Entries;

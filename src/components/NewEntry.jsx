import '../App.css';

import React from 'react';

function NewEntry({ form, onSubmit, handleChange }) {
  const { title, image, description } = form;

  const saveBtnEnabled =
    title.length > 0 && image.length > 0 && description.length > 0;
  return (
    <>
      <h3>Add a new entry</h3>
      <div className='container'>
        <div className='img'>
          {form.image ? (
            <img src={form.image} alt={title} />
          ) : (
            'Your image will appear here.'
          )}
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            required
            value={title}
            type='text'
            name='title'
            placeholder='Title'
            onChange={(e) => handleChange(e)}
          />
          <input
            required
            value={image}
            type='text'
            name='image'
            placeholder='Image Url'
            onChange={(e) => handleChange(e)}
          />
          <textarea
            value={description}
            required
            name='description'
            placeholder='Description'
            cols='30'
            rows='10'
            onChange={(e) => handleChange(e)}
          ></textarea>
          <footer>
            <button
              className={`save ${saveBtnEnabled ? '' : 'save-btn-disabled'}`}
              type='submit'
              disabled={!saveBtnEnabled}
            >
              Save
            </button>
          </footer>
        </form>
      </div>
    </>
  );
}

export default NewEntry;

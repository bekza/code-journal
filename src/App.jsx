import './App.css';
import React, { useState, useEffect } from 'react';
import Entries from './components/Entries';
import NewEntry from './components/NewEntry';
import { defaultState } from './components/defaultState';

export const initialState = {
  title: '',
  image: '',
  description: '',
  entryId: 0,
};

function App() {
  const [currentView, setCurrentView] = useState(() => {
    const stickyView = JSON.parse(localStorage.getItem('currentView'));
    if (!stickyView) return 'entries';
    return stickyView;
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState('');
  const [form, setForm] = useState(initialState);

  const [state, setState] = useState(() => {
    const stickyValue = JSON.parse(localStorage.getItem('items'));
    if (!stickyValue) return defaultState;
    return stickyValue;
  });

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(state));
    localStorage.setItem('currentView', JSON.stringify(currentView));
  }, [state, currentView]);

  function handleSubmit(e) {
    e.preventDefault();
    let exists = state.some((item) => item.entryId === form.entryId);

    if (exists === false) {
      const newEntry = {
        ...form,
        entryId: state.title + '_' + state.length + 1,
      };
      setState([newEntry, ...state]);
    } else {
      const updateState = state.map((item) => {
        if (item.entryId === form.entryId) {
          return form;
        } else return item;
      });
      setState(updateState);
    }
    setCurrentView('entries');
  }
  function handleEdit(entryId) {
    for (let i = 0; i < state.length; i++) {
      if (state[i].entryId === entryId) {
        console.log('state[i] 0<', state[i]);
        setForm(state[i]);
      }
    }
    setCurrentView('new-entry');
  }

  function handleItemToDelete(entryId) {
    setShowDeleteModal(true);
    setItemToDeleteId(entryId);
  }

  function handleConfirmDelete() {
    if (itemToDeleteId) {
      const updateState = state.filter(
        (item) => item.entryId !== itemToDeleteId
      );
      setState(updateState);
      setShowDeleteModal(false);
    } else {
      alert('Entry not found');
    }
  }

  function handleChange(e) {
    e.preventDefault();
    const input = e.target.name;
    setForm({ ...form, [input]: e.target.value });
  }

  const itemTitleToDelete = state.find(
    (item) => item.entryId === itemToDeleteId
  )?.title;

  return (
    <div className='App'>
      <div className='header'>
        <h1>Code Journal</h1>
        <div>
          <button
            className='add-new-btn'
            onClick={() => {
              setForm(initialState);
              setCurrentView('new-entry');
            }}
          >
            Add New
          </button>
          <button
            className='entries-btn'
            onClick={() => setCurrentView('entries')}
          >
            Entries
          </button>
        </div>
      </div>
      {currentView === 'entries' ? (
        <Entries
          showDeleteModal={showDeleteModal}
          state={state}
          onEdit={handleEdit}
          setCurrentView={setCurrentView}
          setForm={setForm}
          setShowDeleteModal={setShowDeleteModal}
          handleDelete={handleItemToDelete}
        />
      ) : (
        <NewEntry
          form={form}
          handleChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
      {showDeleteModal && (
        <div className='modal-container'>
          <div className='modal-dialog'>
            <p>
              Are you sure you want to delete <b>{itemTitleToDelete}</b>?
            </p>
            <div className='modal-buttons'>
              <button
                className='modal-button modal-button-yes'
                onClick={() => handleConfirmDelete()}
              >
                Yes
              </button>
              <button
                className='modal-button modal-button-cancel'
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

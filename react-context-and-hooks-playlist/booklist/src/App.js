import React from 'react';
import BookContextProvider from './contexts/BookContext';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import ReducerTest from './components/ReducerTest';

function App() {
  return (
    <div className="App">
      <BookContextProvider>
        <Navbar/>
        <BookList/>
        <BookForm/>
        <ReducerTest/>
      </BookContextProvider>
    </div>
  );
}

export default App;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Pokemon } from './src/components/Pokemon/Pokemon';
import { MainPage } from './src/components/MainPage/MainPage';
import './public/sass/main.scss';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/:title" element={<Pokemon />}/>
      </Routes>
    </div>
  );
}
export default App;

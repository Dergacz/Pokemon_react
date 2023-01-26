import React from 'react';
import { MainPage } from './src/components/MainPage/MainPage';
import { Route, Routes } from 'react-router-dom';
import './public/sass/main.scss';
import Pokemon from './src/components/Pokemon/Pokemon';

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

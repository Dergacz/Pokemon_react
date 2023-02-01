import React, { FC } from 'react';
import logo from '../../../public/images/Pokeball.png';

export const Header: FC = () => {
  return (
    <div className="header-wrapper">
      <img 
        className="header-logo"
        src={logo} 
        alt="logo"
      />
      <h1 className="header-title">Pokedex</h1>
    </div>
  );
};

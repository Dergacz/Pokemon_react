import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import arrowLogo from '../../../public/images/arrow.png';

const Pokemon: FC = () => {
  const { title } = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="pokemon-container">
      <div className="pokemon-header">
        <div>
          <img
            className="pokemon-arrow"
            src={arrowLogo}
            alt="back-arrow"
            width={16}
            height={16}
            onClick={goBack}
          />
          <span className="pokemon-name">{title}</span>
        </div>
        <span className="pokemon-id">#001</span>
      </div>
      <img
        className="pokemon-img"
        src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"
        alt="pokemon"
      />
      <div className="pokemon-stats">
        <div className="pokemon-spell">
          <span className="pokemon-spell-name">fire</span>
        </div>
        <h3 className="pokemon-about-title">About</h3>
        <div className="pokemon-about-wrapper">
          <div>
            <p>8 kg</p>
            <p className="pokemon-about-subtitle">Weight</p>
          </div>
          <div>
            <p>0.6 m</p>
            <p className="pokemon-about-subtitle">Height</p>
          </div>
          <div>
            <p>Mega-Punch</p>
            <p className="pokemon-about-subtitle">Movies</p>
          </div>
        </div>
        <p className="pokemon-description">
          It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.
        </p>
      </div>
    </div>
  );
};

export default Pokemon;

import React from "react";
import '../styles/playerData.css';
import {SHIPS, WEAPONS} from '../constants/settings.js';
import {Hitpoints} from './Hitpoints'
import {findElapsedTime} from '../helpers/gameLogic.js';

const renderLives = (currentPlayer) => {
  if (currentPlayer.shipIndex || currentPlayer.shipIndex === 0) {
    let count = currentPlayer.lives;
    let image = SHIPS[currentPlayer.shipIndex].image
    let ships = [];
    while (count > 0) {
      ships.push(
        <img className="playerLivesShip"
          src={image}
          alt="ship"
          key={`life${count}`}
        />
      );
      count -= 1;
    };
    return ships;
  }
}

const renderWeapon = (weaponIndex) => {
  if (weaponIndex) {
    return (
      <img
        className="playerInfoWeapon"
        src={WEAPONS[weaponIndex].selectionImage}
        alt="weapon"
      />
    )
  }
}

const renderArmor = (shipIndex) => {
  if (shipIndex || shipIndex === 0) {
    return (
      <div className="playerInfo">
        {`Armor: ${SHIPS[shipIndex].armor}`}
      </div>
    );
  }
}

const renderData = (type, value) => {
  if (value >= 0) {
    return (
      <div className="playerInfo">{`${type}: ${value}`}</div>
    );
  }
}

const handleWaitTime = (currentPlayer, countDown) => {
  if (countDown > 0) {
    return <span className="waitCountDown">{countDown}</span>;
  } else {
    return <img className="playerImage" src={`https://robohash.org/${currentPlayer.id}`} alt="player"/>;
  };
}

const renderHitPoints = (currentPlayer) => {
  if (currentPlayer.hitpoints > 0) {
    return (
      <Hitpoints
        hitpoints={currentPlayer.hitpoints}
        maxHitpoints={currentPlayer.maxHitpoints}
      />
    );
  }
};

const renderShopButton = (lastEvent, updateState, showSelectionModal) => {
  if (['waiting', 'remove'].includes(lastEvent) && !showSelectionModal) {
    return <div className="shopButton" onClick={() => updateState({showSelectionModal: true})}>Shop</div>
  } else {
    return null;
  }
}

const PlayerData = ({currentPlayer, clockDifference, updateState, showSelectionModal}) => {
  const elapsedSeconds = findElapsedTime(clockDifference, currentPlayer.updatedAt) / 1000;
  let countDown = 0;
  if (currentPlayer.explode && elapsedSeconds < 10) {
    countDown = Math.round(10 - elapsedSeconds);
  } else {
    if (currentPlayer.explode) {
      const waitingPlayer = {...currentPlayer, explode: false, lastEvent: 'waiting'};
      updateState({waitingPlayer: waitingPlayer});
    };
  };

  if (currentPlayer.id) {
    return (
      <div className={`playerData column ${currentPlayer.explode ? 'waiting' : ''}`}>
        <div className="row">
          {handleWaitTime(currentPlayer, countDown)}
          {renderData('Gold', currentPlayer.gold)}
          {renderLives(currentPlayer)}
          {renderHitPoints(currentPlayer)}
          {renderWeapon(currentPlayer.weaponIndex)}
          {renderArmor(currentPlayer.shipIndex)}
          {renderData('Score', currentPlayer.score)}
          {renderShopButton(currentPlayer.lastEvent, updateState, showSelectionModal)}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default PlayerData;

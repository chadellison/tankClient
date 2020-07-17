import React from "react";
import '../styles/playerData.css';
import {WEAPONS} from '../constants/weapons.js';
import {UPGRADES} from '../constants/upgrades.js';
import goldIcon from "../images/gold.png";
import {Hitpoints} from './Hitpoints';
import {PlayerItems} from './PlayerItems';
import {PlayerStat} from './PlayerStat';
import {ShipIcon} from './ShipIcon';
import {AbilityIcon} from './AbilityIcon';
import {SHIPS} from '../constants/ships';
import {round} from '../helpers/mathHelpers';

const renderShip = (activePlayer) => {
  if (activePlayer.shipIndex || activePlayer.shipIndex === 0) {
    return <ShipIcon shipIndex={activePlayer.shipIndex} team={activePlayer.team} className={'playerShip'}/>
  };
}

const renderWeapon = (weaponIndex) => {
  if (weaponIndex || weaponIndex === 0) {
    return (
      <img
        className="playerInfoWeapon"
        src={WEAPONS[weaponIndex].selectionImage}
        alt="weapon"
      />
    )
  }
}

const renderArmor = (player) => {
  if (player.armor >= 0) {
    let modifier;
    if (player.effects[8]) {
      modifier = '+4';
    }
    return (
      <PlayerStat
        image={UPGRADES[0].image}
        alt={'shield'}
        value={player.armor}
        className="statInfo"
        modifier={modifier}
      />
    )
  }
}
const renderSpeed = (player) => {
  if (player.velocity) {
    let modifier;
    if (player.effects[2]) {
      modifier = '-' + (player.velocity - 1).toString()
    } else if (player.effects[9]) {
      modifier = '+4';
    }
    return (
      <PlayerStat
        image={UPGRADES[2].image}
        alt={'speedometer'}
        value={player.velocity}
        className="statInfo"
        modifier={modifier}
      />
    )
  }
}

const handlePlayerIcon = (activePlayer, countDown) => {
  if (countDown > 0) {
    return <span className="waitCountDown">{countDown}</span>;
  } else {
    return <img className="playerImage" src={`https://robohash.org/${activePlayer.index}?color=${activePlayer.team}`} alt="player"/>;
  };
}

const renderHitPoints = (activePlayer) => {
  if (activePlayer.hitpoints > 0) {
    return (
      <Hitpoints
        hitpoints={activePlayer.hitpoints}
        maxHitpoints={activePlayer.maxHitpoints}
      />
    );
  }
};

const renderAbilityIcon = (activePlayer, abilityUsedAt) => {
  if (activePlayer.shipIndex === 0 || activePlayer.shipIndex) {
    return (
      <AbilityIcon ability={SHIPS[activePlayer.shipIndex].ability}
        abilityUsedAt={abilityUsedAt}/>
    );
  }
};

const PlayerData = ({activePlayer, clockDifference, updateState, defenseData, abilityUsedAt}) => {
  const elapsedSeconds = (Date.now() + clockDifference - activePlayer.explodedAt) / 1000;
  let countDown = 0;
  if (!activePlayer.active && elapsedSeconds < 10) {
    countDown = round(10 - elapsedSeconds);
  }

  const {gold, damage} = activePlayer;
  return (
    <div className={`playerData column ${!activePlayer.active ? 'waiting' : ''}`}>
      <div className="row">
        {activePlayer.updatedAt && handlePlayerIcon(activePlayer, countDown)}
        <div className="nameInfo">{activePlayer.name}</div>
        {gold >= 0 && <PlayerStat image={goldIcon} alt={'gold'} value={gold} className="goldInfo"/>}
        {renderHitPoints(activePlayer)}
        {activePlayer.updatedAt && renderShip(activePlayer)}
        {renderWeapon(activePlayer.weaponIndex)}
        {renderAbilityIcon(activePlayer, abilityUsedAt)}
        {damage > 0 && <PlayerStat image={UPGRADES[3].image} alt={'target'} value={damage} className="statInfo"/>}
        {renderArmor(activePlayer)}
        {renderSpeed(activePlayer)}
        <div className="ScoreInfo">{`Score: ${activePlayer.score}`}</div>
        <PlayerItems items={activePlayer.items} />
        <div className="defenseData">Defenses</div>
        <div className="redDefenseData">{defenseData.red}</div>
        <div className="blueDefenseData">{defenseData.blue}</div>
      </div>
    </div>
  );
}

export default PlayerData;

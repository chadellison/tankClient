import {round} from '../helpers/mathHelpers.js';

export const addPlayer = (userId, players) => {
  return {
    modal: 'nameForm',
    currentPlayer: {
      id: userId,
      gold: handleStartingGold(players),
      gameEvent: 'waiting',
      score: 0,
      items: {},
      effects: {},
      type: 'human',
      accelerate: false,
      lastAccelerationTime: 0,
      kills: 0,
      rotate: 'none',
      explode: false,
      explodeAnimation: {}
    }
  };
}

const handleStartingGold = (players) => {
  if (players.length > 0) {
    const scoreSums = players.filter((player) => player.type === 'human').reduce((accumulator, player) => {
      return accumulator + player.score
    }, 0);
    return round((scoreSums / players.length) + 1000);
  } else {
    return 1000;
  }
}

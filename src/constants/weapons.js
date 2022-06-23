// weapons
import fireballAnimation from '../images/fireballAnimation.png';
import displayFireball from '../images/displayFireball.png';
import missile from '../images/missile.png';
import displayMissile from '../images/displayMissile.png';
import trifecta from '../images/trifecta.png';
import displayTrifecta from '../images/displayTrifecta.png';
import poisonCannonAnimation from '../images/poisonCannonAnimation.png';
import displayPoisonCannon from '../images/displayPoisonCannon.png';
import bomb from '../images/bomb.png';
import displayBomb from '../images/displayBomb.png';
import laserAnimation from '../images/laserAnimation.png';
// import laser from '../images/laser.png';
import displayLaser from '../images/displayLaser.png';
import displayBlueFire from '../images/displayBlueFire.png';
import plasmaCannonAnimation from '../images/plasmaCannonAnimation.png';
import displayPlasmaCannon from '../images/displayPlasmaCannon.png';
import spaceMine from '../images/spaceMine.png';
import nuclearExplosionAnimation from '../images/nuclearExplosionAnimation.png';
import mineExplosionAnimation from '../images/mineExplosionAnimation.png';
import nuclearBlastAnimation from '../images/nuclearBlastAnimation.png';
import shipExplosionAnimation from '../images/shipExplosionAnimation.png';
import stunGunAnimation from '../images/stunGunAnimation.png';
import meteorShowerAnimation from '../images/meteorShowerAnimation.png';
import piercerAnimation from '../images/piercerAnimation.png';
import electricFieldAnimation from '../images/redEnergyAnimation.png';
// import electricFieldAnimation from '../images/electricFieldAnimation.png';
import redMeteorAnimation from '../images/redMeteorAnimation.png';
import meteorExplosionAnimation from '../images/meteorExplosionAnimation.png';
import coldShotAnimation from '../images/coldShotAnimation.png';

import cannonAudio from '../audio/cannon.wav';
import missileAudio from '../audio/missile2.wav';
import trifectaAudio from '../audio/trifecta.wav';
import bombAudio from '../audio/bomb.wav';
import plasmaCannonAudio from '../audio/plasmaSound.wav';
import laserAudio from '../audio/laser.wav';
import lightLazer from '../audio/lightLazer.mp3';
import mediumLaser from '../audio/mediumLaser.wav';

const AUDIO = [
  cannonAudio,
  missileAudio,
  bombAudio,
  laserAudio,
  trifectaAudio,
  lightLazer,
  plasmaCannonAudio,
  mediumLaser
].map((audio) => {
  const audioObject = new Audio(audio);
  audioObject.volume = 0.2;
  return audioObject;
});

export const WEAPONS = [
  {
    index: 0,
    name: 'fireball',
    location: {x: 0, y: 0},
    trajectory: 0,
    cooldown: 300,
    speed: 18,
    damage: 60,
    price: 60,
    width: 80,
    height: 40,
    damageRadius: 2,
    ability: 'none',
    sound: AUDIO[0],
    selectionImage: displayFireball,
    animation: {
      coordinates: {x: 0, y: 0},
      spriteImage: fireballAnimation,
      width: 128,
      height: 64,
      rowCount: 4,
      columnCount: 2,
      rate: 1,
      startRate: 1,
      renderWidth: 80,
      renderHeight: 40,
      xOffset: 0,
      yOffset: 0
    }
  },
  {
    index: 1,
    name: 'missile',
    location: {x: 0, y: 0},
    trajectory: 0,
    cooldown: 500,
    speed: 20,
    damage: 100,
    price: 200,
    width: 50,
    height: 46,
    damageRadius: 3,
    ability: 'none',
    sound: AUDIO[1],
    image: missile,
    selectionImage: displayMissile
  },
  {
    index: 2,
    name: 'bomb',
    location: {x: 0, y: 0},
    trajectory: 0,
    cooldown: 800,
    speed: 14,
    damage: 220,
    price: 400,
    width: 50,
    height: 29,
    damageRadius: 3,
    image: bomb,
    ability: 'none',
    sound: AUDIO[2],
    selectionImage: displayBomb
  },
  {
    index: 3,
    name: 'laser',
    location: {x: 0, y: 0},
    trajectory: 0,
    cooldown: 300,
    speed: 24,
    damage: 135,
    price: 950,
    width: 75,
    height: 45,
    damageRadius: 2,
    ability: 'energy steal: 15% of damage dealt will be added to your hitpoints',
    sound: AUDIO[3],
    selectionImage: displayLaser,
    animation: {
      coordinates: {x: 0, y: 0},
      spriteImage: laserAnimation,
      width: 128,
      height: 72,
      rowCount: 5,
      columnCount: 3,
      rate: 1,
      startRate: 1,
      renderWidth: 75,
      renderHeight: 45,
      xOffset: 0,
      yOffset: 0
    }
  },
  {
    index: 4,
    name: 'trifecta',
    location: {x: 0, y: 0},
    trajectory: 0,
    cooldown: 300,
    speed: 24,
    damage: 100,
    price: 1300,
    width: 32,
    height: 32,
    damageRadius: 2,
    ability: 'critical damage: 20% chance to do double damage',
    image: trifecta,
    sound: AUDIO[4],
    selectionImage: displayTrifecta
  },
  {
    index: 5,
    name: 'poisonCannon',
    location: {x: 0, y: 0},
    trajectory: 0,
    cooldown: 400,
    speed: 22,
    damage: 80,
    price: 1000,
    width: 100,
    height: 50,
    damageRadius: 6,
    ability: 'poison damage: drains 17% of opponent\'s total hitpoints over 3 seconds',
    sound: AUDIO[5],
    selectionImage: displayPoisonCannon,
    animation: {
      coordinates: {x: 0, y: 0},
      spriteImage: poisonCannonAnimation,
      width: 128,
      height: 64,
      rowCount: 1,
      columnCount: 6,
      rate: 1,
      startRate: 1,
      renderWidth: 100,
      renderHeight: 50,
      xOffset: 0,
      yOffset: 0
    }
  },
  {
    index: 6,
    name: 'blueFire',
    location: {x: 0, y: 0},
    trajectory: 0,
    cooldown: 350,
    speed: 18,
    damage: 80,
    price: 300,
    width: 80,
    height: 40,
    damageRadius: 5,
    ability: 'cold damage: significanlty slows enemy speed for two seconds',
    sound: AUDIO[6],
    selectionImage: displayBlueFire,
    animation: {
      coordinates: {x: 0, y: 0},
      spriteImage: coldShotAnimation,
      width: 128,
      height: 64,
      rowCount: 4,
      columnCount: 2,
      rate: 1,
      startRate: 1,
      renderWidth: 80,
      renderHeight: 40,
      xOffset: 0,
      yOffset: 0
    }
  },
  {
    index: 7,
    name: 'plasmaCannon',
    location: {x: 0, y: 0},
    trajectory: 0,
    cooldown: 450,
    speed: 18,
    damage: 130,
    price: 750,
    width: 100,
    height: 50,
    damageRadius: 6,
    ability: 'armor piercing damage: disregards all armor on enemy ship',
    sound: AUDIO[7],
    selectionImage: displayPlasmaCannon,
    animation: {
      coordinates: {x: 0, y: 0},
      spriteImage: plasmaCannonAnimation,
      width: 128,
      height: 64,
      rowCount: 1,
      columnCount: 5,
      rate: 1,
      startRate: 1,
      renderWidth: 100,
      renderHeight: 50,
      xOffset: 0,
      yOffset: 0
    }
  }
];

export const ABILITY_WEAPONS = [
  {
    id: 1,
    name: 'nuclearBlast',
    location: {x: 0, y: 0},
    trajectory: 0,
    speed: 7,
    width: 96,
    height: 48,
    damage: 300,
    animation: {
      coordinates: {x: 0, y: 0},
      spriteImage: nuclearBlastAnimation,
      width: 128,
      height: 64,
      rowCount: 4,
      columnCount: 2,
      rate: 1,
      startRate: 1,
      renderWidth: 80,
      renderHeight: 40,
      xOffset: 0,
      yOffset: 0,
    }
  },
  {
    id: 2,
    name: 'stunGun',
    location: {x: 0, y: 0},
    trajectory: 0,
    speed: 14,
    width: 240,
    height: 120,
    damage: 230,
    damageRadius: 24,
    animation: {
      coordinates: {x: 0, y: 0},
      spriteImage: stunGunAnimation,
      width: 128,
      height: 64,
      rowCount: 4,
      columnCount: 2,
      rate: 1,
      renderWidth: 240,
      renderHeight: 120,
      startRate: 1,
      xOffset: 0,
      yOffset: 0,
    }
  },
  {
    id: 3,
    name: 'spaceMine',
    location: {x: 0, y: 0},
    trajectory: 0,
    speed: 0,
    width: 100,
    height: 100,
    damageRadius: 30,
    damage: 400,
    image: spaceMine
  },
  {
    id: 4,
    name: 'meteorShower',
    location: {x: 0, y: 0},
    trajectory: 0,
    speed: 10,
    width: 30,
    height: 30,
    damageRadius: 5,
    damage: 200,
    animation: {
      coordinates: {x: 0, y: 0},
      spriteImage: meteorShowerAnimation,
      width: 128,
      height: 64,
      rowCount: 1,
      columnCount: 5,
      rate: 1,
      renderWidth: 150,
      renderHeight: 75,
      startRate: 1,
      xOffset: 0,
      yOffset: 0,
    }
  },
  {
    id: 5,
    name: 'piercer',
    location: {x: 0, y: 0},
    trajectory: 0,
    speed: 14,
    width: 270,
    height: 135,
    damage: 80,
    damageRadius: 6,
    animation: {
      coordinates: {x: 0, y: 0},
      spriteImage: piercerAnimation,
      width: 128,
      height: 64,
      rowCount: 4,
      columnCount: 2,
      rate: 1,
      renderWidth: 270,
      renderHeight: 135,
      startRate: 1,
      xOffset: 0,
      yOffset: 0,
    }
  },
  {
    id: 6,
    name: 'electricField',
    location: {x: 0, y: 0},
    trajectory: 0,
    speed: 0,
    width: 400,
    height: 225,
    damageRadius: 200,
    damage: 1,
    animation: {
      coordinates: {x: 0, y: 0},
      spriteImage: electricFieldAnimation,
      width: 400,
      height: 225,
      renderWidth: 400,
      renderHeight: 225,
      rowCount: 89,
      columnCount: 1,
      rate: 0,
      startRate: 0,
      xOffset: 0,
      yOffset: 0,
    }
  },
  {
    id: 7,
    name: 'redMeteor',
    location: {x: 0, y: 0},
    trajectory: 0,
    speed: 20,
    width: 90,
    height: 45,
    damageRadius: 15,
    damage: 100,
    animation: {
      coordinates: {x: 0, y: 0},
      spriteImage: redMeteorAnimation,
      width: 128,
      height: 64,
      renderWidth: 90,
      renderHeight: 45,
      rowCount: 4,
      columnCount: 2,
      rate: 0,
      startRate: 0,
      xOffset: 0,
      yOffset: 0,
    }
  },
]

export const EXPLOSION_ANIMATIONS = [
  {
    id: 1,
    name: 'spaceMineExplosion',
    location: {x: 0, y: 0},
    coordinates: {x: 0, y: 0},
    spriteImage: mineExplosionAnimation,
    width: 256,
    height: 256,
    rowCount: 36,
    columnCount: 1,
    rate: 0,
    startRate: 0,
    xOffset: -100,
    yOffset: -100,
    renderWidth: 200,
    renderHeight: 200,
  },
  {
    id: 2,
    name: 'nuclearExplosion',
    location: {x: 0, y: 0},
    coordinates: {x: 0, y: 0},
    spriteImage: nuclearExplosionAnimation,
    width: 256,
    height: 256,
    rowCount: 36,
    columnCount: 1,
    rate: 0,
    startRate: 0,
    xOffset: -500,
    yOffset: -500,
    renderWidth: 1000,
    renderHeight: 1000,
  },
  {
    id: 3,
    name: 'shipExplosion',
    location: {x: 0, y: 0},
    coordinates: {x: 0, y: 0},
    spriteImage: shipExplosionAnimation,
    width: 256,
    height: 256,
    rowCount: 36,
    columnCount: 1,
    rate: 0,
    startRate: 0,
    xOffset: -50,
    yOffset: -50,
    renderWidth: 200,
    renderHeight: 200,
  },
  {
    id: 4,
    name: 'meteorExplosion',
    location: {x: 0, y: 0},
    coordinates: {x: 0, y: 0},
    spriteImage: meteorExplosionAnimation,
    width: 256,
    height: 256,
    rowCount: 4,
    columnCount: 6,
    rate: 0,
    startRate: 0,
    xOffset: -100,
    yOffset: -100,
    renderWidth: 200,
    renderHeight: 200,
  },
]

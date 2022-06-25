import React from 'react';
import {
  drawShip,
  shouldRenderShip,
  renderPlayerData,
  renderAnimation,
  handleInvisibleFilter,
  renderWeapon,
  renderMotherShipData
} from '../helpers/canvasHelper.js';
import { findCenterCoordinates, findStartCenter } from '../helpers/gameLogic';
import '../styles/styles.css';
import {round} from '../helpers/mathHelpers.js';
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  GAME_ANIMATIONS,
} from '../constants/settings.js';
import {MOTHER_SHIP, SHIPS, SUPPLY_SHIP} from '../constants/ships.js';
import {WEAPONS, ABILITY_WEAPONS, EXPLOSION_ANIMATIONS} from '../constants/weapons.js';
import {GAME_EFFECTS, SPRITE_IMAGES} from '../constants/effects.js';

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    // ships
    this.hunter = React.createRef();
    this.hunterBlue = React.createRef();
    this.destroyer = React.createRef();
    this.destroyerBlue = React.createRef();
    this.warrior = React.createRef();
    this.warriorBlue = React.createRef();
    this.cruiser = React.createRef();
    this.cruiserBlue = React.createRef();
    this.carrier = React.createRef();
    this.carrierBlue = React.createRef();
    this.stealth = React.createRef();
    this.stealthBlue = React.createRef();
    this.supplyShip = React.createRef();

    // weapons
    this.fireball = React.createRef();
    this.missile = React.createRef();
    this.trifecta = React.createRef();
    this.poisonCannon = React.createRef();
    this.bomb = React.createRef();
    this.laser = React.createRef();
    this.blueFire = React.createRef();
    this.plasmaCannon = React.createRef();

    // ability animations
    this.poison = React.createRef();
    this.slow = React.createRef();
    this.stun = React.createRef();
    this.invulnerable = React.createRef();
    this.heal = React.createRef();
    this.armorBoost = React.createRef();
    this.warpSpeed = React.createRef();
    this.nuclearBlast = React.createRef();
    this.stunGun = React.createRef();
    this.spaceMine = React.createRef();
    this.meteorShower = React.createRef();
    this.piercer = React.createRef();
    this.damageBoost = React.createRef();
    this.damageReduction = React.createRef();
    this.armorReduction = React.createRef();
    this.meteorExplosion = React.createRef();
    this.electricField = React.createRef();
    this.redMeteor = React.createRef();
    this.blink = React.createRef();
    this.teleport = React.createRef();
    // game animations
    this.shipExplosion = React.createRef();
    this.thruster = React.createRef();
    this.spaceMineExplosion = React.createRef();
    this.levelUp = React.createRef();
    this.nuclearExplosion = React.createRef();
    this.mothership = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');
    // context.fillRect(0, 0, canvas.width, canvas.height);

    this.setState({
      canvas,
      context,
      hunter: this.hunter.current,
      hunterBlue: this.hunterBlue.current,
      destroyer: this.destroyer.current,
      destroyerBlue: this.destroyerBlue.current,
      warrior: this.warrior.current,
      warriorBlue: this.warriorBlue.current,
      cruiser: this.cruiser.current,
      cruiserBlue: this.cruiserBlue.current,
      carrier: this.carrier.current,
      carrierBlue: this.carrierBlue.current,
      stealth: this.stealth.current,
      stealthBlue: this.stealthBlue.current,
      supplyShip: this.supplyShip.current,
      fireball: this.fireball.current,
      missile: this.missile.current,
      trifecta: this.trifecta.current,
      poisonCannon: this.poisonCannon.current,
      bomb: this.bomb.current,
      laser: this.laser.current,
      blueFire: this.blueFire.current,
      plasmaCannon: this.plasmaCannon.current,
      poison: this.poison.current,
      slow: this.slow.current,
      stun: this.stun.current,
      invulnerable: this.invulnerable.current,
      heal: this.heal.current,
      armorBoost: this.armorBoost.current,
      warpSpeed: this.warpSpeed.current,
      thruster: this.thruster.current,
      nuclearBlast: this.nuclearBlast.current,
      stunGun: this.stunGun.current,
      spaceMine: this.spaceMine.current,
      piercer: this.piercer.current,
      meteorShower: this.meteorShower.current,
      damageBoost: this.damageBoost.current,
      damageReduction: this.damageReduction.current,
      armorReduction: this.armorReduction.current,
      electricField: this.electricField.current,
      redMeteor: this.redMeteor.current,
      spaceMineExplosion: this.spaceMineExplosion.current,
      nuclearExplosion: this.nuclearExplosion.current,
      mothership: this.mothership.current,
      meteorExplosion: this.meteorExplosion.current,
      shipExplosion: this.shipExplosion.current,
      levelUp: this.levelUp.current,
      blink: this.blink.current,
      teleport: this.teleport.current,
      halfWindowWidth: round(window.innerWidth / 2),
      halfWindowHeight: round(window.innerHeight / 2)
    });
  }

  handleImage = (player) => {
    let imageReference = '';
    if (player.type === 'supplyShip') {
      imageReference = 'supplyShip';
    } else if (player.type === 'bomber') {
      imageReference = player.team === 'blue' ? player.shipName + 'Blue' : player.shipName;
    } else {
      imageReference = SHIPS[player.shipIndex].name
      if (player.team === 'blue') {
        imageReference += 'Blue'
      }
    }
    return this.state[imageReference];
  };

  handleScroll = (currentPlayer) => {
    if (currentPlayer && currentPlayer.location) {
      window.scrollTo(
        currentPlayer.location.x - this.state.halfWindowWidth,
        currentPlayer.location.y - this.state.halfWindowHeight
      )
    }
  }

  handleShips = (players, context, index, gameBuff) => {
    const { aiShips, motherships } = this.props
    players.concat(aiShips).forEach((player) => {
      const showShip = shouldRenderShip(player, index);
      if (player.active) {
        if (showShip) {

          handleInvisibleFilter(context, player, index);

          const thruster = player.effects[9] ? this.state.warpSpeed : this.state.thruster;
          drawShip(context, player, this.handleImage(player), thruster);
          const startCenter = findStartCenter(player);

          Object.values(player.effects).forEach((effect) => {
            if (effect.animation && effect.id !== 9) {
              const effectCoordinates = findCenterCoordinates(player.location, startCenter, {width: effect.animation?.renderWidth || 0, height: effect.animation?.renderHeight || 0});
              renderAnimation(context, this.state[effect.name], effect.animation, effectCoordinates);
            }
          });
        }
      } else if (!player.explodeAnimation.complete) {
        renderAnimation(context, this.state.shipExplosion, player.explodeAnimation, player.location);
      };
      renderPlayerData(gameBuff, context, player, showShip);
    });

    motherships.forEach((ship) => {
      renderAnimation(context, this.state.mothership, ship.animation, ship.location)
      renderMotherShipData(gameBuff, context, ship);
    });
  }

  renderAnimations = (context) => {
    this.props.animations.forEach((animation) => {
      renderAnimation(context, this.state[animation.name], animation, animation.location);
    });
  }

  renderWeapons = (currentPlayer, context) => {
    this.props.deployedWeapons.forEach((weapon) => {
      if (!weapon.invisible || (currentPlayer && weapon.team === currentPlayer.team)) {
        renderWeapon(context, weapon, this.state[weapon.name])
      }
    });
  }

  renderCanvas = () => {
    const {gameBuff, index, players} = this.props;
    const currentPlayer = players[index]
    this.handleScroll(currentPlayer)

    const canvas = this.canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (gameBuff.color) {
        context.fillRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);
        context.fillStyle = gameBuff.color;
      }

      this.handleShips(players, context, index, gameBuff);
      this.renderWeapons(currentPlayer, context);
      this.renderAnimations(context);
    }
  }

  render() {
    this.renderCanvas();
    return (
      <div>
        <canvas
          className="canvas column"
          ref={this.canvasRef}
          width={BOARD_WIDTH}
          height={BOARD_HEIGHT}
        />
        {SHIPS.map((ship, index) => {
          return (
            <img ref={this[ship.name]}
              src={ship.image}
              className="hidden"
              alt={ship.name}
              key={`ship${index}`}
            />
          );
        })}
        {SHIPS.map((ship, index) => {
          return (
            <img ref={this[`${ship.name}Blue`]}
              src={ship.blueImage}
              className="hidden"
              alt={`blue-${ship.name}`}
              key={`blueShip${index}`}
            />
          );
        })}
        {WEAPONS.map((weapon, index) => {
          return(
            <img ref={this[weapon.name]}
              src={weapon.animation ? weapon.animation.spriteImage : weapon.image}
              className="hidden"
              alt={weapon.name}
              key={`weapon${index}`}
            />
          );
        })}
        {ABILITY_WEAPONS.map((weapon, index) => {
          return(
            <img ref={this[weapon.name]}
              src={weapon.animation ? weapon.animation.spriteImage : weapon.image}
              className="hidden"
              alt={weapon.name}
              key={`abilityWeapon${index}`}
            />
          );
        })}
        {EXPLOSION_ANIMATIONS.map((weaponAnimation, index) => {
          return(
            <img ref={this[weaponAnimation.name]}
              src={weaponAnimation.spriteImage}
              className="hidden"
              alt={weaponAnimation.name}
              key={`weaponAnimation${index}`}
            />
          );
        })}
        {GAME_EFFECTS.filter((effect) => effect.animation)
          .map((effect, index) => {
            return(
              <img ref={this[effect.name]}
                src={SPRITE_IMAGES[effect.animation.spriteIndex]}
                className="hidden"
                alt={effect.name}
                key={`shipEffect${index}`}
              />
            );
          })}

        {GAME_ANIMATIONS.map((animation, index) => {
          return(
            <img ref={this[animation.name]}
              src={animation.spriteImage}
              className="hidden"
              alt={animation.name}
              key={`gameAnimation${index}`}
            />
          );
        })}

        <img ref={this[SUPPLY_SHIP.name]} src={SUPPLY_SHIP.image} className="hidden" alt={SUPPLY_SHIP.name} />
        <img ref={this[MOTHER_SHIP.name]} src={MOTHER_SHIP.animation.spriteImage} className="hidden" alt={MOTHER_SHIP.name} />
      </div>
    );
  };
}

export default Canvas

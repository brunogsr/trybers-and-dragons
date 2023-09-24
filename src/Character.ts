import { Mage, Archetype } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _name: string;
  private _race: Race;
  private _archetype: Archetype;
  private _energy: Energy;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _lifePoints: number;
  private _maxLifePoints: number;

  constructor(
    name = 'Name not set',
    race: Race = new Elf(name, getRandomInt(1, 10)),
    archetype: Archetype = new Mage(name),
  ) {
    this._name = name;
    this._dexterity = getRandomInt(1, 10);
    this._race = race;
    this._archetype = archetype;
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  get race(): Race { return this._race; }

  get archetype(): Archetype { return this._archetype; }

  get energy(): Energy { return { ...this._energy }; }

  get strength(): number { return this._strength; }

  get defense(): number { return this._defense; }

  get dexterity(): number { return this._dexterity; }

  get lifePoints(): number { return this._lifePoints; }

  get maxLifePoints(): number { return this._maxLifePoints; }
  
  set maxLifePoints(value: number) { this._maxLifePoints = value; }
  
  get name(): string { return this._name; }
  
  set name(value: string) { this._name = value; }

  receiveDamage(attackPoints: number): number {
    const damageReceived = attackPoints - this._defense;

    if (damageReceived > 0) {
      this._lifePoints -= damageReceived;
    } else {
      this._lifePoints -= 1;
    }
    if (this._lifePoints <= 0) { this._lifePoints = -1; }

    return this._lifePoints;
  }

  attack(enemy: SimpleFighter): void {
    enemy.receiveDamage(this._strength);
  }

  levelUp(): void {
    const maxLifePointsIncrease = getRandomInt(1, 10);
    const strengthIncrease = getRandomInt(1, 10);
    const dexterityIncrease = getRandomInt(1, 10);
    const defenseIncrease = getRandomInt(1, 10);

    this._maxLifePoints += maxLifePointsIncrease;
    this._strength += strengthIncrease;
    this._dexterity += dexterityIncrease;
    this._defense += defenseIncrease;
    this._energy.amount = 10;

    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }

    this._lifePoints = this._maxLifePoints;
  }

  special(enemy: SimpleFighter): void {
    const diceThrows = getRandomInt(2, 6);
    const damageReceived = getRandomInt(1, 10) * diceThrows + this._strength;

    enemy.receiveDamage(damageReceived);
  }
}

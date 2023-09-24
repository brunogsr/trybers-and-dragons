import Fighter from '../Fighter';
import Battle from './Battle';

export default class PVP extends Battle {
  constructor(
    private firstFighter: Fighter,
    private secondFighter: Fighter,
  ) {
    super(firstFighter);
  }

  fight(): number {
    do {
      this.firstFighter.attack(this.secondFighter);
      this.secondFighter.attack(this.firstFighter);
    } while (this.firstFighter.lifePoints !== -1 
      && this.secondFighter.lifePoints !== -1);

    return super.fight();
  }
}
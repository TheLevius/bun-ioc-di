import 'reflect-metadata';
import { ThrowableWeapon, Warrior, Weapon } from './interfaces';
import { TYPES } from './types';
import { Container, inject, injectable } from 'inversify';

@injectable()
class Katana implements Weapon {
	public hit() {
		return 'cut!';
	}
}
@injectable()
class Shuriken implements ThrowableWeapon {
	public throw() {
		return 'hit!';
	}
}

@injectable()
class Ninja implements Warrior {
	public constructor(
		@inject(TYPES.Weapon) private katana: Weapon,
		@inject(TYPES.ThrowableWeapon) private shuriken: ThrowableWeapon
	) {}

	public fight() {
		return this.katana.hit();
	}
	public sneak() {
		return this.shuriken.throw();
	}
}
const container = new Container();
container.bind<Warrior>(TYPES.Warrior).to(Ninja);
container.bind<Weapon>(TYPES.Weapon).to(Katana);
container.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);
const ninja = container.get<Warrior>(TYPES.Warrior);
console.log(ninja.fight());
console.log(ninja.sneak());
export { Ninja, Katana, Shuriken };

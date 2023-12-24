import {init} from 'z3-solver';
import {readFileSync} from 'node:fs';

const data = readFileSync('./day24.txt', 'utf-8')
    .split('\n')
    .slice(0, 3)
    .map(l => {
      const [x, y, z] = l.split('@')[0].split(',').map(n => +n);
      const [vx, vy, vz] = l.split('@')[1].split(',').map(n => +n);
      return {x, y, z, vx, vy, vz, m: vy / vx};
    });

const solve = async () => {
  const {Context} = await init();
  const z3 = Context('main');
  const x = z3.Real.const('x');
  const y = z3.Real.const('y');
  const z = z3.Real.const('z');
  const velX = z3.Real.const('vx');
  const velY = z3.Real.const('vy');
  const velZ = z3.Real.const('vz');
  const z3Solver = new z3.Solver();

  for (let i = 0; i < data.length; i++) {
    const stone = data[i];
    const t = z3.Real.const(`t${i}`);

    z3Solver.add(t.ge(0));
    z3Solver.add(x.add(velX.mul(t)).eq(t.mul(stone.vx).add(stone.x)));
    z3Solver.add(y.add(velY.mul(t)).eq(t.mul(stone.vy).add(stone.y)));
    z3Solver.add(z.add(velZ.mul(t)).eq(t.mul(stone.vz).add(stone.z)));
  }

  const sat = await z3Solver.check();

  if (sat !== 'sat') return -1;
  const model = z3Solver.model();
  const rx = Number(model.eval(x));
  const ry = Number(model.eval(y));
  const rz = Number(model.eval(z));

  return rx + ry + rz;
};

console.log(await solve());
process.exit();
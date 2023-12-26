const lines = require('node:fs').readFileSync('./day25.txt', 'utf-8').split('\n');

const group = (vertices, edges, unlinked) => {
  for (let edge = 0; edge < edges.length; edge++) {
    const seed = Math.floor(Math.random() * (edge + 1));
    [edges[edge], edges[seed]] = [edges[seed], edges[edge]];
  }

  const groups = [];
  const parents = [-1];
  const moves = [-1];
  const isLinked = (p1, p2) => {
    if (!groups[p1] && !groups[p2]) {
      const group = parents.length;
      parents.push(group);
      moves.push(1);
      groups[p1] = group;
      groups[p2] = group;
    } else if (!groups[p1]) {
      const g = (groups[p2] = findParent(p2));
      moves[g]++;
      groups[p1] = g;
    } else if (!groups[p2]) {
      const g = (groups[p1] = findParent(p1));
      moves[g]++;
      groups[p2] = g;
    } else {
      let g1 = findParent(p1);
      let g2 = findParent(p2);

      if (g1 !== g2) {
        if (moves[g1] > moves[g2]) {
          [g2, g1] = [g1, g2];
        }

        moves[g2] += moves[g1] + 1;
        parents[g1] = g2;
        groups[p1] = g2;
        groups[p2] = g2;
      } else {
        return false;
      }
    }

    return true;
  }

  const findParent = p => {
    if (groups[p] === 0) {
      return -1;
    }
    let group = groups[p];
    while (group !== parents[group]) {
      group = parents[group];
    }
    return group;
  }

  let idxEdge = 0;
  while (vertices > 2) {
    const [v1, v2] = edges[idxEdge++];
    if (isLinked(v1, v2)) {
      vertices--;
    }
  }

  let removed = 0;
  for (const [v1, v2] of edges) {
    if ((groups[v1] = findParent(v1)) !== (groups[v2] = findParent(v2))) {
      removed++;
    }
  }

  return removed === unlinked ? groups : null;
}

const edges = [];
const lookup = {};
const len = () => Object.keys(lookup).length;

lines.forEach(l => {
  const [p, links] = l.split(': ');
  if (!lookup[p]) {
    lookup[p] = len();
  }
  for (const link of links.split(' ')) {
    if (!lookup[link]) {
      lookup[link] = len()
    }
    edges.push([lookup[p], lookup[link]]);
  }
});

while (true) {
  const groups = group(len(), edges, 3);
  if (groups) {
    const count = groups.filter(x => x === groups[0]).length;
    console.log(count * (len() - count));
    break;
  }
}
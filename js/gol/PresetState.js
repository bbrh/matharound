PresetState = function (x, y, preset) {
  var state = State.emptyState(x, y);
  var half = [Math.floor(x/2), Math.floor(y/2)];
  switch (preset) {
  case ('preset-osc-blinker'):
    state[half[0]][half[1]-1] = Gol.states.alive;
    state[half[0]][half[1]] = Gol.states.alive;
    state[half[0]][half[1]+1] = Gol.states.alive;
    break;
  case ('preset-osc-star'):
    state[half[0]-3][half[1]-3] = Gol.states.alive;
    state[half[0]-3][half[1]-2] = Gol.states.alive;
    state[half[0]-3][half[1]-1] = Gol.states.alive;

    state[half[0]-3][half[1]+3] = Gol.states.alive;
    state[half[0]-3][half[1]+2] = Gol.states.alive;
    state[half[0]-3][half[1]+1] = Gol.states.alive;

    state[half[0]+3][half[1]-3] = Gol.states.alive;
    state[half[0]+3][half[1]-2] = Gol.states.alive;
    state[half[0]+3][half[1]-1] = Gol.states.alive;

    state[half[0]+3][half[1]+3] = Gol.states.alive;
    state[half[0]+3][half[1]+2] = Gol.states.alive;
    state[half[0]+3][half[1]+1] = Gol.states.alive;

    state[half[0]-3][half[1]-3] = Gol.states.alive;
    state[half[0]-2][half[1]-3] = Gol.states.alive;
    state[half[0]-1][half[1]-3] = Gol.states.alive;

    state[half[0]-3][half[1]+3] = Gol.states.alive;
    state[half[0]-2][half[1]+3] = Gol.states.alive;
    state[half[0]-1][half[1]+3] = Gol.states.alive;

    state[half[0]+3][half[1]-3] = Gol.states.alive;
    state[half[0]+2][half[1]-3] = Gol.states.alive;
    state[half[0]+1][half[1]-3] = Gol.states.alive;

    state[half[0]+3][half[1]+3] = Gol.states.alive;
    state[half[0]+2][half[1]+3] = Gol.states.alive;
    state[half[0]+1][half[1]+3] = Gol.states.alive;

    state[half[0]+1][half[1]+4] = Gol.states.alive;
    state[half[0]]  [half[1]+4] = Gol.states.alive;
    state[half[0]-1][half[1]+4] = Gol.states.alive;

    state[half[0]+1][half[1]-4] = Gol.states.alive;
    state[half[0]]  [half[1]-4] = Gol.states.alive;
    state[half[0]-1][half[1]-4] = Gol.states.alive;

    state[half[0]+4][half[1]-1] = Gol.states.alive;
    state[half[0]+4][half[1]  ] = Gol.states.alive;
    state[half[0]+4][half[1]+1] = Gol.states.alive;

    state[half[0]-4][half[1]-1] = Gol.states.alive;
    state[half[0]-4][half[1]  ] = Gol.states.alive;
    state[half[0]-4][half[1]+1] = Gol.states.alive;

    state[half[0]-5][half[1]] = Gol.states.alive;
    state[half[0]+5][half[1]] = Gol.states.alive;
    state[half[0]][half[1]-5] = Gol.states.alive;
    state[half[0]][half[1]+5] = Gol.states.alive;
    break;
  case ('preset-osc-cross'):
    state[half[0]-2][half[1]-2] = Gol.states.alive;
    state[half[0]-2][half[1]-3] = Gol.states.alive;
    state[half[0]-2][half[1]-4] = Gol.states.alive;
    state[half[0]-1][half[1]-4] = Gol.states.alive;
    state[half[0]]  [half[1]-4] = Gol.states.alive;
    state[half[0]+1][half[1]-4] = Gol.states.alive;
    state[half[0]+1][half[1]-3] = Gol.states.alive;
    state[half[0]+1][half[1]-2] = Gol.states.alive;
    state[half[0]+2][half[1]-2] = Gol.states.alive;
    state[half[0]+3][half[1]-2] = Gol.states.alive;
    state[half[0]+3][half[1]-1] = Gol.states.alive;
    state[half[0]+3][half[1]] = Gol.states.alive;
    state[half[0]+3][half[1]+1] = Gol.states.alive;
    state[half[0]+2][half[1]+1] = Gol.states.alive;
    state[half[0]+1][half[1]+1] = Gol.states.alive;
    state[half[0]+1][half[1]+2] = Gol.states.alive;
    state[half[0]+1][half[1]+3] = Gol.states.alive;
    state[half[0]]  [half[1]+3] = Gol.states.alive;
    state[half[0]-1][half[1]+3] = Gol.states.alive;
    state[half[0]-2][half[1]+3] = Gol.states.alive;
    state[half[0]-2][half[1]+2] = Gol.states.alive;
    state[half[0]-2][half[1]+1] = Gol.states.alive;
    state[half[0]-3][half[1]+1] = Gol.states.alive;
    state[half[0]-4][half[1]+1] = Gol.states.alive;
    state[half[0]-4][half[1]] = Gol.states.alive;
    state[half[0]-4][half[1]-1] = Gol.states.alive;
    state[half[0]-4][half[1]-2] = Gol.states.alive;
    state[half[0]-3][half[1]-2] = Gol.states.alive;
    break;
  case ('preset-osc-frenchkiss'):
    state[half[0]-6][half[1]+5] = Gol.states.alive;
    state[half[0]-5][half[1]+5] = Gol.states.alive;
    state[half[0]-5][half[1]+4] = Gol.states.alive;
    state[half[0]-5][half[1]+3] = Gol.states.alive;
    state[half[0]-4][half[1]+2] = Gol.states.alive;
    state[half[0]-3][half[1]+2] = Gol.states.alive;
    state[half[0]-3][half[1]+3] = Gol.states.alive;

    state[half[0]+2][half[1]-4] = Gol.states.alive;
    state[half[0]+1][half[1]-4] = Gol.states.alive;
    state[half[0]+1][half[1]-3] = Gol.states.alive;
    state[half[0]+1][half[1]-2] = Gol.states.alive;
    state[half[0]  ][half[1]-1] = Gol.states.alive;
    state[half[0]-1][half[1]-1] = Gol.states.alive;
    state[half[0]-1][half[1]-2] = Gol.states.alive;

    state[half[0]-2][half[1]  ] = Gol.states.alive;
    state[half[0]-2][half[1]+1] = Gol.states.alive;
    state[half[0]-2][half[1]+3] = Gol.states.alive;
    state[half[0]-2][half[1]-2] = Gol.states.alive;
    state[half[0]-3][half[1]-1] = Gol.states.alive;
    state[half[0]-1][half[1]+2] = Gol.states.alive;

    break;
  case ('preset-osc-clock2'):
    state[half[0]-5][half[1]-1] = Gol.states.alive;
    state[half[0]-4][half[1]-1] = Gol.states.alive;
    state[half[0]-5][half[1]  ] = Gol.states.alive;
    state[half[0]-4][half[1]  ] = Gol.states.alive;

    state[half[0]+1][half[1]-5] = Gol.states.alive;
    state[half[0]+2][half[1]-5] = Gol.states.alive;
    state[half[0]+1][half[1]-4] = Gol.states.alive;
    state[half[0]+2][half[1]-4] = Gol.states.alive;

    state[half[0]+5][half[1]+1] = Gol.states.alive;
    state[half[0]+6][half[1]+1] = Gol.states.alive;
    state[half[0]+5][half[1]+2] = Gol.states.alive;
    state[half[0]+6][half[1]+2] = Gol.states.alive;

    state[half[0]  ][half[1]+5] = Gol.states.alive;
    state[half[0]-1][half[1]+5] = Gol.states.alive;
    state[half[0]  ][half[1]+6] = Gol.states.alive;
    state[half[0]-1][half[1]+6] = Gol.states.alive;

    state[half[0]-1][half[1]-2] = Gol.states.alive;
    state[half[0]  ][half[1]-2] = Gol.states.alive;
    state[half[0]+1][half[1]-2] = Gol.states.alive;
    state[half[0]+2][half[1]-2] = Gol.states.alive;
    state[half[0]-1][half[1]+3] = Gol.states.alive;
    state[half[0]  ][half[1]+3] = Gol.states.alive;
    state[half[0]+1][half[1]+3] = Gol.states.alive;
    state[half[0]+2][half[1]+3] = Gol.states.alive;
    state[half[0]-2][half[1]-1] = Gol.states.alive;
    state[half[0]-2][half[1]  ] = Gol.states.alive;
    state[half[0]-2][half[1]+1] = Gol.states.alive;
    state[half[0]-2][half[1]+2] = Gol.states.alive;
    state[half[0]+3][half[1]-1] = Gol.states.alive;
    state[half[0]+3][half[1]  ] = Gol.states.alive;
    state[half[0]+3][half[1]+1] = Gol.states.alive;
    state[half[0]+3][half[1]+2] = Gol.states.alive;

    state[half[0]+1][half[1]  ] = Gol.states.alive;
    state[half[0]+1][half[1]+1] = Gol.states.alive;
    state[half[0]  ][half[1]+2] = Gol.states.alive;
    break;
  case ('preset-osc-pinwheel'):
    state[half[0]-5][half[1]-1] = Gol.states.alive;
    state[half[0]-4][half[1]-1] = Gol.states.alive;
    state[half[0]-5][half[1]  ] = Gol.states.alive;
    state[half[0]-4][half[1]  ] = Gol.states.alive;

    state[half[0]+1][half[1]-5] = Gol.states.alive;
    state[half[0]+2][half[1]-5] = Gol.states.alive;
    state[half[0]+1][half[1]-4] = Gol.states.alive;
    state[half[0]+2][half[1]-4] = Gol.states.alive;

    state[half[0]+5][half[1]+1] = Gol.states.alive;
    state[half[0]+6][half[1]+1] = Gol.states.alive;
    state[half[0]+5][half[1]+2] = Gol.states.alive;
    state[half[0]+6][half[1]+2] = Gol.states.alive;

    state[half[0]  ][half[1]+5] = Gol.states.alive;
    state[half[0]-1][half[1]+5] = Gol.states.alive;
    state[half[0]  ][half[1]+6] = Gol.states.alive;
    state[half[0]-1][half[1]+6] = Gol.states.alive;

    state[half[0]-1][half[1]-2] = Gol.states.alive;
    state[half[0]  ][half[1]-2] = Gol.states.alive;
    state[half[0]+1][half[1]-2] = Gol.states.alive;
    state[half[0]+2][half[1]-2] = Gol.states.alive;
    state[half[0]-1][half[1]+3] = Gol.states.alive;
    state[half[0]  ][half[1]+3] = Gol.states.alive;
    state[half[0]+1][half[1]+3] = Gol.states.alive;
    state[half[0]+2][half[1]+3] = Gol.states.alive;
    state[half[0]-2][half[1]-1] = Gol.states.alive;
    state[half[0]-2][half[1]  ] = Gol.states.alive;
    state[half[0]-2][half[1]+1] = Gol.states.alive;
    state[half[0]-2][half[1]+2] = Gol.states.alive;
    state[half[0]+3][half[1]-1] = Gol.states.alive;
    state[half[0]+3][half[1]  ] = Gol.states.alive;
    state[half[0]+3][half[1]+1] = Gol.states.alive;
    state[half[0]+3][half[1]+2] = Gol.states.alive;

    state[half[0]+1][half[1]  ] = Gol.states.alive;
    state[half[0]  ][half[1]+2] = Gol.states.alive;
    state[half[0]+2][half[1]+1] = Gol.states.alive;
    break;
  case ('preset-osc-octagon'):
    state[half[0]-4][half[1]] = Gol.states.alive;
    state[half[0]-3][half[1]-1] = Gol.states.alive;
    state[half[0]-2][half[1]-2] = Gol.states.alive;
    state[half[0]-1][half[1]-3] = Gol.states.alive;

    state[half[0]]  [half[1]-3] = Gol.states.alive;
    state[half[0]+1][half[1]-2] = Gol.states.alive;
    state[half[0]+2][half[1]-1] = Gol.states.alive;
    state[half[0]+3][half[1]] = Gol.states.alive;

    state[half[0]+3][half[1]+1] = Gol.states.alive;
    state[half[0]+2][half[1]+2] = Gol.states.alive;
    state[half[0]+1][half[1]+3] = Gol.states.alive;
    state[half[0]]  [half[1]+4] = Gol.states.alive;

    state[half[0]-1][half[1]+4] = Gol.states.alive;
    state[half[0]-2][half[1]+3] = Gol.states.alive;
    state[half[0]-3][half[1]+2] = Gol.states.alive;
    state[half[0]-4][half[1]+1] = Gol.states.alive;

    break;
  case ('preset-osc-fumarole'):
    state[half[0]-3][half[1]-1] = Gol.states.alive; state[half[0]+4][half[1]-1] = Gol.states.alive;
    state[half[0]-3][half[1]  ] = Gol.states.alive; state[half[0]+4][half[1]  ] = Gol.states.alive;
    state[half[0]-3][half[1]+2] = Gol.states.alive; state[half[0]+4][half[1]+2] = Gol.states.alive;
    state[half[0]-3][half[1]+3] = Gol.states.alive; state[half[0]+4][half[1]+3] = Gol.states.alive;
    state[half[0]-2][half[1]+3] = Gol.states.alive; state[half[0]+3][half[1]+3] = Gol.states.alive;
    state[half[0]-1][half[1]+2] = Gol.states.alive; state[half[0]+2][half[1]+2] = Gol.states.alive;
    state[half[0]-1][half[1]+1] = Gol.states.alive; state[half[0]+2][half[1]+1] = Gol.states.alive;
    state[half[0]-1][half[1]-2] = Gol.states.alive; state[half[0]+2][half[1]-2] = Gol.states.alive;
    state[half[0]  ][half[1]-1] = Gol.states.alive; state[half[0]+1][half[1]-1] = Gol.states.alive;
    state[half[0]  ][half[1]  ] = Gol.states.alive; state[half[0]+1][half[1]  ] = Gol.states.alive;
    state[half[0]  ][half[1]+1] = Gol.states.alive; state[half[0]+1][half[1]+1] = Gol.states.alive;
    break;
  case ('preset-osc-pentoads'):
    state[half[0]-6][half[1]+5] = Gol.states.alive;
    state[half[0]-5][half[1]+5] = Gol.states.alive;
    state[half[0]-5][half[1]+4] = Gol.states.alive;
    state[half[0]-5][half[1]+3] = Gol.states.alive;
    state[half[0]-4][half[1]+2] = Gol.states.alive;
    state[half[0]-3][half[1]+2] = Gol.states.alive;
    state[half[0]-3][half[1]+3] = Gol.states.alive;
    state[half[0]-1][half[1]+1] = Gol.states.alive;
    state[half[0]-1][half[1]  ] = Gol.states.alive;
    state[half[0]  ][half[1]+1] = Gol.states.alive;
    state[half[0]+1][half[1]+1] = Gol.states.alive;

    state[half[0]+6][half[1]-6] = Gol.states.alive;
    state[half[0]+5][half[1]-6] = Gol.states.alive;
    state[half[0]+5][half[1]-5] = Gol.states.alive;
    state[half[0]+5][half[1]-4] = Gol.states.alive;
    state[half[0]+4][half[1]-3] = Gol.states.alive;
    state[half[0]+3][half[1]-3] = Gol.states.alive;
    state[half[0]+3][half[1]-4] = Gol.states.alive;
    state[half[0]+1][half[1]-2] = Gol.states.alive;
    state[half[0]+1][half[1]-1] = Gol.states.alive;
    state[half[0]  ][half[1]-2] = Gol.states.alive;
    state[half[0]-1][half[1]-2] = Gol.states.alive;
    break;
  case ('preset-osc-koksgalaxy'):
    state[half[0]][half[1]] = Gol.states.alive; state[half[0]-1][half[1]] = Gol.states.alive;
    state[half[0]][half[1]+1] = Gol.states.alive; state[half[0]-1][half[1]+1] = Gol.states.alive;
    state[half[0]][half[1]+2] = Gol.states.alive; state[half[0]-1][half[1]+2] = Gol.states.alive;
    state[half[0]][half[1]+3] = Gol.states.alive; state[half[0]-1][half[1]+3] = Gol.states.alive;
    state[half[0]][half[1]+4] = Gol.states.alive; state[half[0]-1][half[1]+4] = Gol.states.alive;
    state[half[0]][half[1]+5] = Gol.states.alive; state[half[0]-1][half[1]+5] = Gol.states.alive;

    state[half[0]+6][half[1]-3] = Gol.states.alive; state[half[0]+7][half[1]-3] = Gol.states.alive;
    state[half[0]+6][half[1]-2] = Gol.states.alive; state[half[0]+7][half[1]-2] = Gol.states.alive;
    state[half[0]+6][half[1]-1] = Gol.states.alive; state[half[0]+7][half[1]-1] = Gol.states.alive;
    state[half[0]+6][half[1]  ] = Gol.states.alive; state[half[0]+7][half[1]  ] = Gol.states.alive;
    state[half[0]+6][half[1]+1] = Gol.states.alive; state[half[0]+7][half[1]+1] = Gol.states.alive;
    state[half[0]+6][half[1]+2] = Gol.states.alive; state[half[0]+7][half[1]+2] = Gol.states.alive;

    state[half[0]+2][half[1]+4] = Gol.states.alive; state[half[0]+2][half[1]+5] = Gol.states.alive;
    state[half[0]+3][half[1]+4] = Gol.states.alive; state[half[0]+3][half[1]+5] = Gol.states.alive;
    state[half[0]+4][half[1]+4] = Gol.states.alive; state[half[0]+4][half[1]+5] = Gol.states.alive;
    state[half[0]+5][half[1]+4] = Gol.states.alive; state[half[0]+5][half[1]+5] = Gol.states.alive;
    state[half[0]+6][half[1]+4] = Gol.states.alive; state[half[0]+6][half[1]+5] = Gol.states.alive;
    state[half[0]+7][half[1]+4] = Gol.states.alive; state[half[0]+7][half[1]+5] = Gol.states.alive;

    state[half[0]-1][half[1]-3] = Gol.states.alive; state[half[0]-1][half[1]-2] = Gol.states.alive;
    state[half[0]  ][half[1]-3] = Gol.states.alive; state[half[0]  ][half[1]-2] = Gol.states.alive;
    state[half[0]+1][half[1]-3] = Gol.states.alive; state[half[0]+1][half[1]-2] = Gol.states.alive;
    state[half[0]+2][half[1]-3] = Gol.states.alive; state[half[0]+2][half[1]-2] = Gol.states.alive;
    state[half[0]+3][half[1]-3] = Gol.states.alive; state[half[0]+3][half[1]-2] = Gol.states.alive;
    state[half[0]+4][half[1]-3] = Gol.states.alive; state[half[0]+4][half[1]-2] = Gol.states.alive;
    break;
  case ('preset-osc-pentadecathlon'):
    state[half[0]-4][half[1]] = Gol.states.alive;
    state[half[0]-3][half[1]] = Gol.states.alive;
    state[half[0]-1][half[1]] = Gol.states.alive;
    state[half[0]  ][half[1]] = Gol.states.alive;
    state[half[0]+1][half[1]] = Gol.states.alive;
    state[half[0]+2][half[1]] = Gol.states.alive;
    state[half[0]+4][half[1]] = Gol.states.alive;
    state[half[0]+5][half[1]] = Gol.states.alive;

    state[half[0]-2][half[1]+1] = Gol.states.alive;
    state[half[0]-2][half[1]-1] = Gol.states.alive;
    state[half[0]+3][half[1]+1] = Gol.states.alive;
    state[half[0]+3][half[1]-1] = Gol.states.alive;

    break;
  case ('preset-glider'):
    state[3][3] = Gol.states.alive;
    state[5][3] = Gol.states.alive;
    state[4][4] = Gol.states.alive;
    state[5][4] = Gol.states.alive;
    state[4][5] = Gol.states.alive;
    break;
  case ('preset-glider-gun'):
    state[2][10] = Gol.states.alive; state[3][10] = Gol.states.alive;
    state[2][11] = Gol.states.alive; state[3][11] = Gol.states.alive;
    state[36][8] = Gol.states.alive; state[37][8] = Gol.states.alive;
    state[36][9] = Gol.states.alive; state[37][9] = Gol.states.alive;
    state[12][10] = Gol.states.alive;
    state[12][11] = Gol.states.alive;
    state[12][12] = Gol.states.alive;
    state[13][9] = Gol.states.alive;
    state[13][13] = Gol.states.alive;
    state[14][8] = Gol.states.alive;
    state[14][14] = Gol.states.alive;
    state[15][8] = Gol.states.alive;
    state[15][14] = Gol.states.alive;
    state[16][11] = Gol.states.alive;
    state[17][9] = Gol.states.alive;
    state[17][13] = Gol.states.alive;
    state[18][10] = Gol.states.alive;
    state[18][11] = Gol.states.alive;
    state[18][12] = Gol.states.alive;
    state[19][11] = Gol.states.alive;
    state[22][8] = Gol.states.alive;
    state[22][9] = Gol.states.alive;
    state[22][10] = Gol.states.alive;
    state[23][8] = Gol.states.alive;
    state[23][9] = Gol.states.alive;
    state[23][10] = Gol.states.alive;
    state[24][7] = Gol.states.alive;
    state[24][11] = Gol.states.alive;
    state[26][6] = Gol.states.alive;
    state[26][7] = Gol.states.alive;
    state[26][11] = Gol.states.alive;
    state[26][12] = Gol.states.alive;

    break;
  }


  return new State(state);
};

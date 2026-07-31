import * as migration_20260731_113522_initial from './20260731_113522_initial';

export const migrations = [
  {
    up: migration_20260731_113522_initial.up,
    down: migration_20260731_113522_initial.down,
    name: '20260731_113522_initial'
  },
];

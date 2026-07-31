import * as migration_20260731_113522_initial from './20260731_113522_initial';
import * as migration_20260731_130116_add_home_and_sessions_content from './20260731_130116_add_home_and_sessions_content';
import * as migration_20260731_145852_add_product_file_field from './20260731_145852_add_product_file_field';
import * as migration_20260731_155955_add_about_photos from './20260731_155955_add_about_photos';
import * as migration_20260731_165552_add_home_teachings from './20260731_165552_add_home_teachings';

export const migrations = [
  {
    up: migration_20260731_113522_initial.up,
    down: migration_20260731_113522_initial.down,
    name: '20260731_113522_initial',
  },
  {
    up: migration_20260731_130116_add_home_and_sessions_content.up,
    down: migration_20260731_130116_add_home_and_sessions_content.down,
    name: '20260731_130116_add_home_and_sessions_content',
  },
  {
    up: migration_20260731_145852_add_product_file_field.up,
    down: migration_20260731_145852_add_product_file_field.down,
    name: '20260731_145852_add_product_file_field',
  },
  {
    up: migration_20260731_155955_add_about_photos.up,
    down: migration_20260731_155955_add_about_photos.down,
    name: '20260731_155955_add_about_photos',
  },
  {
    up: migration_20260731_165552_add_home_teachings.up,
    down: migration_20260731_165552_add_home_teachings.down,
    name: '20260731_165552_add_home_teachings'
  },
];

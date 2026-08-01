import * as migration_20260731_113522_initial from './20260731_113522_initial';
import * as migration_20260731_130116_add_home_and_sessions_content from './20260731_130116_add_home_and_sessions_content';
import * as migration_20260731_145852_add_product_file_field from './20260731_145852_add_product_file_field';
import * as migration_20260731_155955_add_about_photos from './20260731_155955_add_about_photos';
import * as migration_20260731_165552_add_home_teachings from './20260731_165552_add_home_teachings';
import * as migration_20260731_172404_add_subscribers from './20260731_172404_add_subscribers';
import * as migration_20260731_191727_add_content_globals_and_calendar_suggestions from './20260731_191727_add_content_globals_and_calendar_suggestions';
import * as migration_20260731_193518_add_suggestion_status from './20260731_193518_add_suggestion_status';
import * as migration_20260731_194209_add_calendar_venue_time from './20260731_194209_add_calendar_venue_time';
import * as migration_20260731_195438_add_why_clarity_sessions from './20260731_195438_add_why_clarity_sessions';
import * as migration_20260801_073305_remove_em_dashes_from_content from './20260801_073305_remove_em_dashes_from_content';
import * as migration_20260801_134750_branded_email_templates from './20260801_134750_branded_email_templates';

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
    name: '20260731_165552_add_home_teachings',
  },
  {
    up: migration_20260731_172404_add_subscribers.up,
    down: migration_20260731_172404_add_subscribers.down,
    name: '20260731_172404_add_subscribers',
  },
  {
    up: migration_20260731_191727_add_content_globals_and_calendar_suggestions.up,
    down: migration_20260731_191727_add_content_globals_and_calendar_suggestions.down,
    name: '20260731_191727_add_content_globals_and_calendar_suggestions',
  },
  {
    up: migration_20260731_193518_add_suggestion_status.up,
    down: migration_20260731_193518_add_suggestion_status.down,
    name: '20260731_193518_add_suggestion_status',
  },
  {
    up: migration_20260731_194209_add_calendar_venue_time.up,
    down: migration_20260731_194209_add_calendar_venue_time.down,
    name: '20260731_194209_add_calendar_venue_time',
  },
  {
    up: migration_20260731_195438_add_why_clarity_sessions.up,
    down: migration_20260731_195438_add_why_clarity_sessions.down,
    name: '20260731_195438_add_why_clarity_sessions',
  },
  {
    up: migration_20260801_073305_remove_em_dashes_from_content.up,
    down: migration_20260801_073305_remove_em_dashes_from_content.down,
    name: '20260801_073305_remove_em_dashes_from_content',
  },
  {
    up: migration_20260801_134750_branded_email_templates.up,
    down: migration_20260801_134750_branded_email_templates.down,
    name: '20260801_134750_branded_email_templates'
  },
];

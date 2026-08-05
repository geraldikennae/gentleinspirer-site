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
import * as migration_20260801_152431_add_email_html_template from './20260801_152431_add_email_html_template';
import * as migration_20260801_155903_update_email_banner_and_signoff from './20260801_155903_update_email_banner_and_signoff';
import * as migration_20260803_115638_add_growth_audit from './20260803_115638_add_growth_audit';
import * as migration_20260803_132123_fix_email_dark_mode from './20260803_132123_fix_email_dark_mode';
import * as migration_20260803_134420_cream_black_email_banner from './20260803_134420_cream_black_email_banner';
import * as migration_20260803_145600_navy_white_email_banner from './20260803_145600_navy_white_email_banner';
import * as migration_20260803_151728_navy_banner_and_email_design from './20260803_151728_navy_banner_and_email_design';
import * as migration_20260805_130615_add_session_flier from './20260805_130615_add_session_flier';

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
    name: '20260801_134750_branded_email_templates',
  },
  {
    up: migration_20260801_152431_add_email_html_template.up,
    down: migration_20260801_152431_add_email_html_template.down,
    name: '20260801_152431_add_email_html_template',
  },
  {
    up: migration_20260801_155903_update_email_banner_and_signoff.up,
    down: migration_20260801_155903_update_email_banner_and_signoff.down,
    name: '20260801_155903_update_email_banner_and_signoff',
  },
  {
    up: migration_20260803_115638_add_growth_audit.up,
    down: migration_20260803_115638_add_growth_audit.down,
    name: '20260803_115638_add_growth_audit',
  },
  {
    up: migration_20260803_132123_fix_email_dark_mode.up,
    down: migration_20260803_132123_fix_email_dark_mode.down,
    name: '20260803_132123_fix_email_dark_mode',
  },
  {
    up: migration_20260803_134420_cream_black_email_banner.up,
    down: migration_20260803_134420_cream_black_email_banner.down,
    name: '20260803_134420_cream_black_email_banner',
  },
  {
    up: migration_20260803_145600_navy_white_email_banner.up,
    down: migration_20260803_145600_navy_white_email_banner.down,
    name: '20260803_145600_navy_white_email_banner',
  },
  {
    up: migration_20260803_151728_navy_banner_and_email_design.up,
    down: migration_20260803_151728_navy_banner_and_email_design.down,
    name: '20260803_151728_navy_banner_and_email_design',
  },
  {
    up: migration_20260805_130615_add_session_flier.up,
    down: migration_20260805_130615_add_session_flier.down,
    name: '20260805_130615_add_session_flier'
  },
];

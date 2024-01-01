import { join } from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

const env = process.env.NODE_ENV;

export default () => {
  return yaml.load(
    fs.readFileSync(join(__dirname, `./${env || 'development'}.yml`), 'utf8'),
  ) as Record<string, any>;
};

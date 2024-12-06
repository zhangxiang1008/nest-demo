import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import Homepage from '../../../views/components/homepage';
import ReactDOMServer from 'react-dom/server';
@Injectable()
export default class SsrSevice {
  constructor() {}
  async getIndexString() {
    const index = readFileSync(join(__dirname, '../../../', 'index.html'));
    return index
      .toString()
      .replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(Homepage({}))}</div>`,
      );
  }
}

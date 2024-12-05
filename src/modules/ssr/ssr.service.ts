import { readFileSync } from 'fs';

export default class SsrSevice {
  constructor() {}
  async getIndexString() {
    const index = readFileSync('../../public/index.html');
    return index.toString();
  }
}

import { CSVParser } from './index';

import core from '@actions/core';
// import github from '@actions/github';

const ex = new CSVParser();
try {
  ex.processOrders()
    .then(() => ex.customerProducts())
    .then(() => ex.customerRanking());
} catch (error: unknown) {
  ex.errLog(error as Error);
  core.setFailed((error as Error).message);
}

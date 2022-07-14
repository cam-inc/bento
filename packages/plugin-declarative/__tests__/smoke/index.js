'use strict';
const { run } = require('./dev-server');

(() => {
  try {
    run();
  } catch (e) {
    throw e;
  }

  process.on('uncaughtException', (e) => {
    throw e;
  });
})();

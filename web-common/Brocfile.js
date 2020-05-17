
"use strict";

const build = require('@glimmer/build');

let buildOptions = {
  external: ['redux']
};

module.exports = build(buildOptions);
const { name } = require('./package.json');

const debug = require('debug')(name);
const buffer = require('@turf/buffer');
const path = require('path');

const { version } = require(require.resolve('@turf/buffer/package.json'));

module.exports = function _buffer(point, metres) {
    debug(version, point.geometry.coordinates, metres);
    const result = buffer(point, metres / 1000, { units: 'kilometers' });
    result.properties = { version };
    return result;
};

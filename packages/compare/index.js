const { name } = require('./package.json');

const debug = require('debug')(name);
const beforefn = require("@repro/before");
const afterfn = require("@repro/after");
const bbox = require('@turf/bbox').default;

const { featureCollection, point } = require('@turf/helpers');

function both(point, metres) {
    return [
        beforefn(point, metres),
        afterfn(point, metres),
    ];
}

function bboxdiffer(before, after) {
    return JSON.stringify(bbox(before)) !== JSON.stringify(bbox(after));
}

function compare(point, metres) {
    const [before, after] = both(point, metres);

    console.log(JSON.stringify(featureCollection([ point, before, after ])));

    return bboxdiffer(before, after);
}

module.exports = compare;

if (!module.parent) {
    if (compare(point([ 151.75184905529022,-32.936405408671995 ]), 500)) {
        process.exit(1);
    }
}

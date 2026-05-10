/**
 * Sanity checks on package.json — catches config-level bugs that would otherwise
 * only surface for a downstream consumer running `npm start`, `npm publish`, etc.
 */

const test = require('ava');
const pkg = require('../package.json');


test('package.json: start script path is not the typo ".src/"', t => {
    const match = pkg.scripts.start.match(/node\s+(\S+)/);
    t.truthy(match, 'start script should invoke node with a path');

    const path = match[1];
    t.false(
        path.startsWith('.src/'),
        `start script path "${path}" looks like a typo`
    );
});


// `publish` is a reserved npm lifecycle script — defining it would make
// `npm publish` recursively invoke itself.
test('package.json: does not define a script named "publish"', t => {
    t.false(
        Object.prototype.hasOwnProperty.call(pkg.scripts, 'publish'),
        '"publish" shadows the npm lifecycle script and causes recursion'
    );
});

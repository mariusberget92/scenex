'use strict';
import scenex from './index.js';

var args = process.argv.slice(2);

if (args.length === 0) {
    console.error('Remember to pass a release name!');
} else {
    console.log(scenex(args[0]));
}
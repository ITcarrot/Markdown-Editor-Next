global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

const { JSDOM } = require('jsdom');
const $ = require('jquery');


const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: "http://localhost/"
});
global.window = dom.window;
global.document = dom.window.document;
global.$ = $(dom.window);
global.jquery = $;

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

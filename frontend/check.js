const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('./dist/frontend/browser/index.html', 'utf8');

const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable",
  url: "http://localhost:4200/"
});

dom.window.console.error = (...args) => {
  console.log("BROWSER ERROR:", ...args);
};
dom.window.console.warn = (...args) => {
  console.log("BROWSER WARN:", ...args);
};
dom.window.console.log = (...args) => {
  console.log("BROWSER LOG:", ...args);
};

setTimeout(() => {
  console.log("DOM HTML length:", dom.window.document.body.innerHTML.length);
  process.exit(0);
}, 2000);

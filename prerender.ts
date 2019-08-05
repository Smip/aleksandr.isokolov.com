import { environment } from './src/environments/environment';
// Load zone.js for the server.
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { enableProdMode } from '@angular/core';
// Express Engine
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { renderModuleFactory } from '@angular/platform-server';
import { ROUTES } from './static.paths';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';

// for debug
require('source-map-support').install();

const domino = require('domino');
const fs = require('fs');
const path = require('path');
const template = fs.readFileSync(path.join(__dirname, '.', 'dist', 'index.html')).toString();
const win = domino.createWindow(template);
const files = fs.readdirSync(`${process.cwd()}/dist-server`);


global['window'] = win;
// global['window.devicePixelRatio'] = 1;
global['navigator'] = win.navigator;
Object.defineProperty(win, 'devicePixelRatio', {
  value: 1,
});
Object.defineProperty(win.document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});
global['document'] = win.document;
global['CSS'] = null;
// global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
global['Prism'] = null;

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const mainFiles = files.filter((file) => file.startsWith('main'));
const hash = mainFiles[0].split('.')[1];
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./dist-server/main.${hash}`);

const BROWSER_FOLDER = join(process.cwd(), 'static');

// Load the index.html file containing referances to your application bundle.
const index = readFileSync(join('dist', 'index.html'), 'utf8');

let previousRender = Promise.resolve();

// Iterate each route path
ROUTES.forEach((route) => {
  const fullPath = join(BROWSER_FOLDER, route);

  // Make sure the directory structure is there
  if (!existsSync(fullPath)) {
    let syncpath = BROWSER_FOLDER;
    route.split('/').forEach((element) => {
      syncpath = join(syncpath, element);
      if (!existsSync(syncpath)) {
        mkdirSync(syncpath);
      }
    });
  }

  // Writes rendered HTML to index.html, replacing the file if it already exists.
  previousRender = previousRender
    .then((_) =>
      renderModuleFactory(AppServerModuleNgFactory, {
        document: index,
        url: route,
        extraProviders: [
          provideModuleMap(LAZY_MODULE_MAP),
          {
            provide: REQUEST,
            useValue: { cookie: '', headers: {} },
          },
          {
            provide: RESPONSE,
            useValue: {},
          },
          {
            provide: 'ORIGIN_URL',
            useValue: environment.host,
          },
        ],
      }),
    )
    .then((html) => writeFileSync(join(fullPath, 'index.html'), html));
});

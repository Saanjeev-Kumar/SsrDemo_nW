import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
//import mongoose & bodyparser
// $
// import mongoose,{ConnectOptions} from 'mongoose';
const mongoose=require("mongoose");


// import {BodyParser} from 'body-parser'; // export = bodyParser; errror thrown due some it is exorted in node modules.
// $
import { SongRoute } from 'src/routes/songs-route'; // include for ts file
import { AppServerModule } from './src/main.server';

// const songRoutes= require('src/routes/songs-route');
const bodyparser = require('body-parser') 
const cors = require("cors");
const appp = express();
// $
const songRoute:SongRoute = new SongRoute();

// const songRoute = new songRoutes();

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/ssrDemo/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // $
  songRoute.songsRouteGetPost();
  // songRoute.songsRouteGetPost(app());

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// mongoose.connect("mongodb+srv://Saanjeev:NKEx9WL40uiYJumc@cluster0.iqret.mongodb.net/ssrsong").then(() => {
//   console.log('mongoose connected successfully'); 
//  }).catch((error) => console.log(error));
// $
mongoose.connect("mongodb+srv://Saanjeev:ZEOARP1692zPoaJC@cluster0.iqret.mongodb.net/ssrsong",
{
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(() => {
 console.log('mongoose connected successfully'); 
}).catch(() => console.log("error connecting in Mongoose"));

// app().use(bodyparser.json());
// app().use(bodyparser.urlencoded({extended: true}));
// $
appp.use(bodyparser.json());
appp.use(bodyparser.urlencoded({extended: true}));
appp.use(cors());

// const mongoose = require("mongoose");
// const URL = "mongodb+srv://saanjeev:ZEOARP1692zPoaJC@cluster0.iqret.mongodb.net/challenge";


// function mongooseConnect() {
//     mongoose.connect(URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then(
//         console.log("director Connected...")
//     ).catch(console.log("error connecting"));
    
// }

// module.exports = { mongooseConnect}





// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
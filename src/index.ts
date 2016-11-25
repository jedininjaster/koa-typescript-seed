"use strict";

// import * as B from 'bluebird';
import * as Koa from 'koa';
import serverRouter from './server';
import * as bodyParser from 'koa-bodyparser';
import * as r from 'rethinkdb';
import Application = require("~koa/lib/application");

const dbHost = 'localhost';
const dbPort = 28015;

function scaffoldDatabase(){
  return new Promise((resolve, reject) => {
    r.connect({host: dbHost, port: dbPort}, (err, conn) => {
      if(err) {
        console.error(err);
        return reject(err);
      }
      console.info('connected to db');
      resolve(conn);
    });
  });
}

let app = new Koa();
app.use(bodyParser());

app.use(async function (ctx, next) {
  const beginningOfRequest = Date.now();
  try {
    await next();
    const lengthOfRequest = Date.now() - beginningOfRequest;
    console.log(lengthOfRequest);
  } catch (err) {
    ctx.body = {message: err.message};
    ctx.status = err.status || 500;
  }
});

app
  .use(serverRouter.routes())
  .use(serverRouter.allowedMethods());

async function boot(app: Application){
  await scaffoldDatabase();
  app.listen(3000, () => {
    console.log('listening on 3000');
  });
}

boot(app);
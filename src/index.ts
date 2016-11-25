"use strict";

// import * as B from 'bluebird';
import * as Koa from 'koa';
import serverRouter from './server';
import * as bodyParser from 'koa-bodyparser';

function scaffoldDatabase(){
  
}

let app = new Koa();
app.use(bodyParser());

app.use(async function (ctx, next) {
  console.log(Date.now());
  try {
    await next();
  } catch (err) {
    ctx.body = {message: err.message};
    ctx.status = err.status || 500;
  }
});

app
  .use(serverRouter.routes())
  .use(serverRouter.allowedMethods());

app.listen(3000, () => {
  console.log('listening on 3000');
});

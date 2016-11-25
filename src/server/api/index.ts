"use strict";
 
import * as KoaRouter from 'koa-router';
import v0Router from './v0';
import {Context} from "~koa/lib/context";
let FB = require('fb');

let apiRouter = new KoaRouter();

apiRouter.get('/info', async function(ctx, next) {
  await next();
  ctx.body = '/api';
});

apiRouter.use('/v0', v0Router.routes());

apiRouter.post('/test', async function(ctx: Context, next) {
  await next();
  let token = ctx.body.token;
  let options = {
    appId: '1615979615386841',
    accessToken: token,
    appSecret: '1e4577f7dda9cff447ea77ad6f6d378f',
  };
  let fb = new FB.Facebook(options);

  return new Promise((resolve, reject) => {
    fb.api('me', function (res) {
      if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
      }
      console.log(res.id);
      console.log(res.name);
      ctx.body = res;
      setTimeout(() => {
        resolve(res);
      }, 2000);
    });
  });
});

export default apiRouter;

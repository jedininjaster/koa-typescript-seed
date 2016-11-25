"use strict";

import * as KoaRouter from 'koa-router';
let v0Router = new KoaRouter();

v0Router.get('/info', async function (ctx, next) {
  ctx.body = '/v0';
});

export default v0Router;




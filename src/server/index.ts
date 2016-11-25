"use strict";

import * as KoaRouter from 'koa-router';
import apiRouter from './api';

let serverRouter = new KoaRouter();

/*
 Want to have an endpoint that returns metadata about every endpoint

 possible ways to specify that the server should return metadata:
 1. pass a header?
 2. have a /info /meta /paths or something standard that can be called
 3.

 metadata I want shown
 1. paths -> the next layer of routes
 2. description (optional)
 3. models that might get returned
 4. operations available
 5. ...?

 */

serverRouter.get('/info', async function (ctx, next) {
  await next();
  ctx.body = '/server';
});

serverRouter.use('/api', apiRouter.routes());

export default serverRouter;
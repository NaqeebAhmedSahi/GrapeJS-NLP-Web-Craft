import express from 'express';
import {
  changeContent,
  create,
  update,
  deletePageRecord,
  details,
  list,
  loadContent,
  storePagesController,
} from './page.controller';

const pageRoute = express.Router();
pageRoute.post('/', create);
pageRoute.post('/:pageId/content', changeContent);

pageRoute.put('/:pageId', update);

pageRoute.delete('/:pageId', deletePageRecord);

pageRoute.get('/:pageId', details);
pageRoute.get('/', list);
// Route to store pages from a website
pageRoute.post('/store', storePagesController);


pageRoute.get('/:pageId/content', loadContent);

export default pageRoute;

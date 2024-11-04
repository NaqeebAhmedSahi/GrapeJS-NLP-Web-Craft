import express from 'express';
import {
  changeContent,
  create,
  update,
  deletePageRecord,
  details,
  list,
  loadContent,
  downloadAllPages, // Import the new function
} from './page.controller';

const pageRoute = express.Router();
pageRoute.post('/', create);

pageRoute.post('/:pageId/content', changeContent);

pageRoute.put('/:pageId', update);

pageRoute.delete('/:pageId', deletePageRecord);

pageRoute.get('/:pageId', details);
pageRoute.get('/', list);
pageRoute.get('/:pageId/content', loadContent);
pageRoute.get('/download/all', downloadAllPages); 

export default pageRoute;

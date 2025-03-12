import express from 'express';
import {authRoutes} from './authRoutes.js';
import {albumRoutes} from './albumRoutes.js';
import {mediaRoutes} from './mediaRoutes.js';

const routes = express.Router();
console.log('router');
routes.use('/auth', authRoutes);
routes.use('/albums', albumRoutes);
routes.use('/media', mediaRoutes);

export default routes;

import controllers from './list.controller.js';
import express from 'express';

const router = express.Router();

router.route('/')
.get(controllers.getAll)
.post(controllers.create)

router.route(':id')
.get(controllers.getOne)
.put(controllers.update)
.delete(controllers.remove)
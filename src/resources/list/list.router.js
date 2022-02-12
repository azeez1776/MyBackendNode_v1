import controllers from './list.controller.js';
import express from 'express';

const router = express.Router();

router.route('/')
.get(controllers.getAll)
.post(controllers.create)
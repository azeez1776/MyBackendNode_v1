import controller from './item.controller.js';
import {Router} from "express";

const router = Router();

router
.route('/')
.get(controller.getAll)

router
.route('/:id')
.get(controller.getOne)

export default router;
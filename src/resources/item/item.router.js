import controller from './item.controller.js';
import {Router} from "express";

const router = Router();

router
.route('/')
    .get(controller.getAll)
    .post(controller.create)


router
.route('/:id')
    .get(controller.getOne)
    .delete(controller.remove)
    .put(controller.update)

export default router;
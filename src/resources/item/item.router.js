import controller from './item.controller.js';
import {Router} from "express";

const router = Router();

router
.route('/')
.get(controller.getAll)
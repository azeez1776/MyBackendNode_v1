import {isFunction} from "lodash";
import crudController from '../list.controller.js';

describe("Testing the list controller", ()=> {
    test("testing the crud functionality",()=>{
        const cruds = [
            'getOne',
            'getAll',
            'update',
            'remove',
            'create'
        ];
        cruds.forEach(action => {
            expect(isFunction(crudController[action])).toBe(true);
        })

    })
})
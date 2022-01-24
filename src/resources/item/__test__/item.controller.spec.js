import { toBindingIdentifierName } from "@babel/types";
import { isFunction } from "lodash";
import crudController from '../item.controller';

describe('item controllers', () => {
    test('Testing crud for items', () => {
        const cruds = [
            'getOne',
            'getAll',
            'create',
            'remove',
            'update'
        ]

        cruds.forEach(name => {
            expect(isFunction(crudController[name])).toBe(true)
        })
    })
})
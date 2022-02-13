import {List} from '../list.model.js';
import mongoose from 'mongoose';

describe("Testing List Schema", () => {
    test("testing list name", () => {
        const name = List.schema.obj.name;
        expect(name).toEqual({
            name:{
                type:String,
                required:true,
                maxLength:50,
                trim:true
            }
        })
    })

    test("testing list description", () => {
            const description = List.schema.obj.description;
            expect(description).toEqual(String)
        }
        )

    test("Testing list createdBy part", () => {
        const createdBy = List.schema.obj.createdBy;
        expect(createdBy).toEqual({
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user',
            required: true
        })
    })

})
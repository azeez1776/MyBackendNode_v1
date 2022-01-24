import mongoose from "mongoose"
import { Item } from "../item.model"

describe('Item Model', () => {
    test('Testing item name', () => {
        const name = Item.schema.obj.name;
        expect(name).toEqual({
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        })
    })

    test('Testing item notes', () => {
        const notes = Item.schema.obj.notes;
        expect(notes).toEqual(String)
    })

    test('Testing Date', () => {
        const due = Item.schema.obj.due;
        expect(due).toEqual(Date)
    })

    test('Testing Created by', () => {
        const createdBy = Item.schema.obj.createdBy;
        expect(createdBy).toEqual({
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user',
            required: true
        })
    })
})
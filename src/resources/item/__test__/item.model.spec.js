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
        expect(notes).toEqual({
            type: String,
        })
    })

    test('Testing Date', () => {
        const due = Item.schema.obj.due;
        expect(due).toEqual({
            type: Date,
        })
    })
})
import mongoose from 'mongoose';


const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    notes: String,
    due: Date,
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    }
},
    { timestamps: true }
)

export const Item = mongoose.model('item', itemSchema);
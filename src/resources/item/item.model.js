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
    ,
        list:{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'list',
            required:true
        }

},
    { timestamps: true }
);

itemSchema.index({list:1, name:1}, {unique:true});

export const Item = mongoose.model('item', itemSchema);
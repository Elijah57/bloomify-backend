import {Schema, model} from 'mongoose';

const contentSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
},
  text: { 
    type: String, 
    required: true 
},
  category: { 
    type: String, 
    enum: ['affirmation', 'quote', 'motivation'], 
    required: true 
},
  sharedWith: [{ type: String }],
  createdAt: { 
    type: Date, 
    default: Date.now },
});

const Content = model('Content', contentSchema);

export default Content;
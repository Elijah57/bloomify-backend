import {Schema, model} from 'mongoose';

const goalSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
},
  title: { 
    type: String, 
    required: true 
},
  description: { 
    type: String 
},
  progress: { 
    type: Number, 
    default: 0 
},
  targetDate: { 
    type: Date 
},
  createdAt: { 
    type: Date, 
    default: Date.now 
},
});

const Goal = model('Goal', goalSchema);
export default Goal;
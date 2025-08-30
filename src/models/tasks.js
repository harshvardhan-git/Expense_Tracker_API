import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }, 
  category: {
    type: String,
    required: true
  }, 
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  created_at: {
    type: Date,
    default: null
  },
});


export default mongoose.model('Task', TaskSchema);
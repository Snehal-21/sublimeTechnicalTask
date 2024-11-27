import mongoose,{Schema} from "mongoose";

const taskSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    status: { 
        type: String, 
        enum: ['pending', 'completed'], 
        default: 'pending' 
    },
    dueDate: { 
        type: Date, 
        required: true 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
  }, {
    timestamps: true,
  });
  
  taskSchema.index({ status: 1, dueDate: 1 }); // Index for efficient querying

  export default mongoose.model("Task",taskSchema);
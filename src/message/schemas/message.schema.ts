import * as mongoose from 'mongoose'
const Mixed = mongoose.Schema.Types.Mixed
export const MessageSchema = new mongoose.Schema({
  MsgType: String,
  Content: String,
  ToUserName: String,
  Reply: Mixed,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

MessageSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

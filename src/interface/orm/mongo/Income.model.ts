import { Schema, Types, model } from 'mongoose';
import { IIncome } from '../../../domain/models';

const schema = new Schema<IIncome>({
  amount: { type: Number, required: true },
  source: { type: String, required: true },
  user: { type: Types.ObjectId, required: true },
  team: { type: Types.ObjectId, required: true },
});

schema.pre('find', function (next) {
  this.populate(['user', 'team']);
  next();
});

schema.post('find', function (docs, next) {
  for (const doc of docs) {
    if (!doc.user) doc.user = null;
    if (!doc.team) doc.team = null;
  }
  next();
});

export default model('Income', schema);

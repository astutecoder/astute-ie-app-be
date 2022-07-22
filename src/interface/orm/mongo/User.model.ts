import { Schema, Types, model } from 'mongoose';
import { IUser } from '../../../domain/models';

const schema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  team: { type: Types.ObjectId, required: true, ref: 'Team' },
});

schema.pre('find', function (next) {
  this.populate('team');
  next();
});

schema.post('find', async function (docs, next) {
  for await (const doc of docs) {
    if (!doc.team) {
      doc.team = null;
    }
  }
  next();
});

export default model('User', schema);

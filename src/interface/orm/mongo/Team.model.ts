import mongoose from 'mongoose';
import { ITeam } from '../../../domain/models';

const schema = new mongoose.Schema<ITeam>({
  name: { type: String, required: true },
});

export default mongoose.model('Team', schema);

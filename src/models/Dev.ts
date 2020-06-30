import mongoose from 'mongoose';
import Pointschema from './utils/PointSchema';

const Devschema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  html_url: String,
  techs: [String],
  location: {
    type: Pointschema,
    index: '2dsphere',
  },
});

export default mongoose.model('Dev', Devschema);

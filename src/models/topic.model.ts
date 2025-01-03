import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);

const topicSchema = new mongoose.Schema(
  {
    title: String,
    avatar: String,
    description: String,
    slug: {
      type: String,
      slug: 'title',
      unique: true,
    },
    status: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true },
);

const Topic = mongoose.model('Topic', topicSchema);
export default Topic;

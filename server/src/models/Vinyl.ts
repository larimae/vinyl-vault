import { Schema, model, Document } from 'mongoose';

// Define an interface for the Vinyl document
interface IReview extends Document {
  reviewText: string;
  user: Schema.Types.ObjectId[];
  vinyl: Schema.Types.ObjectId[];
}

interface IVinyl extends Document {
  vinylText: string;
  artist: string;
  album: string;
  cover: string;
  song: string;
  genre: string;
  reviews: IReview[];
}

// Define the schema for the Review subdocument
const reviewSchema = new Schema<IReview>(
  {
    reviewText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    user: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    vinyl: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Vinyl',
      },
    ],
  },
  {
    _id: false,
    toJSON: { getters: true },
    toObject: { getters: true },
    timestamps: false,
  }
);

// Define the schema for the Vinyl document
const vinylSchema = new Schema<IVinyl>(
  {
    vinylText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    artist: {
      type: String,
      required: true,
      trim: true,
    },
    album: {
      type: String,
      required: true,
      trim: true,
    },
    cover: {
      type: String,
      required: true,
      trim: true,
    },
    song: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: false,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const Vinyl = model<IVinyl>('Vinyl', vinylSchema);

export default Vinyl;

import { Vinyl, User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js'; 

// Define types for the arguments
interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface VinylSearchArgs {
  input: string;
}

interface UserArgs {
  username: string;
}

interface VinylArgs {
  vinylId: string;
}

// interface AddVinylArgs {
//   input:{
//     vinylText: string;
//     artist: string;
//   }
// }

interface AddReviewArgs {
  vinylId: string;
  reviewText: string;
}

interface RemoveReviewArgs {
  vinylId: string;
  reviewId: string;
}

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('vinyls');
    },
    user: async (_parent: any, { username }: UserArgs) => {
      return User.findOne({ username }).populate('vinyls');
    },
    vinyls: async () => {
      return await Vinyl.find().sort({ createdAt: -1 });
    },
    vinyl: async (_parent: any, { vinylId }: VinylArgs) => {
      return await Vinyl.findOne({ _id: vinylId });
    },
    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their Vinyls
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('vinyls');
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },
    reviewsByUser: async (_parent: any, _args: any, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in.');
      }
    
      return Vinyl.find({ 'reviews.user': context.user._id })
        .populate({
          path: 'reviews',
          populate: {
            path: 'vinyl', // Populate the vinyl field for each review
            model: 'Vinyl',
            select: '_id vinylText artist album', // Only include these fields
          },
          match: { user: context.user._id },
        })
        .then((vinyls) => vinyls.flatMap((vinyl) => vinyl.reviews));
    },
  },

  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided username, email, and password
      const user = await User.create({ ...input });
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });
    
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
    
      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Sign a token with the user's information
      const token = signToken(user.username, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    findVinyl: async (_parent: any, { input }: VinylSearchArgs, context: any) :Promise<any> => {
      try {
        if (context.user) {
          console.log(input);
        const vinyl = await Vinyl.find({
          $or: [
            { album: input },
            { artist: input },
            { song: input },
            { genre: input },
          ]
        }) || {};
        console.log(vinyl);
        if (vinyl) return vinyl
      }
      throw AuthenticationError;
      ('You need to be logged in!');
      } catch (error) {
        console.error(error);
      }
    },
    // addVinyl: async (_parent: any, { input }: AddVinylArgs, context: any) => {
    //   if (context.user) {
    //     const vinyl = await Vinyl.create({ ...input });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { vinyls: vinyl._id } }
    //     );

    //     return vinyl;
    //   }
    //   throw AuthenticationError;
    //   ('You need to be logged in!');
    // },
    addReview: async (_parent: any, { vinylId, reviewText }: AddReviewArgs, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to add a review.');
      }
    
      const newReview = {
        reviewText,
        user: context.user._id,
      };
    
      // Save the review and update the Vinyl's reviews
      const vinyl = await Vinyl.findByIdAndUpdate(
        vinylId,
        { $push: { reviews: newReview } },
        { new: true, runValidators: true }
      );
    
      if (!vinyl) {
        throw new Error('Vinyl not found');
      }

      return vinyl;
    },
    // removeVinyl: async (_parent: any, { vinylId }: VinylArgs, context: any) => {
    //   if (context.user) {
    //     const vinyl = await Vinyl.findOneAndDelete({
    //       _id: vinylId,
    //       vinylAuthor: context.user.username,
    //     });

    //     if(!vinyl){
    //       throw AuthenticationError;
    //     }

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { vinyls: vinyl._id } }
    //     );

    //     return vinyl;
    //   }
    //   throw AuthenticationError;
    // },
    removeReview: async (_parent: any, { vinylId, reviewId }: RemoveReviewArgs, context: any) => {
      if (context.user) {
        return Vinyl.findOneAndUpdate(
          { _id: vinylId },
          {
            $pull: {
              reviews: {
                _id: reviewId,
              reviewAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

export default resolvers;

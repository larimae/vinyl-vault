const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    vinyls: [Vinyl]!
  }

  type Vinyl {
    _id: ID
    vinylText: String
    artist: String
    song: String
    album: String
    cover: String
    genre: String
    reviews: [Review]!
  }

  type Review {
    _id: ID
    reviewText: String
    createdAt: String
  }

  input VinylInput {
    vinylText: String!
    artist: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    vinyls: [Vinyl]!
    vinyl(vinylId: ID!): Vinyl
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addVinyl(input: VinylInput!): Vinyl
    addReview(vinylId: ID!, reviewText: String!): Vinyl
    removeVinyl(vinylId: ID!): Vinyl
    removeReview(vinylId: ID!, reviewId: ID!): Vinyl
    findVinyl(input: String): [Vinyl]! 
  }
`;

export default typeDefs;

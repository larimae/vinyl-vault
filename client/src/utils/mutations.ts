import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
  addUser(input: $input) {
    user {
      username
      _id
    }
    token
  }
}
`;
// dont use
export const ADD_VINYL = gql`
  mutation AddVinyl($input: VinylInput!) {
    addVinyl(input: $input) {
      _id
      vinylText
      artist
      createdAt
      reviews {
        _id
        reviewText
      }
    }
  }
`;
//dont use

export const ADD_REVIEW = gql`
  mutation addReview($vinylId: ID!, $reviewText: String!) {
    addReview(vinylId: $vinylId, reviewText: $reviewText) {
      _id
      vinylText
      artist
      createdAt
      reviews {
        _id
        reviewText
        createdAt
      }
    }
  }
`;

export const SEARCH_VINYL = gql`
mutation Mutation($input: String) {
  findVinyl(input: $input) {
    album
    artist
    cover
    genre
    song
    vinylText
    _id
  }
}`;
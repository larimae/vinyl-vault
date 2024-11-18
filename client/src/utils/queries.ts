import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      vinyls {
        _id
        vinylText
        createdAt
      }
    }
  }
`;

export const QUERY_VINYLS = gql`
  query Query {
  vinyls {
    _id
    album
    artist
    cover
    genre
    song
    vinylText
  }
}`;

export const QUERY_SINGLE_VINYL = gql`
 query Vinyl($vinylId: ID!) {
  vinyl(vinylId: $vinylId) {
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

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      vinyls {
        _id
        vinylText
        artist
        createdAt
      }
    }
  }
`;


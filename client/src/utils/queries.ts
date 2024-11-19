import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      vinyls {
        _id
        album
        artist
        cover
        genre
        song
        vinylText
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
    song
    album
    cover
    genre
    reviews {
      _id
      reviewText
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
        song
        album
        cover
        genre
        reviews {
          _id
          reviewText
    }
      }
    }
  }
`;

export const QUERY_REVIEWS = gql`
  query GetReviewsByUser {
    reviewsByUser {
      _id
      reviewText
      user {
        username
      }
      vinyl {
        _id
        vinylText
        artist
        album
      }
    }
  }`;


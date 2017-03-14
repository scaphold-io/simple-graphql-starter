import {
  Posts,
  Authors
} from './data';
import { find, filter } from 'lodash';

const resolverMap = {
  Query: {
    posts() {
      return Posts;
    },
  },
  Mutation: {
    upvotePost(_, { postId }) {
      const post = find(Posts, { id: parseInt(postId, 10) });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },
  Author: {
    posts(author) {
      return filter(Posts, { authorId: author.id });
    },
  },
  Post: {
    author(post) {
      return find(Authors, { id: post.authorId });
    },
  },
};

export default resolverMap;
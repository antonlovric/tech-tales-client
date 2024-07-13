import { redisClient } from '../lib/redis';

export function incrementPostVisitCount(postId: number) {
  redisClient.incr(`post:${postId}:visit`);
}
export function incrementPostLikeCount(postId: number) {
  redisClient.incr(`post:${postId}:like`);
}
export function incrementPostCommentCount(postId: number) {
  redisClient.incr(`post:${postId}:comment`);
}
export function incrementPostShareCount(postId: number) {
  redisClient.incr(`post:${postId}:share`);
}

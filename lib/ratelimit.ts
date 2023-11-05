import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const newRateLimit = (tokens: number = 2, seconds: number = 120) => {
  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(tokens, `${seconds}s`),
  });

  return ratelimit;
};

export default newRateLimit;

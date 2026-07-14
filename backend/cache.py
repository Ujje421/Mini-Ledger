import os
import redis
import logging

logger = logging.getLogger(__name__)
redis_client = redis.Redis.from_url(os.getenv("REDIS_URL", "redis://localhost:6379/0"), decode_responses=True)

def invalidate_summary_cache():
    try:
        redis_client.delete("summary")
    except redis.exceptions.RedisError as e:
        logger.warning(f"Cache invalidation failed: {e}")

// cacheKeyManager.ts
let cacheKeys: Set<string> = new Set();

export const addCacheKey = (key: string) => {
  cacheKeys.add(key);
};

export const getCacheKeys = () => {
  return Array.from(cacheKeys);
};

import { ICache } from "./interfaces/cache.interface";

export class CacheService<K> implements ICache<K> {
  private cacheMap = new Map<K, any>();

  set<V>(key: K, value: V): void {
    this.cacheMap.set(key, value);
  }

  get<V>(key: K): V | undefined {
    return this.cacheMap.get(key) as V;
  }

  has(key: K): boolean {
    return this.cacheMap.has(key);
  }

  delete(key: K): boolean {
    return this.cacheMap.delete(key);
  }

  clear(): void {
    this.cacheMap.clear();
  }
}

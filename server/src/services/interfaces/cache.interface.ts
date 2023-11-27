export interface ICache<K> {
  set<V>(key: K, value: V): void;
  get<V>(key: K): V | undefined;
  has(key: K): boolean;
  delete(key: K): boolean;
  clear(): void;
}

export interface IBaseHandler<T> {
  handle(message: T): Promise<void>;
}

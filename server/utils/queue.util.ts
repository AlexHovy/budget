import { connect, Channel, Connection, ConsumeMessage } from "amqplib";
import { IBaseHandler } from "../handlers/bases/base.handler";
import { InternalServerError } from "./error.util";
import { SettingsConfig } from "../configs/settings.config";

export class Queue<T> {
  private channel: Channel | null = null;
  private queueName: string | null = null;
  private handler: IBaseHandler<T> | null = null;

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    try {
      const uri = SettingsConfig.getRabbitMQUri();
      const connection: Connection = await connect(uri);
      this.channel = await connection.createChannel();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async setHandler(handler: IBaseHandler<T>): Promise<void> {
    try {
      this.queueName = this.getClassName(handler);
      this.handler = handler;

      if (!this.channel) return;

      await this.channel.assertQueue(this.queueName);

      this.consumeMessages();
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  async enqueue(message: T): Promise<void> {
    try {
      if (!this.channel || !this.queueName) return;

      await this.channel.sendToQueue(
        this.queueName,
        Buffer.from(JSON.stringify(message))
      );
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  private async consumeMessages(): Promise<void> {
    try {
      if (!this.channel || !this.queueName) return;

      await this.channel.consume(
        this.queueName,
        async (msg: ConsumeMessage | null) => {
          if (msg && this.handler && this.channel) {
            const message: T = JSON.parse(msg.content.toString());
            await this.handler.handle(message);
            this.channel.ack(msg);
          }
        }
      );
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }

  private getClassName<T>(instance: IBaseHandler<T>): string {
    return instance.constructor.name;
  }
}

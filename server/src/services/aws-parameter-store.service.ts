import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import { AWSRegions } from "../constants/aws-regions";
import { InternalServerError } from "../utils/error.util";

export class AWSParameterStoreService {
  private ssmClient: SSMClient;

  constructor(region: string = AWSRegions.EU_NORTH_1) {
    this.ssmClient = new SSMClient({ region });
  }

  async getParameter(
    name: string,
    withDecryption: boolean = true
  ): Promise<string | undefined> {
    const command = new GetParameterCommand({
      Name: name,
      WithDecryption: withDecryption,
    });

    try {
      const response = await this.ssmClient.send(command);
      return response.Parameter?.Value;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}

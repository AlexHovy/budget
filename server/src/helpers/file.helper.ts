import { promises as fsPromises } from "fs";
import * as path from "path";
import { InternalServerError } from "../utils/error.util";

export class FileHelper {
  async readFile(filePath: string): Promise<string> {
    const fullFilePath = path.join(__dirname, filePath);
    try {
      return await fsPromises.readFile(fullFilePath, "utf8");
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new InternalServerError(errorMessage);
    }
  }
}

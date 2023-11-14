import { ErrorNames } from "../constants/error-names";
import { HttpStatusCode } from "../constants/http-status-codes";

export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: number;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    httpCode: number,
    isOperational: boolean,
    description: string
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

export class InternalServerError extends BaseError {
  constructor(description = "Internal Server Error") {
    super(
      ErrorNames.INTERNAL_SERVER_ERROR,
      HttpStatusCode.INTERNAL_SERVER,
      true,
      description
    );
  }
}

export class BadRequestError extends BaseError {
  constructor(description = "Bad Request") {
    super(
      ErrorNames.BAD_REQUEST_ERROR,
      HttpStatusCode.BAD_REQUEST,
      true,
      description
    );
  }
}

export class UnauthorizedError extends BaseError {
  constructor(description = "Unauthorized") {
    super(
      ErrorNames.UNAUTHORIZED_ERROR,
      HttpStatusCode.UNAUTHORIZED,
      true,
      description
    );
  }
}

export class ForbiddenError extends BaseError {
  constructor(description = "Forbidden Access") {
    super(
      ErrorNames.FORBIDDEN_ERROR,
      HttpStatusCode.FORBIDDEN,
      true,
      description
    );
  }
}

export class NotFoundError extends BaseError {
  constructor(description = "Not Found") {
    super(
      ErrorNames.NOT_FOUND_ERROR,
      HttpStatusCode.NOT_FOUND,
      true,
      description
    );
  }
}

export class AlreadyExistsError extends BaseError {
  constructor(description = "Already Exists") {
    super(
      ErrorNames.ALREADY_EXISTS_ERROR,
      HttpStatusCode.ALREADY_EXISTS,
      true,
      description
    );
  }
}

export const CODE = {
  GENERAL: 'general',
} as const;
export type Code = typeof CODE[keyof typeof CODE];

export class CustomError extends Error {
  code: Code;
  constructor(code: Code, message: string) {
    super(message);
    this.code = code;
  }
}

export class GeneralError extends CustomError {
  constructor(message: string) {
    super(CODE.GENERAL, message);
  }
}

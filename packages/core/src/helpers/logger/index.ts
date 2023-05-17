const LEVEL = {
  TRACE: 'trace', // 10
  DEBUG: 'debug', //20
  INFO: 'info', //30
  WARN: 'warn', //40
  ERROR: 'error', //50
  FATAL: 'fatal', //60
} as const;
type Level = typeof LEVEL[keyof typeof LEVEL];

export const NAMESPACE = {
  GENERAL: 'general',
  // Add here if needed.
} as const;
type Namespace = typeof NAMESPACE[keyof typeof NAMESPACE];

type Payload = {
  messages: unknown[];
  namespace?: Namespace;
};

const log = (level: Level, namespace: Namespace, messages: unknown[]): void => {
  // There is no function named `fatal` in Console interface so just use error function instead.
  if (level === LEVEL.FATAL) {
    console.error(`[${level}][${namespace}]: `, ...messages);
  } else {
    console[level](`[${level}][${namespace}]: `, ...messages);
  }
};

export const trace = ({
  messages,
  namespace = NAMESPACE.GENERAL,
}: Payload): void => {
  log(LEVEL.TRACE, namespace, messages);
};

export const debug = ({
  messages,
  namespace = NAMESPACE.GENERAL,
}: Payload): void => {
  log(LEVEL.DEBUG, namespace, messages);
};

export const info = ({
  messages,
  namespace = NAMESPACE.GENERAL,
}: Payload): void => {
  log(LEVEL.INFO, namespace, messages);
};

export const warn = ({
  messages,
  namespace = NAMESPACE.GENERAL,
}: Payload): void => {
  log(LEVEL.WARN, namespace, messages);
};

export const error = ({
  messages,
  namespace = NAMESPACE.GENERAL,
}: Payload): void => {
  log(LEVEL.ERROR, namespace, messages);
};

export const fatal = ({
  messages,
  namespace = NAMESPACE.GENERAL,
}: Payload): void => {
  log(LEVEL.FATAL, namespace, messages);
};

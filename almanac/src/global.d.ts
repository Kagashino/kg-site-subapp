declare module 'programmer-almanac-generator';

declare interface process {
  [key: string]: any,
  env: {
    SUB_APP_NAME: string
  }
}

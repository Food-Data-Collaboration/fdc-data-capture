import {
  EXPERIMENTAL_DATA_CAPTURE_EXPORT_URL,
  EXPERIMENTAL_DATA_CAPTURE_PASSWORD,
  EXPERIMENTAL_DATA_CAPTURE_USERNAME,
  EXPERIMENTAL_DATA_CAPTURE_VERBOSE,
} from '../src/environment.ts';

export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [EXPERIMENTAL_DATA_CAPTURE_EXPORT_URL]?: string;
      [EXPERIMENTAL_DATA_CAPTURE_VERBOSE]?: boolean;
      [EXPERIMENTAL_DATA_CAPTURE_USERNAME]?: string;
      [EXPERIMENTAL_DATA_CAPTURE_PASSWORD]?: boolean;
      ENV?: 'test' | 'dev' | 'prod';
    }
  }
}

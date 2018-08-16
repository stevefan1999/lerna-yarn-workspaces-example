import { awesomeFn } from "@foo/x-core";

export function cli(): Promise<boolean> {
  awesomeFn();
  return Promise.resolve(true);
}

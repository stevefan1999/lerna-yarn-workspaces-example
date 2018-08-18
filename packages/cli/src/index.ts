import { awesomeFn } from '@foo/core'

export function cli(): Promise<boolean> {
  awesomeFn()
  return Promise.resolve(true)
}

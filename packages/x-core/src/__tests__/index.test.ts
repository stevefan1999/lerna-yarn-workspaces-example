import { awesomeFn } from '@foo/x-core'

describe('x-core', () => {
  test('should log', () => {
    awesomeFn();
    (expect(console) as any).toHaveLoggedWith('Hello')
  })
})

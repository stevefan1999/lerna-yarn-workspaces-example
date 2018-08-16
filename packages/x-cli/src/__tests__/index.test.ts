import '@wordpress/jest-console'
import { cli } from '@foo/x-cli'

describe('x-cli', () => {
  test('should run fine', async () => {
    expect(await cli()).toBe(true)
    expect(console).toHaveLoggedWith('Hello')
  })
})

import { AsyncTest, Expect, SpyOn, TestFixture } from 'alsatian'
import { cli } from '@foo/cli'

@TestFixture('CLI test')
export class IndexTest {
  @AsyncTest()
  async 'should run fine'(): Promise<void> {
    SpyOn(console, 'log')
    Expect(await cli()).toBe(true)
    Expect(console.log).toHaveBeenCalledWith('Hello')
  }
}

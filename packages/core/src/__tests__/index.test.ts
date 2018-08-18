import { Expect, SpyOn, Test, TestFixture } from 'alsatian'
import { awesomeFn } from '@foo/core'

@TestFixture('test core')
export class IndexTest {
  @Test()
  'should log'(): void {
    SpyOn(console, 'log')
    awesomeFn()
    Expect(console.log).toHaveBeenCalledWith('Hello')
  }
}

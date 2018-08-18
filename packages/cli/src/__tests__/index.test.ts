import {
  AsyncTest, Expect, RestorableFunctionSpy, SpyOn, Teardown, TestFixture
} from 'alsatian' // prettier-ignore
import { cli } from '@foo/cli'

@TestFixture('CLI test')
export class IndexTest {
  private spies: Array<RestorableFunctionSpy> = []

  @Teardown
  teardown(): void {
    this.spies.map(_ => _.restore())
  }

  addSpies(...args: RestorableFunctionSpy[]): void {
    ;(this.spies = args).map(_ => _.andStub())
  }

  @AsyncTest()
  async 'should run fine'(): Promise<void> {
    this.addSpies(SpyOn(console, 'log'))
    Expect(await cli()).toBe(true)
    Expect(console.log).toHaveBeenCalledWith('Hello')
  }
}

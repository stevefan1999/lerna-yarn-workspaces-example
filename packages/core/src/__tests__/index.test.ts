import {
  Expect, RestorableFunctionSpy, SpyOn, Teardown, Test, TestFixture
} from 'alsatian' // prettier-ignore
import { awesomeFn } from '@foo/core'

@TestFixture('test core')
export class IndexTest {
  private spies: Array<RestorableFunctionSpy> = []

  @Teardown
  teardown(): void {
    this.spies.map(_ => _.restore())
  }

  addSpies(...args: RestorableFunctionSpy[]): void {
    ;(this.spies = args).map(_ => _.andStub())
  }

  @Test()
  'should log'(): void {
    this.addSpies(SpyOn(console, 'log'))
    awesomeFn()
    Expect(console.log).toHaveBeenCalledWith('Hello')
  }
}

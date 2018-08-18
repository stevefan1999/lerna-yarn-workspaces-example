import { TestRunner, TestSet } from 'alsatian'
import { TapBark } from 'tap-bark'

/* tslint:disable */
async function main() {
  try {
    const testSet = TestSet.create()
    testSet.addTestsFromFiles('./packages/**/*.{test,spec}.[jt]s?(x)')

    const testRunner = new TestRunner()

    testRunner.outputStream
      .pipe(TapBark.create().getPipeable())
      .pipe(process.stdout)

    await testRunner.run(testSet)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()

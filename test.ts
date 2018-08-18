import { TestRunner, TestSet } from 'alsatian'
import { TapBark } from 'tap-bark'

/* tslint:disable */
async function main() {
  const testSet = TestSet.create()
  testSet.addTestsFromFiles(
    './packages/**/src/**/__tests__/**/*.{test,spec}.{ts,tsx}'
  )

  const testRunner = new TestRunner()

  testRunner.outputStream
    .pipe(TapBark.create().getPipeable())
    .pipe(process.stdout)

  await testRunner.run(testSet)
}

main()
  .then()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })

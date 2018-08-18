export function awesomeFn(): void {
  console.log('Hello')
}

export { foo as any } from './inner'
export { default as bar } from './inner2/inner'

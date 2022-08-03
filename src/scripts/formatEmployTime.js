export const formatEmployTime = employTime => {
  if (employTime) {
    const [ first, second ] = employTime.toString().split('.')
    return `${ first.padStart(2, '0') }.${ second.padEnd(2, '0') }`
  }

  return null
}

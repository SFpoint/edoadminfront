export const debounce = (callback, delay) => {
  let timeoutID = null

  return function () {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      callback.apply(this, arguments)
    }, delay)
  }
}

/** For Promise.allSettled — never let a flaky network call take down the whole page. */
export function valueFromSettled(result, fallback) {
  return result.status === 'fulfilled' ? result.value : fallback;
}

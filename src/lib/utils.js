/**
  Returns the IP calculation from the number of outs given.
*/
export function ipFromNumOuts(numOuts) {
  // 19 outs => 6.1 IP
  // 0 outs => 0.0 IP
  let numInnings = Math.floor(numOuts / 3)
  let remainder = numOuts % 3
  return `${numInnings}.${remainder}`
}

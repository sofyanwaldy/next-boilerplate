const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789'

export function encode (num) {
  const base = alphabet.length
  var encoded = ''
  while (num) {
    var remainder = num % base
    num = Math.floor(num / base)
    var string = alphabet.charAt(remainder)
    encoded = string + encoded
  }
  return encoded
}

export function decode (str) {
  const base = alphabet.length
  var decoded = 0
  while (str) {
    var index = alphabet.indexOf(str.charAt(0))
    var power = str.length - 1
    decoded = decoded + index * Math.pow(base, power)
    str = str.substr(1)
  }
  return decoded
}

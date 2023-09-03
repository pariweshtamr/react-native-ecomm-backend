import Cryptojs from "crypto-js"

export const encryptPassword = (plainPassword) => {
  return Cryptojs.AES.encrypt(plainPassword, process.env.SECRET).toString()
}

export const decryptPassword = (plainPassword, dbPass) => {
  return Cryptojs.AES.decrypt(plainPassword, process.env.SECRET).toString(
    Cryptojs.enc.Utf8
  )
}

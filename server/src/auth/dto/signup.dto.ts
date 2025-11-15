export class SignupDto {
  fullName?: string;
  email!: string;
  phone?: string;
  country?: string;
  password!: string;
  publicKey!: string; // base64
  encryptedPrivKeyBlob!: any; // JSON structure { salt, nonce, ciphertext, kdf }
}

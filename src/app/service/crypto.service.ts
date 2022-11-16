import { Injectable } from '@angular/core';
import { AES, enc, mode, pad } from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private config: any;
  private key: any = enc.Utf8.parse('8080808080808080');
  private iv: any = enc.Utf8.parse('8080808080808080');

  constructor() {
    this.config = {
      keySize: 128 / 8,
      iv: this.iv,
      mode: mode.CBC,
      padding: pad.Pkcs7,
    };
  }

  encrypt(message: string): string {
    return AES.encrypt(
      enc.Utf8.parse(message),
      this.key,
      this.config
    ).toString();
  }

  decrypt(ciphertext: string): string {
    return AES.decrypt(ciphertext, this.key, this.config).toString(enc.Utf8);
  }
}

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, Number(process.env.HASH_SALT));
  }

  async compare(first: string, second: string): Promise<boolean> {
    return await bcrypt.compare(first, second);
  }
}

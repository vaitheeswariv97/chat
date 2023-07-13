import { Injectable } from '@nestjs/common';
import {
  EntitySchema,
  Repository,
  EntityManager,
  InsertResult,
  UpdateResult,
} from 'typeorm';
@Injectable()
export class ChatStoreService {
  constructor(readonly entityManager: EntityManager) {}

  async save(message_data) {
    try {
      let data: InsertResult = await this.entityManager.insert('chat_store', {
        client_id: message_data.client_id,
        message: message_data.message,
        message_time: new Date(),
      });
      if (data) return { statusCode: 200, data: data };
      else {
        return { statusCode: 400, message: ['Not Inserted'] };
      }
    } catch (error) {
      console.log(error.message);
      return { statusCode: 400, message: [error.message], stack: error.stack };
    }
  }
}

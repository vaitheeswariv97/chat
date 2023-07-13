//import { Logger } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { ChatStoreService } from 'src/chat_store/chat_store.service';
@WebSocketGateway({ cors: true })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit
{
  @WebSocketServer() server;
  users: number = 0;
  id: string = '';
  //private logger = new Logger('ChatGateway');
  constructor(private chat_store: ChatStoreService) {}
  async onModuleInit() {
    this.server.on('connection', (socket: any) => {
      this.id = socket.id;
      console.log(socket.id);
    });
  }
  async handleConnection(client) {
    // A client has connected
    //this.logger.log(client);
    this.users++;
    console.log(this.users);
    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }
  async handleDisconnect() {
    // A client has disconnected
    this.users--;
    // Notify connected clients of current users
    this.server.emit('users', this.users);
  }
  @SubscribeMessage('chat')
  async onChat(client, message) {
    try {
      //console.log(client.id);
      let chat_data: any = {};
      chat_data.client_id = client.id;
      chat_data.message = message;
      let save_data = this.chat_store.save(chat_data);
      client.broadcast.emit('chat', message);
      //this.server.emit('chat', message);
      //console.log('message:', message);
    } catch (error) {
      console.log(error);
    }
  }
}

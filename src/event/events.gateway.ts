import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080)
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket) {
    this.server.emit('events', "as")
    client.send('data')
  }

  // @SubscribeMessage('message')
  // sendToSercer(@MessageBody() message: string, @ConnectedSocket() client: Socket) {
  //   this.server.send("hello everyone");
  //   client.send("hi");
  // }
  private id = 0;
  @SubscribeMessage('joinRoom')
  joinRoom(@MessageBody() message: { room: string, message: string }, @ConnectedSocket() client: Socket) {
    client.join(message.room);
    let name = `client ${this.id++} joined room ${message.room}`;
    this.server.to(message.room).emit('listen', name);
  }


  @SubscribeMessage('chat')
  chatRoom(@MessageBody() message: { room: string, message: string }, @ConnectedSocket() client: Socket) {
    client.to(message.room).emit('listen', message.message);
  }



}
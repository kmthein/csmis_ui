// web-socket.service.ts
import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private stompClient: any;

  connect(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const socket = new SockJS(url);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, (frame: string) => {
        console.log('Connected: ' + frame);
        resolve();
      }, (error: any) => {
        console.error('Connection error:', error);
        reject(error);
      });
    });
  }

  subscribe(topic: string, callback: (message: any) => void): void {
    if (this.stompClient) {
      this.stompClient.subscribe(topic, (message: any) => {
        callback(JSON.parse(message.body));
      });
    }
  }

  send(destination: string, body: any): void {
    if (this.stompClient) {
      this.stompClient.send(destination, {}, JSON.stringify(body));
    }
  }
}

import {Page} from 'ionic-angular';
import {NgZone} from 'angular2/core';


/*
  Generated class for the FirstroomPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/firstroom/firstroom.html',
})
export class FirstroomPage {
static get parameters() {
        return [NgZone];
    }
    constructor(ngzone) {
        this.zone = ngzone;
        this.chats = [];
        this.chatinp ='';
        this.pkt = {
            data: '',
            room: 'room1'
        };
        this.socket = io('http://localhost:3000');
        this.socket.on(this.pkt.room +'message', (msg) => {
            this.zone.run(() => {
                this.chats.push(msg);
            });
        });
        this.socket.on(this.pkt.room +'userentered', (user) => {
            this.zone.run(() => {
                this.chats.push(user + ' has entered');
            });
        });
        this.socket.on(this.pkt.room +'userleave', (user) => {
            this.zone.run(() => {
                this.chats.push(user + ' has left');
            });
        });
    }
    
    send(msg) {
        if(msg != ''){
            this.pkt.data = msg;
            this.socket.emit('message', this.pkt);
        }
        this.chatinp = '';
    }
    
    onPageDidEnter(){
        this.pkt.data = window.localStorage.getItem('nickname');
        this.socket.emit('userentered', this.pkt);
    }
                         
    onPageDidLeave(){
        this.pkt.data = window.localStorage.getItem('nickname');
        this.socket.emit('userleave', this.pkt);
    }
    
    
}

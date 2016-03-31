import {Page, NavController} from 'ionic-angular';
import {FirstroomPage} from '../firstroom/firstroom';
import {SecondroomPage} from '../secondroom/secondroom';


@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    static get parameters() {
        return [NavController];
    }
  constructor(nav) {
      this.nav = nav;
      this.nickname = '';
      this.nameset = false;
  }
    setname(name) {
        window.localStorage.setItem('nickname', name);
        this.nameset = true;
    }
    
    navtoroomone(){
        this.nav.push(FirstroomPage);
    }
    
    navtoroomtwo() {
        this.nav.push(SecondroomPage);
    }
   
}

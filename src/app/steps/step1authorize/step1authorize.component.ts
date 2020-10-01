import {Component} from '@angular/core';

@Component({
  templateUrl: './step1authorize.component.html',
  styleUrls: ['./step1authorize.component.scss']
})
export class Step1authorizeComponent {

  clientId: string;

  get authorizeUrl(): string {
    return 'https://accounts.spotify.com/authorize?client_id=' + this.clientId +
      '&response_type=token&redirect_uri=http://localhost:4200/authorized&scope=playlist-modify-private%20playlist-read-private';
  }

  changeClientId($event: any): void {
    this.clientId = $event.target.value;
  }
}

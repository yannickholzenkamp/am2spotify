import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {AuthService} from '../../auth.service';
import {SpotifyService} from '../../spotify.service';
import {LibraryPlaylist, LibraryTrack} from '../../types';

@Component({
  templateUrl: './step2authorized.component.html',
  styleUrls: ['./step2authorized.component.scss']
})
export class Step2authorizedComponent implements OnInit {

  isLoading = true;
  token: string;
  user: string;

  file: File;
  tracks: LibraryTrack[] = [];
  playlists: LibraryPlaylist[] = [];
  regex: string;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private spotifyService: SpotifyService) {
  }

  ngOnInit(): void {
    this.route.fragment.pipe(map(fragment => {
      const token = new URLSearchParams(fragment).get('access_token');
      this.authService.setToken(token);
      this.token = this.authService.getToken();
      this.isLoading = false;
      this.loadUser();
    })).subscribe();
  }

  loadUser(): void {
    this.spotifyService.getUser().pipe(map(user => {
      this.authService.setUserId(user);
      this.user = this.authService.getUserId();
      this.spotifyService.searchTrack('Cornelia Street Taylor Swift').subscribe(x => console.log(x));
    })).subscribe();
  }

  selectFile(e: any): void {
    this.file = e.target.files[0];
  }

  parseFile(): void {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (typeof fileReader.result === 'string') {
        const content: string = fileReader.result;
        const xml = new DOMParser().parseFromString(content, 'application/xml');
        console.log(xml);
        const actualNode = xml.getRootNode().childNodes.item(1).childNodes.item(1);
        actualNode.childNodes.forEach(mainNode => {
          if (mainNode.textContent === 'Tracks') {
            const trackNodes = mainNode.nextSibling.nextSibling.childNodes;
            trackNodes.forEach(trackNode => this.addTrack(trackNode));
          }
          if (mainNode.textContent === 'Playlists') {
            const playlistNodes = mainNode.nextSibling.nextSibling.childNodes;
            playlistNodes.forEach(playlistNode => this.addPlaylist(playlistNode));
          }
        });
      } else {
        console.log('type wrong');
      }
    };
    fileReader.readAsText(this.file);
  }

  addPlaylist(playlistNode: Node): void {
    if (playlistNode.nodeName === 'dict') {
      let playlistName: string;
      let playlistTracks: number[] = [];
      for (let i = 0; i < playlistNode.childNodes.length; i++) {
        const playlistNodeValue = playlistNode.childNodes.item(i);
        if (playlistNodeValue.nodeName === 'key') {
          if (playlistNodeValue.textContent === 'Name') {
            playlistName = playlistNodeValue.nextSibling.textContent;
          }
          // FILTER
          if (!playlistName.match(RegExp(this.regex))) {
            return;
          }
          if (playlistNodeValue.textContent === 'Playlist Items') {
            for (let j = 0; j < playlistNodeValue.nextSibling.nextSibling.childNodes.length; j++) {
              const playlistTrackItem = playlistNodeValue.nextSibling.nextSibling.childNodes.item(j);
              if (playlistTrackItem.nodeName === 'dict') {
                playlistTracks.push(+playlistTrackItem.childNodes.item(2).textContent);
              }
            }
          }
        }
      }
      const playlist: LibraryPlaylist = {
        name: playlistName,
        tracks: playlistTracks
      };
      this.playlists.push(playlist);
    }
  }

  addTrack(trackNode: Node): void {
    if (trackNode.nodeName === 'dict') {
      let libraryTrackId: number;
      let libraryTrackName: string;
      let libraryTrackArtist: string;
      let libraryTrackAlbum: string;
      for (let i = 0; i < trackNode.childNodes.length; i++) {
        const trackNodeValue = trackNode.childNodes.item(i);
        if (trackNodeValue.nodeName === 'key') {
          if (trackNodeValue.textContent === 'Track ID') {
            libraryTrackId = +trackNodeValue.nextSibling.textContent;
          }
          if (trackNodeValue.textContent === 'Artist') {
            libraryTrackArtist = trackNodeValue.nextSibling.textContent;
          }
          if (trackNodeValue.textContent === 'Album') {
            libraryTrackAlbum = trackNodeValue.nextSibling.textContent;
          }
          if (trackNodeValue.textContent === 'Name') {
            libraryTrackName = trackNodeValue.nextSibling.textContent;
          }
        }
      }
      const track = {
        id: libraryTrackId,
        name: libraryTrackName,
        album: libraryTrackAlbum,
        artist: libraryTrackArtist
      };
      this.tracks.push(track);
    }
  }

  setRegex($event: any): void {
    this.regex = $event.target.value;
  }
}

import {Component, Input} from '@angular/core';
import {FoundTrack, LibraryPlaylist, LibraryTrack} from '../../../types';
import {SpotifyService} from '../../../spotify.service';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.scss']
})
export class AddPlaylistComponent {

  uris: FoundTrack[] = [];

  constructor(private spotifyService: SpotifyService) {
  }

  @Input()
  playlist: LibraryPlaylist;

  @Input()
  availableTracks: LibraryTrack[];

  loadTitles(): void {
    this.playlist.tracks.forEach(track => this.addTrack(track));
  }

  addTrack(trackId: number): void {
    const trackFromLibrary = this.availableTracks.find(track => track.id === trackId);
    const queryString = (trackFromLibrary.artist + ' ' + trackFromLibrary.name).replace(/[^0-9a-z äÄÜüÖö]/gi, '');
    this.spotifyService.searchTrack(queryString).subscribe(result => {
      const match = result.tracks.items.find(x => {
        return x.name.toLowerCase() === trackFromLibrary.name.toLowerCase();
      });
      if (match) {
        this.uris.push({explanation: 'Full Match: ' + match.name, uri: match.uri});
      } else {
        const firstResult = result.tracks.items[0];
        this.uris.push({explanation: 'No Match: ' + trackFromLibrary.name + ' First result: ' + firstResult.name, uri: firstResult.uri});
      }
    });
  }

  push(): void {
    const uris = this.uris.map(uri => uri.uri);
    this.spotifyService.createPlaylist(this.playlist.name).subscribe((playlistId) => {
      this.spotifyService.addTracksToPlaylist(playlistId, uris).subscribe(() => console.log('DONE'));
    });
  }
}

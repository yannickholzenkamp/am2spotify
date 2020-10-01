import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {SearchResult} from './types';

const BASEURL = 'https://api.spotify.com/v1/';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  public getUser(): Observable<string> {
    return this.http.get(BASEURL + 'me').pipe(map((user: any) => {
      return user.id;
    }));
  }

  public createPlaylist(playlistName: string): Observable<string> {
    const path = 'users/' + this.authService.getUserId() + '/playlists';
    return this.http.post<any>(BASEURL + path, {name: playlistName, public: false}).pipe(map(response => {
      return response.id;
    }));
  }

  public addTracksToPlaylist(playlistId: string, uri: string[]): Observable<void> {
    const path = 'playlists/' + playlistId + '/tracks';
    return this.http.post<void>(BASEURL + path, {uris: uri});
  }

  public searchTrack(query: string): Observable<SearchResult> {
    return this.http.get<SearchResult>(BASEURL + 'search?type=track&q=' + encodeURI(query));
  }
}

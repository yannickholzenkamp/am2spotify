export interface SearchResult {
  tracks: TracksResult;
}

export interface TracksResult {
  items: Track[];
}

export interface Track {
  album: Album;
  artists: Artist[];
  id: string;
  name: string;
  uri: string;
}

export interface Album {
  name: string;
}

export interface Artist {
  name: string;
}

export interface LibraryPlaylist {
  name: string;
  tracks: number[];
}

export interface LibraryTrack {
  id: number;
  name: string;
  artist: string;
  album: string;
}

export interface FoundTrack {
  explanation?: string;
  uri: string;
}



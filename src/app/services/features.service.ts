import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { share } from 'rxjs/operators';

export interface SpotifyFeatures extends Array<FeaturesBundle> {}

export interface FeaturesBundle{
  year : number,
  data : HistoricalFeatures[]
}

export interface HistoricalFeatures {
  song_id: string,
  song_name: string,
  artist: string,
  danceability: string,
  energy: string,
  key_center: string,
  loudness: string,
  mode: string,
  speechiness: string,
  accousticness: string,
  instrumentalness: string,
  liveness: string,
  valence: string
  tempo: string,
  duration_ms: string,
  time_signature: string,
  popularity: string
}

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  private baseURL : string = 'http://localhost:3000/output';
  private eventObservable! : Observable<HttpEvent<SpotifyFeatures>>  ;

  public responseData = new BehaviorSubject({});
  public loading: boolean = true;

  constructor(private http:HttpClient) {}

  downloadFeatures(): Observable<HttpEvent<SpotifyFeatures>>{

    if (this.eventObservable) {
      return this.eventObservable;
    } else {
      this.eventObservable = this.http.get<SpotifyFeatures>(this.baseURL, {reportProgress: true, observe: 'events',}).pipe(share());
      return this.eventObservable;
    }

  };

  processFeatures(){

    let lastObject = {
      loaded: 0,
      total: 2167328,
      isLoading: this.loading,
      plotData: [] as any};

    this.setResponseData(lastObject);

    this.downloadFeatures().subscribe(
      event => {
        if (event.type == HttpEventType.DownloadProgress) {

          lastObject.loaded = event.loaded;
          this.setResponseData(lastObject); // CALLED HERE FOR UPDATES

        };
        if (event.type === HttpEventType.Response) {

          this.loading = false;
          lastObject.isLoading = this.loading;
          lastObject.plotData = event.body;
          this.setResponseData(lastObject);

        };

      });

  }

  setResponseData(data: any) {
    this.responseData.next(data);
  };

}


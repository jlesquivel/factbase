import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {
  constructor(private http: HttpClient) {}

  public getJSON(configUrl) {
    return this.http.get(configUrl).toPromise();
  }
}

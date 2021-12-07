import { HttpClient } from '@angular/common/http';

export class BaseService {
  baseURL: string = 'https://localhost:44347/api';

  constructor(private http: HttpClient) {}

  public get<T>(url: string, options?: object) {
    return this.http.get<T>(url, options);
  }

  public post<T>(url: string, data: any, options?: object) {
    return this.http.post<T>(url, data, options);
  }

  public put<T>(url: string, data: any, options?: object) {
    return this.http.put<T>(url, data, options);
  }

  public delete<T>(url: string, options?: object) {
    return this.http.delete<T>(url, options);
  }
}

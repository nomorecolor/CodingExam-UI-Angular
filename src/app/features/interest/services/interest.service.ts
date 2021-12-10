import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { Interest } from '../models/interest.model';

@Injectable({
  providedIn: 'root',
})
export class InterestService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getInterest(id: number) {
    return this.get<Interest>(`${this.baseURL}/interests/${id}`);
  }

  addInterest(interest: Interest) {
    return this.post<Interest>(`${this.baseURL}/interests`, interest);
  }

  editInterest(interest: Interest) {
    return this.put<Interest>(
      `${this.baseURL}/interests/${interest.id}`,
      interest
    );
  }

  deleteInterest(id: number) {
    return this.delete<Interest>(`${this.baseURL}/interests/${id}`);
  }
}

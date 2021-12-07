import { Component, Input, OnInit } from '@angular/core';
import { InterestDetails } from '../../models/interest-details.model';

@Component({
  selector: 'app-interest-detail',
  templateUrl: './interest-detail.component.html',
  styleUrls: ['./interest-detail.component.scss'],
})
export class InterestDetailComponent implements OnInit {
  @Input() interestDetails: InterestDetails[] = [];

  constructor() {}

  ngOnInit(): void {}
}

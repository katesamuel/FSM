import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/shared/constants/app.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public year: number = new Date().getFullYear();
  public schoolName: string = AppConstants.School.name.full;
  public schoolAddress: string = AppConstants.School.address;
  public phoneNumber: string = `+${AppConstants.School.phone.code} ${AppConstants.School.phone.mobile}`;
}

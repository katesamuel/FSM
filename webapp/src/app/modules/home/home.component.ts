import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public images: string[] = [2,1,3,4,5,2,3,4,1,5,4,3,5,1,2,3,4,5,2,3,1,4,1,2,3,4,5,2,3,4,1,5,4,3,5,1,2,3,4,5,2,3,1,4].map(x => `../../../assets/images/home/image-marquee/notes-${x}.png`);
  public year: number = new Date().getFullYear();
  public academicYear: string = this.year + '-' + (this.year + 1);
}

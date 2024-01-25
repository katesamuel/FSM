import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    public loggedInUser: object | null = null;
    private offcanvasService = inject(NgbOffcanvas);
    constructor() {}

    async searchHandler(e: Event) {}

    async openOffCanvas(content: TemplateRef<any>) {
        this.offcanvasService.open(content, { position: 'top' });
    }
}

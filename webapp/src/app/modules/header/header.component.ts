import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    protected modalOpen: boolean = false;
    public loggedInUser: object | null = null;
    constructor() {}

    async searchHandler(e: Event) {}

    async openNavModal() {
        this.toggleNavModal();
    }

    async closeNavModal() {
        this.toggleNavModal();
    }

    async toggleNavModal() {
        this.modalOpen = !this.modalOpen;
    }
}

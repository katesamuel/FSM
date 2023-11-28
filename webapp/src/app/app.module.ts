import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { HeaderComponent } from './modules/header/header.component';
import { FooterComponent } from './modules/footer/footer.component';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { EventsModule } from './modules/events/events.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }, {
    path: 'login',
    component: AuthenticationModule
  }, {
    path: 'events',
    component: EventsModule

  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    NgxScrollTopModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatIconModule, 
    MatButtonModule, 
    MatButtonToggleModule, 
    MatProgressSpinnerModule, 
    MatToolbarModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

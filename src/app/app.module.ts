import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterestComponent } from './features/interest/interest.component';
import { InterestDetailComponent } from './features/interest/components/interest-detail/interest-detail.component';
import { LoginComponent } from './features/login/login.component';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    InterestComponent,
    InterestDetailComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

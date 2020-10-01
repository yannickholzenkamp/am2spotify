import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Step1authorizeComponent} from './steps/step1authorize/step1authorize.component';
import {Step2authorizedComponent} from './steps/step2authorized/step2authorized.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth-interceptor';
import { AddPlaylistComponent } from './steps/step2authorized/add-playlist/add-playlist.component';

@NgModule({
  declarations: [
    AppComponent,
    Step1authorizeComponent,
    Step2authorizedComponent,
    AddPlaylistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

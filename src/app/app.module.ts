import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {DataService} from './services/data.service';
import {PublicService} from './services/public.service';
import {AuthService} from './services/auth.service';
import {ProfileComponent} from './profile/profile.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ToastyModule} from 'ng2-toasty';
import {SignupComponent} from './signup/signup.component';
import {ValidUrlComponent} from './valid-url/valid-url.component';
import {AuthGuard} from './services/guard.service';
import {FollowUserComponent} from './follow-user/follow-user.component';
import {FollowUserResolverService} from './follow-user/follow-user-resolver.service';
import {HomeComponent} from './home/home.component';
import {FileUploadModule} from 'ng2-file-upload';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {FollowComponent} from './utils/follow/follow.component';
import {WasteComponent} from './utils/waste/waste.component';
import {ValidPictureDirective} from './utils/valid-picture.directive';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MdRadioModule, MdInputModule, MdTooltipModule} from '@angular/material';
import {ListOfFriendComponent} from './utils/list-of-friend/list-of-friend.component';
import {TooltipDirective} from './utils/tooltip.directive';
import {ReCaptchaModule} from 'angular2-recaptcha';
import {Ng2CompleterModule} from 'ng2-completer';
import {AuthModule} from './auth-http/auth-http.module';
import {RouteReuseStrategy} from '@angular/router';
import {CustomReuseStrategy} from './reuse-strategy';
import { ChatComponent } from './chat/chat.component';

const routing = RouterModule.forRoot([
  {
    path: '', component: HomeComponent,
    resolve: {user: AuthService}
  },
  {
    path: 'profil', component: ProfileComponent, canActivate: [AuthGuard],
    resolve: {user: AuthService}
  },
  {path: 'signup', component: SignupComponent},
  {
    path: 'email-verification', children: [{
    path: ':URL',
    component: ValidUrlComponent
  }]
  },
  {
    path: 'my-profile/:id',
    component: MyProfileComponent,
    canActivate: [AuthGuard],
    resolve: {user: AuthService}
  },
  {
    path: 'app-follow-user/:userId/:request',
    component: FollowUserComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    resolve: {follow: FollowUserResolverService, user: AuthService}
  },
  {path: '404', component: HomeComponent},
  {path: '**', redirectTo: '404'}
]);

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SidebarComponent,
    SignupComponent,
    ValidUrlComponent,
    FollowUserComponent,
    HomeComponent,
    MyProfileComponent,
    FollowComponent,
    WasteComponent,
    ValidPictureDirective,
    ListOfFriendComponent,
    TooltipDirective,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FileUploadModule,
    ReactiveFormsModule,
    AuthModule,
    MdRadioModule,
    ReCaptchaModule,
    InfiniteScrollModule,
    Ng2CompleterModule,
    MdInputModule,
    MdTooltipModule,
    ToastyModule.forRoot(),
    HttpClientModule,
    routing
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy},
    DataService,
    AuthService,
    FollowUserResolverService,
    PublicService,
    AuthGuard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule {
}

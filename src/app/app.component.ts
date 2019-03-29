import { Component } from "@angular/core";

import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { PlatformService } from "../uix/core";

@Component({
  selector: "app-root",
  template: `
    <div class="uix-root">
      <app-router-outlet></app-router-outlet>
    </div>
  `
})
export class AppComponent {
  constructor(
    private platform: PlatformService,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready(() => {
      if (this.platform.is("cordova")) {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }
    });
  }
}

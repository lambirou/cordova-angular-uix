import { Component } from "@angular/core";
import {
  Router,
  RouterOutlet,
  NavigationStart,
  Event as NavigationEvent
} from "@angular/router";
import { filter } from "rxjs/operators";

import { RouterTransition } from "../utils/navigation";
import Support from "../utils/support";

@Component({
  selector: "app-router-outlet",
  template: `
    <div [@routerTransition]="prepareRoute(route)">
      <router-outlet #route="outlet"></router-outlet>
    </div>
  `,
  animations: [RouterTransition]
})
export class RouterOutletComponent {
  private historyQueue: Array<NavigationStart>;
  private animationNumber: number;
  private lastRoute: NavigationStart;
  private newRoute: NavigationStart;

  constructor(router: Router) {
    this.historyQueue = [];
    this.animationNumber = 0;

    // init device support
    Support.init();

    // handle router history
    router.events
      .pipe(
        filter((event: NavigationEvent) => {
          return event instanceof NavigationStart;
        })
      )
      .subscribe((event: NavigationStart) => {
        this.lastRoute = this.newRoute;
        this.newRoute = event;

        if (this.isBack(this.newRoute)) {
          this.animationNumber = 2;
          this.historyQueue = this.historyQueue.filter(
            route => route.url !== this.lastRoute.url
          );
        } else {
          this.animationNumber = 1;
          this.historyQueue = [...this.historyQueue, event];
        }

        console.log("animationNumber :", this.animationNumber);
      });
  }

  prepareRoute(outlet: RouterOutlet) {
    return this.animationNumber;
  }

  private isBack(state: NavigationStart) {
    const queue = this.historyQueue;
    const queueFilted = queue.filter(route => route.url !== state.url);

    return this.historyQueue.length !== queueFilted.length;
  }
}

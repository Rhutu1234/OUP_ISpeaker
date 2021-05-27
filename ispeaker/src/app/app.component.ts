import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ispeaker';
  constructor(private router: Router) {
    this.router.events.subscribe(routerEvent => {
      if (routerEvent instanceof NavigationStart) {
        console.log(routerEvent);
        if (routerEvent.url === environment.urlCheck) {
          this.router.navigate(['home'], { skipLocationChange: true });
        }
      }
    });
  }
}

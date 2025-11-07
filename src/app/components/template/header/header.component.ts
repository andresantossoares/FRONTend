import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidenavService } from '../../../services/sidenav.service';
import { ThemeService } from '../../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLight = false;
  private themeSubscription?: Subscription;

  constructor(
    private sidenavService: SidenavService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.isLight = this.themeService.isLight();
    this.themeSubscription = this.themeService.isLightTheme$.subscribe(
      isLight => this.isLight = isLight
    );
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  toggleSidenav(): void {
    this.sidenavService.toggle();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

}

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { SidenavService } from '../../../services/sidenav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  private subscription?: Subscription;

  constructor(private sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.subscription = this.sidenavService.toggleSidenav$.subscribe(() => {
      this.toggleSidenav();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }

}

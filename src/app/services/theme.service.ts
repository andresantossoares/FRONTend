import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isWarmTheme = new BehaviorSubject<boolean>(false);
  public isWarmTheme$ = this.isWarmTheme.asObservable();

  constructor() {
    // Carrega o tema salvo do localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'warm') {
      this.isWarmTheme.next(true);
      this.applyWarmTheme();
    } else {
      this.applyCoolTheme();
    }
  }

  toggleTheme(): void {
    const currentTheme = this.isWarmTheme.value;
    this.isWarmTheme.next(!currentTheme);
    
    if (!currentTheme) {
      this.applyWarmTheme();
      localStorage.setItem('theme', 'warm');
    } else {
      this.applyCoolTheme();
      localStorage.setItem('theme', 'cool');
    }
  }

  private applyWarmTheme(): void {
    document.documentElement.style.setProperty('--body-bg', '#ffffff');
    document.documentElement.style.setProperty('--body-text-color', '#333333');
    document.documentElement.style.setProperty('--header-bg', '#ff8a65');
    document.documentElement.style.setProperty('--sidenav-bg', '#ff7043');
    document.documentElement.style.setProperty('--sidenav-header-bg', '#ff5722');
    document.documentElement.style.setProperty('--card-bg', '#ff8a65');
    document.documentElement.style.setProperty('--button-bg', '#ff7043');
    document.documentElement.style.setProperty('--text-color', '#ffffff');
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#333333';
  }

  private applyCoolTheme(): void {
    document.documentElement.style.setProperty('--body-bg', '#4a4a4a');
    document.documentElement.style.setProperty('--body-text-color', '#ffffff');
    document.documentElement.style.setProperty('--header-bg', '#64b5f6');
    document.documentElement.style.setProperty('--sidenav-bg', '#64b5f6');
    document.documentElement.style.setProperty('--sidenav-header-bg', '#42a5f5');
    document.documentElement.style.setProperty('--card-bg', '#64b5f6');
    document.documentElement.style.setProperty('--button-bg', '#42a5f5');
    document.documentElement.style.setProperty('--text-color', '#ffffff');
    document.body.style.backgroundColor = '#4a4a4a';
    document.body.style.color = '#ffffff';
  }

  isWarm(): boolean {
    return this.isWarmTheme.value;
  }
}


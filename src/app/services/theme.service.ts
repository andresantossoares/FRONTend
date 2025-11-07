import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isLightTheme = new BehaviorSubject<boolean>(false);
  public isLightTheme$ = this.isLightTheme.asObservable();

  constructor() {
    // Carrega o tema salvo do localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.isLightTheme.next(true);
      this.applyLightTheme();
    } else {
      this.applyDarkTheme();
    }
  }

  toggleTheme(): void {
    const currentTheme = this.isLightTheme.value;
    this.isLightTheme.next(!currentTheme);
    
    if (!currentTheme) {
      this.applyLightTheme();
      localStorage.setItem('theme', 'light');
    } else {
      this.applyDarkTheme();
      localStorage.setItem('theme', 'dark');
    }
  }

  private applyLightTheme(): void {
    // Tema Claro - Verde Água
    document.documentElement.style.setProperty('--body-bg', '#F0FDFA');
    document.documentElement.style.setProperty('--body-text-color', '#134E4A');
    document.documentElement.style.setProperty('--header-bg', '#2DD4BF');
    document.documentElement.style.setProperty('--sidenav-bg', '#5EEAD4');
    document.documentElement.style.setProperty('--sidenav-header-bg', '#14B8A6');
    document.documentElement.style.setProperty('--header-text-color', '#134E4A');
    document.documentElement.style.setProperty('--card-bg', '#CCFBF1');
    document.documentElement.style.setProperty('--button-bg', '#14B8A6');
    document.documentElement.style.setProperty('--button-hover', '#0D9488');
    document.documentElement.style.setProperty('--text-color', '#134E4A');
    document.documentElement.style.setProperty('--text-dark', '#134E4A');
    document.documentElement.style.setProperty('--text-secondary', '#5B6F6E');
    document.documentElement.style.setProperty('--border-color', '#99F6E4');
    document.documentElement.style.setProperty('--button-text-color', '#134E4A');
    document.documentElement.style.setProperty('--table-header-text', '#134E4A');
    document.documentElement.style.setProperty('--table-header-bg', '#14B8A6');
    document.body.style.backgroundColor = '#F0FDFA';
    document.body.style.color = '#134E4A';
  }

  private applyDarkTheme(): void {
    // Tema Escuro - Verde Água
    document.documentElement.style.setProperty('--body-bg', '#0F172A');
    document.documentElement.style.setProperty('--body-text-color', '#CCFBF1');
    document.documentElement.style.setProperty('--header-bg', '#0D9488');
    document.documentElement.style.setProperty('--sidenav-bg', '#14B8A6');
    document.documentElement.style.setProperty('--sidenav-header-bg', '#0F766E');
    document.documentElement.style.setProperty('--header-text-color', '#FFFFFF');
    document.documentElement.style.setProperty('--card-bg', '#134E4A');
    document.documentElement.style.setProperty('--button-bg', '#2DD4BF');
    document.documentElement.style.setProperty('--button-hover', '#5EEAD4');
    document.documentElement.style.setProperty('--text-color', '#FFFFFF');
    document.documentElement.style.setProperty('--text-dark', '#CCFBF1');
    document.documentElement.style.setProperty('--text-secondary', '#99F6E4');
    document.documentElement.style.setProperty('--border-color', '#5EEAD4');
    document.documentElement.style.setProperty('--button-text-color', '#134E4A');
    document.documentElement.style.setProperty('--table-header-text', '#CCFBF1');
    document.documentElement.style.setProperty('--table-header-bg', '#2DD4BF');
    document.body.style.backgroundColor = '#0F172A';
    document.body.style.color = '#CCFBF1';
  }

  isLight(): boolean {
    return this.isLightTheme.value;
  }
}


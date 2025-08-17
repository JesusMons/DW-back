import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Aside } from './components/layout/aside/aside';
import { Content } from './components/layout/content/content';
import { Footer } from './components/layout/footer/footer';
import { Header } from './components/layout/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Aside, Content, Footer, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('school_transport');
}

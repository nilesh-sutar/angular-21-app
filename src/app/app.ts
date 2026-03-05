import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Breadcrumbs } from "./core/components/breadcrumbs";
import { Footer } from "./core/components/footer";
import { Navbar } from "./core/components/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Breadcrumbs, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}

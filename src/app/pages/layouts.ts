import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-layouts',
    template: `<router-outlet/>`,
    styles: [``],
    imports: [RouterOutlet]
})
export class Layouts implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}

import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
    <footer class="bg-dark text-white text-center p-3 mt-4 fixed-bottom">
        <div class="container">
            <p class="mb-0">&copy; {{currentYear()}} Your Company. All rights reserved.</p>
        </div>
    </footer>
    `
})
export class Footer {
    currentYear = signal(new Date().getFullYear());
}

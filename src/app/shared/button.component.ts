import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-button',
    template: `<button class="btn" [class.primary]="primary"><ng-content></ng-content></button>`,
    styles: [`.btn{padding:0.5rem 1rem;border-radius:4px}.primary{background:var(--primary);color:#fff}`]
})
export class ButtonComponent {
    @Input() primary = false;
}

import {
    Directive,
    Input,
    TemplateRef,
    ViewContainerRef,
    effect,
    inject,
    Injector,
    signal
} from '@angular/core';

@Directive({
    selector: '[appShowIf]',
    standalone: true
})
export class ShowIfDirective {
    private hasView = signal<boolean>(false);
    private elseTpl?: TemplateRef<unknown>;
    private condition = signal<boolean>(false);

    private injector = inject(Injector);

    constructor(
        private tpl: TemplateRef<unknown>,
        private vcr: ViewContainerRef
    ) {
        effect(
            () => {
                this.condition() ? this.showThen() : this.showElse();
            },
            { injector: this.injector }
        );
    }

    @Input()
    set appShowIf(value: boolean) {
        this.condition.set(value);
    }

    @Input()
    set appShowIfElse(template: TemplateRef<unknown>) {
        this.elseTpl = template;
    }

    private showThen() {
        if (!this.hasView()) {
            this.vcr.clear();
            this.vcr.createEmbeddedView(this.tpl);
            this.hasView.set(true);
        }
    }

    private showElse() {
        this.vcr.clear();
        if (this.elseTpl) {
            this.vcr.createEmbeddedView(this.elseTpl);
        }
        this.hasView.set(false);
    }
}


/* Usage
<a
  *appShowIf="config().showViewProduct; else noView"
  class="btn btn-secondary">
  View Product
</a>

<ng-template #noView>
  <span class="text-muted">View disabled</span>
</ng-template>

*/
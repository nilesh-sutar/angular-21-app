import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'app-breadcrumbs',
    template: `
    @if (breadcrumbs().length) {
    <nav class="my-3" style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
      <ol class="breadcrumb mb-0">
        @for (bc of breadcrumbs(); track bc.url; let last = $last) {
        <li class="breadcrumb-item text-capitalize">
            @if(!last) {
            <a [routerLink]="bc.url">{{ bc.label }}</a>
            } @else {
            <span class="active">{{ bc.label }}</span>
            }
        </li>
        }
      </ol>
    </nav>
    }
  `,
    imports: [RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Breadcrumbs {
    private router = inject(Router);

    // simple signal storing array of {label,url}
    breadcrumbs = signal<{ label: string; url: string }[]>([]);

    constructor() {
        // initialize and listen for navigation end events
        this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
            .subscribe(() => {
                this.breadcrumbs.set(this.buildBreadCrumb(this.router.url));
            });

        // set initial value
        this.breadcrumbs.set(this.buildBreadCrumb(this.router.url));
    }

    private buildBreadCrumb(url: string) {
        const segments = url.split('/').filter((s) => s);
        const crumbs: { label: string; url: string }[] = [];
        segments.forEach((segment, idx) => {
            const path = '/' + segments.slice(0, idx + 1).join('/');
            // decode & title-case maybe
            const label = decodeURIComponent(segment.replace(/-/g, ' '));
            crumbs.push({ label, url: path });
        });
        return crumbs;
    }
}

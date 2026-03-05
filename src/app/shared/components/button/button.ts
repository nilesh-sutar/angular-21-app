import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    @if (buttonType() === 'a') {
      <a
        [class]="'btn btn-' + finalConfig().color + ' btn-' + finalConfig().size"
        (click)="onClick.emit()"
      >
        <ng-content select="[icon]"></ng-content>
        {{ finalConfig().label }}
      </a>
    } @else {
      <button
        [type]="finalConfig().type"
        [disabled]="finalConfig().disabled"
        [class]="'btn btn-' + finalConfig().color + ' btn-' + finalConfig().size"
        (click)="onClick.emit()"
      >
        <ng-content select="[icon]"></ng-content>
        {{ finalConfig().label }}
      </button>
    }
  `,
  styles: [
    `
      button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  config = input<buttonConfig>({
    type: 'button',
    label: 'Click Me',
    color: 'primary',
    disabled: false,
    anchor: false,
    size: 'sm',
  });

  finalConfig = computed(() => {
    const c = this.config() || ({} as buttonConfig);
    return {
      type: c.type ?? 'button',
      label: c.label ?? 'Click Me',
      color: c.color ?? 'primary',
      disabled: c.disabled ?? false,
      anchor: c.anchor ?? false,
      size: c.size ?? 'sm',
    };
  });

  buttonType = computed(() => (this.finalConfig().anchor ? 'a' : 'button'));

  onClick = output<void>();
}

interface buttonConfig {
  type?: 'button' | 'submit';
  label?: string;
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark';
  disabled?: boolean;
  anchor?: boolean;
  size?: 'sm' | 'lg' | 'md';
}

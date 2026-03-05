import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    @if (buttonType() === 'a') {
      <a
        [class]="'btn btn-' + resolvedConfig().color + ' btn-' + resolvedConfig().size"
        (click)="onClick.emit()"
      >
        <ng-content select="[icon]"></ng-content>
        {{ resolvedConfig().label }}
      </a>
    } @else {
      <button
        [type]="resolvedConfig().type"
        [disabled]="resolvedConfig().disabled"
        [class]="'btn btn-' + resolvedConfig().color + ' btn-' + resolvedConfig().size"
        (click)="onClick.emit()"
      >
        <ng-content select="[icon]"></ng-content>
        {{ resolvedConfig().label }}
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
  config = input<ButtonConfig>({});

  resolvedConfig = computed(() => {
    const c = this.config();
    return {
      type: c.type ?? 'button',
      label: c.label ?? 'Click Me',
      color: c.color ?? 'primary',
      disabled: c.disabled ?? false,
      anchor: c.anchor ?? false,
      size: c.size ?? 'sm',
    };
  });

  buttonType = computed(() => (this.resolvedConfig().anchor ? 'a' : 'button'));

  onClick = output<void>();
}

interface ButtonConfig {
  type?: 'button' | 'submit';
  label?: string;
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark';
  disabled?: boolean;
  anchor?: boolean;
  size?: 'sm' | 'lg' | 'md';
}

import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

export const slider =
  trigger('routeAnimations', [
    transition('* <=> *', [
      /* order */
      query(':enter', style({ position: 'absolute', transformOrigin: '0 0', width: '100%', height: '100%' })
        , { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([  // block executes in parallel
        query(':enter', [
          style({ transform: 'scale(0, 0)', zIndex: 2, opacity: 0.3 }),
          animate('1s ease', style({ transform: 'scale(1, 1)', opacity: 1 })),
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)', zIndex: 1 }),
          // animate('12.4s ease', style({ transform: 'translateX(-100%)' })),
        ], { optional: true }),

      ]),
    ]),
  ]);


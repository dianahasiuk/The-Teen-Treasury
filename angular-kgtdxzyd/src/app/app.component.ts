
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomNavComponent } from './components/layout/bottom-nav.component';
@Component({
selector: 'app-root',
standalone: true,
imports: [RouterOutlet, BottomNavComponent],
template: `
<div
class="
        w-full min-h-screen
        flex items-center justify-center
        bg-transparent
        p-4
      "
>
<!-- PHONE FRAME -->
<div
class="
          relative
          w-full max-w-[430px]
          h-[900px]
          rounded-[46px]
          overflow-hidden
          shadow-[0_0_40px_rgba(0,0,0,0.25)]
          bg-transparent
        "
>
<!-- PAGE CONTENT -->
<main
class="
            absolute inset-0
            pt-20 pb-28 px-6
            overflow-y-auto
          "
>
<router-outlet></router-outlet>
</main>
<!-- BOTTOM NAV (fixed inside frame) -->
<div class="absolute bottom-0 left-0 right-0">
<app-bottom-nav></app-bottom-nav>
</div>
</div>
</div>
`,
})
export class AppComponent {}
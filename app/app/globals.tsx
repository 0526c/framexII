@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --void: #050505;
  --void-light: #0a0a0c;
  --void-lighter: #111113;
  --gold: #d4a84b;
  --gold-bright: #e8c56a;
  --brand-red: #c44536;
  --cream: #e8e4dc;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--void);
  color: var(--cream);
  min-height: 100vh;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
}

::-webkit-scrollbar-thumb {
  background: rgba(212, 168, 75, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(212, 168, 75, 0.5);
}

::selection {
  background: rgba(212, 168, 75, 0.3);
  color: var(--cream);
}

@keyframes grain {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-2%, -2%); }
  20% { transform: translate(2%, 2%); }
  30% { transform: translate(-1%, 1%); }
  40% { transform: translate(1%, -1%); }
  50% { transform: translate(-2%, 2%); }
  60% { transform: translate(2%, -2%); }
  70% { transform: translate(-1%, -1%); }
  80% { transform: translate(1%, 1%); }
  90% { transform: translate(-2%, -2%); }
}

button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

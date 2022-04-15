interface Window {
  toast: any;
}

declare var window: Window & typeof globalThis;

export type toastStatus =
  | 'success'
  | 'error'
  | 'info'
  | 'custom'
  | 'loading'
  | 'warning';

export type justify = 'left' | 'right' | 'center';
export type align = 'top' | 'bottom';
export type toastPlacement = `${align}-${justify}`;

export interface ToastConfigStyle {
  border?: string;
  padding?: string;
  color?: string;
}
export interface IconThemeStyle {
  primary: string;
  secondary: string;
}
export interface toastConfiguration {
  placement?: toastPlacement;
  duration: number; // duration in ms
  icon?: string; // innerHtml and only works on toast() function
  style?: ToastConfigStyle;
  iconTheme?: IconThemeStyle;
  dismissible: boolean;
}
export type placementData = 'consistent' | 'stacks';

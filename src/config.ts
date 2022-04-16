import type {
  toastConfiguration,
  toastPlacement,
  placementData,
} from './types';

export const possibleToastPlacements = [
  'top-left',
  'top-right',
  'top-center',
  'bottom-left',
  'bottom-right',
  'bottom-center',
];

export const defaultDuration = 2000;
export const toastDefaultConfig: toastConfiguration = {
  duration: defaultDuration,
  dismissible: false,
};

export const placementDatas = ['consistent', 'stacks'];
export const defaultToastPlacement: toastPlacement = 'top-center';

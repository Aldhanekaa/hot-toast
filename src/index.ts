/**
 *
 */
import './css/index.css';
import './css/abc.css';

import $ from 'jquery';

import type { toastPlacement, placementData } from './types';

import {
  possibleToastPlacements,
  placementDatas,
  defaultToastPlacement,
} from './config';

import { Toast, checksPlacementData } from './toast';

var toastOrder: JQuery<HTMLElement> | undefined;

(function () {
  console.log('jhii');
  let placementDataOnCurrentScript = document.currentScript.dataset.placement;

  // @ts-ignore
  let placementData: placementData = placementDatas.includes(
    placementDataOnCurrentScript
  )
    ? placementDataOnCurrentScript
    : 'consistent';

  let toastPlacementOnCurrentScript =
    document.currentScript.dataset.toastPlacement;

  // @ts-ignore
  let toastPlacement: toastPlacement = possibleToastPlacements.includes(
    toastPlacementOnCurrentScript
  )
    ? toastPlacementOnCurrentScript
    : defaultToastPlacement;

  const toastOrderStr = (placement?: string) =>
    `<div class="toast-order" id="${placement}"></div>`;
  const toastParent = $(`<div id="hot_toast">
  
 ${
   placementData == 'consistent'
     ? ''
     : possibleToastPlacements
         .map(
           (
             placement
           ) => `<div class="toast-placement" id="placement_${placement}">
           ${toastOrderStr(`toast-order_placement_${placement}`)}
 </div>`
         )
         .join('')
 }

  </div>`);

  if (placementData == 'consistent') {
    toastOrder = $(toastOrderStr(''));
    toastParent.append(toastOrder);
  }

  checksPlacementData(toastOrder, placementData, toastPlacement);
  $('body').append(toastParent);

  window.toast = new (Toast as any)(toastOrder, toastPlacement, placementData);
})();

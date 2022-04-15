/**
 *
 */
import './index.css';
import './abc.css';

import $ from 'jquery';

type justify = 'left' | 'right' | 'center';
type align = 'top' | 'bottom';
type toastPlacement = `${align}-${justify}`;

const possibleToastPlacements = [
  'top-left',
  'top-right',
  'top-center',
  'bottom-left',
  'bottom-right',
  'bottom-center',
];

interface ToastConfigStyle {
  border?: string;
  padding?: string;
  color?: string;
}
interface IconThemeStyle {
  primary: string;
  secondary: string;
}
interface toastConfiguration {
  placement?: toastPlacement;
  duration: number; // duration in ms
  icon?: string; // innerHtml and only works on toast() function
  style?: ToastConfigStyle;
  iconTheme?: IconThemeStyle;
}
const defaultDuration = 2000;
const toastDefaultConfig: toastConfiguration = {
  duration: defaultDuration,
};

type placementData = 'consistent' | 'stacks';
const placementDatas = ['consistent', 'stacks'];
const defaultToastPlacement: toastPlacement = 'bottom-left';

var toastOrder: JQuery<HTMLElement> | undefined;

(function () {
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

  function Toast() {
    if (!this || this == window) {
      return new (Toast as any)();
    }

    var f = function (
      message: string,
      config: toastConfiguration = toastDefaultConfig
    ) {
      toastTrigger(
        toastParent,
        toastPlacement,
        placementData,
        'custom',
        message,
        config
      );
    };
    // @ts-ignore
    f.__proto__ = Toast.prototype;
    f.constructor = Toast;

    return f;
  }
  Toast.prototype.reverse = function (isReverse: boolean) {
    if (placementData == 'consistent') {
      if (isReverse && toastOrder.hasClass('reverse')) {
      } else if (isReverse && !toastOrder.hasClass('reverse')) {
        toastOrder.addClass('reverse');
      } else if (!isReverse && toastOrder.hasClass('reverse')) {
        toastOrder.removeClass('reverse');
      }
    } else {
      const toastOrders = $('.toast-order');
      if (isReverse && toastOrders.hasClass('reverse')) {
      } else if (isReverse && !toastOrders.hasClass('reverse')) {
        toastOrders.addClass('reverse');
      } else if (!isReverse && toastOrders.hasClass('reverse')) {
        toastOrders.removeClass('reverse');
      }
    }
    return;
  };

  Toast.prototype.success = function (
    message: string,
    config: toastConfiguration = toastDefaultConfig
  ) {
    let contentParent = toastTrigger(
      toastParent,
      toastPlacement,
      placementData,
      'success',
      message,
      config
    );

    timeOutToast(contentParent, config.duration);
  };
  Toast.prototype.error = function (
    message: string,
    config: toastConfiguration = toastDefaultConfig
  ) {
    let contentParent = toastTrigger(
      toastParent,
      toastPlacement,
      placementData,
      'error',
      message,
      config
    );

    timeOutToast(contentParent, config.duration);
  };
  Toast.prototype.promise = function (
    message: string,
    PromiseMessage: { loading: string; success: string; error: string },
    config: toastConfiguration = toastDefaultConfig
  ) {
    toastTrigger(
      toastParent,
      toastPlacement,
      placementData,
      'error',
      message,
      config
    );
  };

  checksPlacementData(toastParent, placementData, toastPlacement);
  $('body').append(toastParent);

  window.toast = new (Toast as any)();
})();

function checksPlacementData(
  toastParent: JQuery<HTMLElement>,
  placementData: placementData,
  toastPlacement: toastPlacement
) {
  if (placementData == 'consistent') {
    toastParent.addClass(`consistent ${toastPlacement}`);
    return;
  }
  return;
}

type toastStatus = 'success' | 'error' | 'info' | 'custom';

function toastTrigger(
  toastParent: JQuery<HTMLElement>,
  toastPlacement: toastPlacement,
  placementData: placementData,
  toastStatus: toastStatus,
  message: string,
  config: toastConfiguration = toastDefaultConfig
) {
  if (!message) {
    console.error(
      "Expected 1 arguments, but got 0. An argument for 'message' was not provided."
    );
    return;
  }
  // <div id="" class="go2344853693 icon-hot-toast"></div> success
  // <div class="go2534082608 icon-hot-toast"></div> error

  const successIcon = `<div id="" class="go2344853693 icon-hot-toast"></div>`;
  const errorIcon = `<div class="go2534082608 icon-hot-toast"></div>`;
  const loading = (mainIcon?: string) =>
    `<div class="go685806154"><div class="go1858758034"></div><div class="go1579819456">${mainIcon}</div></div>`;

  var statusClass;
  var icon;
  var iconElement;

  switch (toastStatus) {
    case 'success':
      statusClass = 'success-toast';
      icon = successIcon;
      break;

    case 'error':
      statusClass = 'error-toast';
      icon = errorIcon;
      break;

    case 'info':
      statusClass = 'info-toast';
      icon = '';
      break;
    default:
      icon = '';
      statusClass = '';
      break;
  }

  if (!config.duration) {
    config.duration = defaultDuration;
  }

  if (config.icon) {
    icon = config.icon;
  }

  if (icon) {
    if (config.icon) {
      console.log(icon);
      iconElement = $(`<span>${icon}</span>`);
      IconCustomStyle(iconElement, config.iconTheme);
      var a = iconElement.html();

      iconElement = a;
    } else {
      iconElement = $(icon);
      IconCustomStyle(iconElement, config.iconTheme);

      var a = $('<div></div>').append(iconElement).html();
      iconElement = loading(a);
    }
  }

  const contentStr = (icon: string) => `
    <div class="toast-content "> ${
      icon && `<div class="toast-icon">${icon}</div>`
    } <span class="toast-message">${message}</span></div>
    `;

  const contentParent = $(`<div class="toast showing"> </div>`);
  let content = $(contentStr(icon && iconElement));

  customStyle(content, config.style);

  contentParent.append(content);

  if (placementData == 'stacks') {
    $(`#toast-order_placement_${toastPlacement}`).append(contentParent);
  } else {
    toastOrder.append(contentParent);
  }

  return contentParent;
}

function customStyle(content: JQuery<HTMLElement>, style: ToastConfigStyle) {
  if (style) {
    // @ts-ignore
    content.css(style);
  }
}
function IconCustomStyle(
  iconElement: JQuery<HTMLElement>,
  iconThemeStyle: IconThemeStyle
) {
  if (iconElement && iconThemeStyle) {
    iconElement.css('background', iconThemeStyle.primary);
    iconElement.css('color', iconThemeStyle.secondary);
  }
}

function timeOutToast(contentParent: JQuery<HTMLElement>, duration: number) {
  setTimeout(() => {
    contentParent.removeClass('showing');
    contentParent.addClass('hiding');

    setTimeout(() => {
      contentParent.remove();
    }, 220);
  }, duration);
}

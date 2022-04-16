import type {
  toastConfiguration,
  toastPlacement,
  ToastConfigStyle,
  IconThemeStyle,
  toastStatus,
  placementData,
} from './types';
import $ from 'jquery';

import { defaultDuration, toastDefaultConfig } from './config';

export function Toast(
  toastOrder: JQuery<HTMLElement>,
  toastPlacement: toastPlacement,
  placementData: placementData
) {
  if (!this || this == window) {
    return new (Toast as any)();
  }

  var f = function (
    message: string,
    config: toastConfiguration = toastDefaultConfig
  ) {
    var contentParent = new ToastTrigger(
      toastOrder,
      toastPlacement,
      placementData,
      'custom',
      message,
      config
    );

    timeOutToast(contentParent.toastElement, config.duration);
  };

  //   console.log(Object.kaZSXDFGC eys(Toast.prototype));

  for (let key of Object.keys(Toast.prototype)) {
    // @ts-ignore
    f.__proto__[key] = Toast.prototype[key](
      toastOrder,
      toastPlacement,
      placementData
    );
  }

  f.constructor = Toast;

  return f;
}
Toast.prototype.reverse = function (
  toastOrder: JQuery<HTMLElement>,
  toastPlacement: toastPlacement,
  placementData: placementData
) {
  return function (isReverse: boolean) {
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
};

Toast.prototype.success = function (
  toastParent: JQuery<HTMLElement>,
  toastPlacement: toastPlacement,
  placementData: placementData,
  toastOrder: JQuery<HTMLElement>
) {
  return function (
    message: string,
    config: toastConfiguration = toastDefaultConfig
  ) {
    let contentParent = new ToastTrigger(
      toastParent,
      toastPlacement,
      placementData,
      'success',
      message,
      config
    );

    timeOutToast(contentParent.toastElement, config.duration);

    return contentParent;
  };
};
Toast.prototype.info = function (
  toastParent: JQuery<HTMLElement>,
  toastPlacement: toastPlacement,
  placementData: placementData,
  toastOrder: JQuery<HTMLElement>
) {
  return function (
    message: string,
    config: toastConfiguration = toastDefaultConfig
  ) {
    let contentParent = new ToastTrigger(
      toastParent,
      toastPlacement,
      placementData,
      'info',
      message,
      config
    );

    timeOutToast(contentParent.toastElement, config.duration);

    return contentParent;
  };
};

Toast.prototype.warning = function (
  toastParent: JQuery<HTMLElement>,
  toastPlacement: toastPlacement,
  placementData: placementData,
  toastOrder: JQuery<HTMLElement>
) {
  return function (
    message: string,
    config: toastConfiguration = toastDefaultConfig
  ) {
    let contentParent = new ToastTrigger(
      toastParent,
      toastPlacement,
      placementData,
      'warning',
      message,
      config
    );

    timeOutToast(contentParent.toastElement, config.duration);

    return contentParent;
  };
};
Toast.prototype.error = function (
  toastParent: JQuery<HTMLElement>,
  toastPlacement: toastPlacement,
  placementData: placementData,
  toastOrder: JQuery<HTMLElement>
) {
  return function (
    message: string,
    config: toastConfiguration = toastDefaultConfig
  ) {
    let contentParent = new ToastTrigger(
      toastParent,
      toastPlacement,
      placementData,
      'error',
      message,
      config
    );

    timeOutToast(contentParent.toastElement, config.duration);

    return contentParent;
  };
};

Toast.prototype.promise = function (
  toastParent: JQuery<HTMLElement>,
  toastPlacement: toastPlacement,
  placementData: placementData,
  toastOrder: JQuery<HTMLElement>
) {
  return function (
    promise: Promise<any>,
    PromiseMessage: { loading: string; success: string; error: string },
    config: toastConfiguration = toastDefaultConfig
  ) {
    // promise.then()
    // toastTrigger(
    //   toastParent,
    //   toastPlacement,
    //   placementData,
    //   'error',
    //   message,
    //   config
    // );
  };
};

export function checksPlacementData(
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

class ToastTrigger {
  toastElement: JQuery<HTMLElement>;

  constructor(
    toastOrder: JQuery<HTMLElement>,
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
    const infoIcon = `<div id="" class="infoIcon icon-hot-toast"></div>`;
    const errorIcon = `<div class="go2534082608 icon-hot-toast"></div>`;
    const warningIcon = `<svg class="icon-hot-toast"  width="25px" height="25px" viewBox="-50 -50 300 300">
  <polygon class="triangle warning-sign hot-toast-path-sign" stroke-linejoin="round" points="100,0 0,200 200,200"/>
  <path class="exclamation" xmlns="http://www.w3.org/2000/svg" d="M49.9,78c-4.2,0-7.6,3.5-7.6,7.8v1.5c0,4.3,3.4,7.7,7.6,7.7c4.2,0,7.7-3.4,7.7-7.7v-1.5C57.6,81.5,54.2,78,49.9,78L49.9,78z   M49.8,5c-6.3,0-11.9,6.1-11.3,12.4l3.8,47c0.2,3.7,3.1,6.9,6.9,7.2c4.3,0.3,8.1-3,8.4-7.2l3.9-47C62,11.1,56.6,5,49.8,5z"/>
</svg>
 `;

    const loading = `<div class="go1858758034"></div>`;

    const generateIconParent = (mainIcon?: string) =>
      `<div class="go685806154"><div class="go1579819456">${mainIcon}</div></div>`;

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
        icon = infoIcon;
        break;

      case 'loading':
        statusClass = 'loading-toast';
        icon = loading;
        break;

      case 'warning':
        statusClass = 'warning-toast';
        icon = warningIcon;
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
        iconElement = $(`<span>${icon}</span>`);
        IconCustomStyle(iconElement, config.iconTheme);
        var a = iconElement.html();

        iconElement = a;
      } else {
        iconElement = $(icon);
        IconCustomStyle(
          iconElement,
          config.iconTheme,
          toastStatus == 'warning' ? true : false
        );

        var a = $('<div></div>').append(iconElement).html();
        iconElement = generateIconParent(a);
      }
    }

    const xSign = $(
      `<div class="hot-toast-close">
    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path fill="currentColor" d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z">
        </path>
    </svg>
    </div>`
    );
    IconCustomStyle(xSign, config.iconTheme, true);

    const contentParentStr = `
    <div class="toast-content-parent "> 
    </div>
    `;

    const toastElement = $(`<div class="toast showing"> </div>`);
    let contentParent = $(contentParentStr);
    let content = $('<div class="toast-cotent"></div>');

    customStyle(contentParent, config.style);
    if (icon) {
      content.append($(`<div class="toast-icon">${iconElement}</div>`));
    }

    content.append($(` <span class="toast-message">${message}</span>`));
    contentParent.append(content);

    if (config.dismissible) {
      contentParent.append(xSign);

      xSign.on('click', () => {
        this.close();
      });
    }

    toastElement.append(contentParent);

    if (placementData == 'stacks') {
      $(`#toast-order_placement_${toastPlacement}`).append(contentParent);
    } else {
      toastOrder.append(toastElement);
    }

    this.toastElement = toastElement;
  }

  close() {
    this.toastElement.removeClass('showing');
    this.toastElement.addClass('hiding');

    setTimeout(() => {
      this.toastElement.remove();
    }, 220);
  }
}

export function customStyle(
  content: JQuery<HTMLElement>,
  style: ToastConfigStyle
) {
  if (style) {
    // @ts-ignore
    content.css(style);
  }
}
export function IconCustomStyle(
  iconElement: JQuery<HTMLElement>,
  iconThemeStyle: IconThemeStyle,
  warning?: boolean
) {
  if (iconElement && iconThemeStyle) {
    if (warning) {
      iconElement
        .children('.hot-toast-path-sign')
        .css('fill', iconThemeStyle.primary);
      iconElement
        .children('.hot-toast-path-sign')
        .css('stroke', iconThemeStyle.primary);
      return;
    }

    // console.log(iconThemeStyle, iconElement);
    iconElement.css('background', iconThemeStyle.primary);
    iconElement.css('color', iconThemeStyle.secondary);
    // console.log(iconElement.css('background'));
  }
}
export function timeOutToast(
  contentParent: JQuery<HTMLElement>,
  duration: number
) {
  setTimeout(() => {
    contentParent.removeClass('showing');
    contentParent.addClass('hiding');

    setTimeout(() => {
      contentParent.remove();
    }, 220);
  }, duration);
}

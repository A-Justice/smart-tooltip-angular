import { OnInit, Directive, HostBinding, HostListener, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Directive({
  selector: '[smart-tooltip-container]',

})
export class SmartTooltipAngularDirective implements OnInit {

  classes = ["right", "right-t", "right-b", "left", "left-t", "left-b", "bottom", "bottom-r", "bottom-l", "top", "top-r", "top-l"];

  offSetValue = 5;


  @HostBinding("style.position") position;

  @HostListener("mouseenter") mouseEnter() {
    this.myfunc(this.elementRef);
  }

  @HostListener("mouseleave") mouseLeave() {
    this.mouseLeft(this.elementRef);
  }
  
  constructor(private elementRef:ElementRef) {

    this.elementRef.nativeElement.classList.add("smart-tooltip-container");

  }

  ngOnInit(): void {
  }



  myfunc(elementRef: ElementRef) {
    let root = this;

    let btn = elementRef.nativeElement;
    if (!btn) return;
    //var body = document.querySelector("body");

    let tooltip = btn.querySelector(".smart-tooltip");

    if (!tooltip) return;

    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";
    tooltip.style.display = "block";

    var tooltipclient = tooltip.getBoundingClientRect();
    var btnclient = btn.getBoundingClientRect();
    //var bodyclient = body.getClientRects()[0];

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    var spaces = {
      left: btnclient.left > tooltipclient.width,
      right: (windowWidth - btnclient.right) > tooltipclient.width,
      top: btnclient.top > tooltipclient.height,
      bottom: (windowHeight - btnclient.bottom) > tooltipclient.height,
      getSpace: function (key) {
        let stayClass = root.getStayClass(tooltip);
        // debugger;
        if (stayClass) {
          if (stayClass == key)
            return true;
          else
            return false;
        }
        return this[key];
      }
    }

    this.removeTooltipClass(tooltip);

    if (spaces.getSpace("left")) {

      let topHalf = (btnclient.bottom - (btnclient.height / 2));
      let bottomHalf = windowHeight - topHalf;
      let halfTooltip = (tooltipclient.height / 2);

      let isContainerBigger = btnclient.height >= tooltipclient.height;

      if (isContainerBigger || ((topHalf > halfTooltip) && (bottomHalf > halfTooltip))) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "left")) {
          tooltip.classList.add('left');
        }
      } else if (topHalf <= halfTooltip) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "left-b")) {
          tooltip.classList.add('left-b');
        }

      } else if (bottomHalf <= halfTooltip) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "left-t")) {
          tooltip.classList.add('left-t');
        }

      }

    } else if (spaces.getSpace("right")) {

      let topHalf = (btnclient.bottom - (btnclient.height / 2));
      let bottomHalf = windowHeight - topHalf;
      let halfTooltip = (tooltipclient.height / 2);

      let isContainerBigger = btnclient.height >= tooltipclient.height;

      if (isContainerBigger || ((topHalf > halfTooltip) && (bottomHalf > halfTooltip))) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "right")) {
          tooltip.classList.add('right');
        }
      } else if (topHalf <= halfTooltip) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "right-b")) {
          tooltip.classList.add('right-b');
        }
      } else if (bottomHalf <= halfTooltip) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "right-t")) {
          tooltip.classList.add('right-t');
        }
      }

    } else if (spaces.getSpace("top")) {

      let leftHalf = (btnclient.right - (btnclient.width / 2));
      let rightHalf = windowWidth - leftHalf;
      let halfTooltip = (tooltipclient.width / 2);

      let isContainerBigger = btnclient.width >= tooltipclient.width;

      if (isContainerBigger || ((leftHalf > halfTooltip) && (rightHalf > halfTooltip))) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "top")) {
          tooltip.classList.add('top');
        }
      } else if (leftHalf <= halfTooltip) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "top-r")) {
          tooltip.classList.add('top-r');
        }

      } else if (rightHalf <= halfTooltip) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "top-l")) {
          tooltip.classList.add('top-l');
        }
      }

    } else if (spaces.getSpace("bottom")) {
      // debugger;
      let leftHalf = (btnclient.right - (btnclient.width / 2));
      let rightHalf = windowWidth - leftHalf;
      let halfTooltip = (tooltipclient.width / 2);

      let isContainerBigger = btnclient.width >= tooltipclient.width;



      if (isContainerBigger || ((leftHalf > halfTooltip) && (rightHalf > halfTooltip))) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "bottom")) {
          tooltip.classList.add('bottom');
        }

      } else if (leftHalf <= halfTooltip) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "bottom-r")) {
          tooltip.classList.add('bottom-r');
        }

      } else if (rightHalf <= halfTooltip) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "bottom-l")) {
          tooltip.classList.add('bottom-l');
        }
      }


    } else {
      // debugger;
      if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "bottom")) {
        tooltip.classList.add('bottom');
      }
    }

  }

  removeTooltipClass(tooltip) {
    let classList = tooltip.classList;
    classList.forEach(element => {
      if (this.classes.includes(element)) {
        classList.remove(element);
      }
    });
  }

  getStayClass(tooltip) {
    var classList = tooltip.classList;
    let stayPosition;
    classList.forEach(element => {
      if (element.includes(`stay-`)) {
        stayPosition = element.split("-")[1];
      }
    });

    return stayPosition;
  }


  mouseLeft(elementRef: ElementRef) {

    let btn = elementRef.nativeElement;
    if (!btn) return;

    let tooltip = btn.querySelector(".smart-tooltip");

    if (!tooltip) return;

    if (this.removeOverlayClass(tooltip)) {

      let tooltipRect = tooltip.getBoundingClientRect();


      //Reset Inline Styles
      tooltip.style.position = "";
      tooltip.style.top = "";
      tooltip.style.left = "";
      tooltip.style.bottom = "";
      tooltip.style.right = "";



      tooltip.classList.add("overlay");
    }

    //Make sure its not visible after mouse has left
    tooltip.style.visibility = "collapse"
    tooltip.style.opacity = "0";
    tooltip.style.display = "none";
  }

  removeOverlayClass(tooltip) {
    let hasOverlay = false

    if (tooltip.classList.contains("overlayed")) {
      hasOverlay = true;
      tooltip.classList.remove("overlayed");
    }

    return hasOverlay;
  }

  removeOverlayMarkClass(tooltip) {
    let hasOverlay = false

    if (tooltip.classList.contains("overlay")) {
      hasOverlay = true;
      tooltip.classList.remove("overlay");
    }

    return hasOverlay;
  }

  /**
   * Calculate the position of the tooltip based on the fixed position of the container
   * @param {DOMClientRect} btnclient The Rectangle that defines the button element
   * @param {string} tooltipPostion The position the tooltip should be displayed
   */
  getOverlayCoordinates(btnclient, tooltipclient, tooltipPostion) {
    // let body:any = document.querySelector("body");
    // let bodyclient = body.getClientRects()[0];

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    if (tooltipPostion.includes("right")) {

      let overlayCoordinates: any = {
        left: btnclient.right + this.offSetValue,
        top: (btnclient.top + (btnclient.height / 2)) - (tooltipclient.height / 2),
        props: ["left", "top"]
      }

      if (tooltipPostion == "right-t") {
        overlayCoordinates.bottom = windowHeight - btnclient.bottom;
        overlayCoordinates.props = ["left", "bottom"];
      } else if (tooltipPostion == "right-b") {
        overlayCoordinates.top = btnclient.top + this.offSetValue;
      }

      return overlayCoordinates;
    } else if (tooltipPostion.includes("left")) {
     
      let overlayCoordinates: any = {
        right: (windowWidth - btnclient.left) + this.offSetValue,
        top: (btnclient.top + (btnclient.height / 2)) - (tooltipclient.height / 2),
        props: ["right", "top"]
      }

      if (tooltipPostion == "left-t") {
        overlayCoordinates.bottom = windowHeight - btnclient.bottom;
        overlayCoordinates.props = ["right", "bottom"];
      } else if (tooltipPostion == "left-b") {
        overlayCoordinates.top = btnclient.top + this.offSetValue;
      }

      return overlayCoordinates;
    } else if (tooltipPostion.includes("top")) {

      let overlayCoordinates: any = {
        left: (btnclient.right - (btnclient.width / 2)) - (tooltipclient.width / 2),
        bottom: (windowHeight - btnclient.top) + this.offSetValue,
        props: ["left", "bottom"]
      }

      if (tooltipPostion == "top-l") {
        overlayCoordinates.right = (windowWidth - btnclient.right) + this.offSetValue;
        overlayCoordinates.props = ["right", "bottom"]
      } else if (tooltipPostion == "top-r") {
        overlayCoordinates.left = btnclient.left + this.offSetValue;
      }

      return overlayCoordinates;
    } else if (tooltipPostion.includes("bottom")) {

      let overlayCoordinates: any = {
        left: (btnclient.right - (btnclient.width / 2)) - (tooltipclient.width / 2),
        top: btnclient.bottom + this.offSetValue,
        props: ["left", "top"]
      }

      if (tooltipPostion == "bottom-l") {
        overlayCoordinates.right = (windowWidth - btnclient.right) + this.offSetValue;
        overlayCoordinates.props = ["right", "top"]
      } else if (tooltipPostion == "bottom-r") {
        overlayCoordinates.left = btnclient.left + this.offSetValue;
      }

      return overlayCoordinates;
    }
  }

  /**
   * Checks for overlay class and manipulate it
   * @param {any} tooltip the tooltip element
   * @param {string} position the string that show which side the tooltip is
   */
  manipulateOverlayIfPresent(btnBClientRect, tooltip, tooltipPosition) {
    //removeOverlayMarkClass checks for the presence of the overlay mark i.e
    //overlay .. remove it and add the overlayed class which has the css declarations
    //debugger;
    if (this.removeOverlayMarkClass(tooltip)) {

      // debugger;
      //Get the overlay coordinates
      let overlayCoordinates = this.getOverlayCoordinates(btnBClientRect, tooltip.getBoundingClientRect(), tooltipPosition);

      //Get the set properties base the tooltip position based on the tooltipPosition

      //Overlay styles to tooltip control
      tooltip.style.position = "fixed";

      for (let prop of overlayCoordinates.props) {
        tooltip.style[prop] = overlayCoordinates[prop] + "px";
      }


      //Add the actual overlayed class which resets old styles
      tooltip.classList.add("overlayed");

      return true;
    }

    return false;
  }


}

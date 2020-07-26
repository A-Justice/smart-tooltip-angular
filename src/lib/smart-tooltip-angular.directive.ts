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

  constructor(private elementRef: ElementRef) {

    this.elementRef.nativeElement.classList.add("smart-tooltip-container");

    var head = document.getElementsByTagName('head')[0];
    var cs = document.createElement('style');
    cs.type = 'text/css';
    cs.innerHTML = `
              .smart-tooltip-container {
                position: relative;
          }

          .smart-tooltip-container:hover .smart-tooltip {
                visibility: visible;
                opacity: 1;
          }

          .smart-tooltip {
                position: absolute;
                background-color: #333;
                border-radius: 5px;
                color: #eee;
                padding: 10px 12px;
                z-index: 100000;
                top: 50%;
                -webkit-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
                left: 50%;
                visibility: collapse;
                transition: all .2s;
                opacity: 0;
                outline: none;
          }

          .smart-tooltip.left-t {
                -webkit-transform: none;
                transform: none;
                right: calc(100% + 5px);
                left: initial;
                top: initial;
                bottom: 5px;

                
          }

          .smart-tooltip.left-b {
                -webkit-transform: none;
                transform: none;
                right: calc(100% + 5px);
                left: initial;
                top: 5px;
                bottom: initial;
          }

          .smart-tooltip.left {
                right: calc(100% + 5px);
                left: initial;
                top: 50%;
                -webkit-transform: translateY(-50%);
                transform: translateY(-50%);
          }

          .smart-tooltip.right-b {
                -webkit-transform: none;
                transform: none;
                left: calc(100% + 5px);
                top: 5px;
                right: initial;
                bottom: initial;    
          }

          .smart-tooltip.right-t {
                -webkit-transform: none;
                transform: none;
                /* display: none; */
                left: calc(100% + 5px);
                top: initial;
                bottom: 5px;
          }

          .smart-tooltip.right {
                left: calc(100% + 5px);
                top: 50%;
                bottom: initial;
                right: initial;
                -webkit-transform: translateY(-50%);
                transform: translateY(-50%);
          }

          .smart-tooltip.bottom-r {
                /* display: none; */
                top: calc(100% + 5px);
                bottom: initial;
                left: 5px;
                right:initial;
                transform: none;
          }
          .smart-tooltip.bottom-l {
                /* display: none; */
                top: calc(100% + 5px);
                bottom: initial;
                right: 5px;
                left:initial;
                transform: none;
          }
          .smart-tooltip.bottom {
                /* display: none; */
                top: calc(100% + 5px);
                bottom: initial;
                left: 50%;
                transform: translateX(-50%);
          }

          .smart-tooltip.top-r {
                /* display: none; */
                bottom: calc(100% + 5px);
                top: initial;
                left: 5px;
                right:initial;
                transform: none;
          }
          .smart-tooltip.top-l {
                /* display: none; */
                bottom: calc(100% + 5px);
                top: initial;
                right: 5px;
                left: initial;
                transform: none;
          }
          .smart-tooltip.top {
                /* display: none; */
                bottom: calc(100% + 5px);
                top: initial;
                left: 50%;
                transform: translateX(-50%);
          }
    `;
    head.appendChild(cs);
  }

  ngOnInit(): void {
  }



  myfunc(elementRef: ElementRef) {
    let root = this;

    let btn = elementRef.nativeElement;
    if (!btn) return;
    var body = document.querySelector("body");

    let tooltip = btn.querySelector(".smart-tooltip");

    if (!tooltip) return;

    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";
    tooltip.style.display = "block";

    var tooltipclient = tooltip.getBoundingClientRect();
    var btnclient = btn.getBoundingClientRect();
    var bodyclient = body.getClientRects()[0];

    console.log(bodyclient);

    var spaces = {
      left: btnclient.left > tooltipclient.width,
      right: (bodyclient.width - btnclient.right) > tooltipclient.width,
      top: btnclient.top > tooltipclient.height,
      bottom: (bodyclient.height - btnclient.bottom) > tooltipclient.height,
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
      let bottomHalf = bodyclient.height - topHalf;
      let halfTooltip = (tooltipclient.height / 2);

      let isContainerBigger = btnclient.height >= tooltipclient.height;

      if (isContainerBigger || ((topHalf > halfTooltip) && (bottomHalf > halfTooltip))) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "left")) {
          tooltip.classList.add('left');
        }
      } else if (topHalf < halfTooltip) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "left-b")) {
          tooltip.classList.add('left-b');
        }

      } else if (bottomHalf < halfTooltip) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "left-t")) {
          tooltip.classList.add('left-t');
        }

      }

    } else if (spaces.getSpace("right")) {

      let topHalf = (btnclient.bottom - (btnclient.height / 2));
      let bottomHalf = bodyclient.height - topHalf;
      let halfTooltip = (tooltipclient.height / 2);

      let isContainerBigger = btnclient.height >= tooltipclient.height;

      if (isContainerBigger || ((topHalf > halfTooltip) && (bottomHalf > halfTooltip))) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "right")) {
          tooltip.classList.add('right');
        }
      } else if (topHalf < halfTooltip) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "right-b")) {
          tooltip.classList.add('right-b');
        }
      } else if (bottomHalf < halfTooltip) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "right-t")) {
          tooltip.classList.add('right-t');
        }
      }

    } else if (spaces.getSpace("top")) {

      let leftHalf = (btnclient.right - (btnclient.width / 2));
      let rightHalf = bodyclient.width - leftHalf;
      let halfTooltip = (tooltipclient.width / 2);

      let isContainerBigger = btnclient.width >= tooltipclient.width;

      if (isContainerBigger || ((leftHalf > halfTooltip) && (rightHalf > halfTooltip))) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "top")) {
          tooltip.classList.add('top');
        }
      } else if (leftHalf < halfTooltip) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "top-r")) {
          tooltip.classList.add('top-r');
        }

      } else if (rightHalf < halfTooltip) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "top-l")) {
          tooltip.classList.add('top-l');
        }
      }

    } else if (spaces.getSpace("bottom")) {
      // debugger;
      let leftHalf = (btnclient.right - (btnclient.width / 2));
      let rightHalf = bodyclient.width - leftHalf;
      let halfTooltip = (tooltipclient.width / 2);

      let isContainerBigger = btnclient.width >= tooltipclient.width;



      if (isContainerBigger || ((leftHalf > halfTooltip) && (rightHalf > halfTooltip))) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "bottom")) {
          tooltip.classList.add('bottom');
        }

      } else if (leftHalf < halfTooltip) {
        if (!this.manipulateOverlayIfPresent(btnclient, tooltip, "bottom-r")) {
          tooltip.classList.add('bottom-r');
        }

      } else if (rightHalf < halfTooltip) {
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


  mouseLeft(elementRef:ElementRef) {
    
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
    
    let bodyclient = document.querySelector("body").getClientRects()[0];

    if (tooltipPostion.includes("right")) {

      let overlayCoordinates:any = {
        left: btnclient.right + this.offSetValue,
        top: (btnclient.top + (btnclient.height / 2)) - (tooltipclient.height / 2),
        props: ["left", "top"]
      }

      if (tooltipPostion == "right-t") {
        overlayCoordinates.bottom = bodyclient.height - btnclient.bottom;
        overlayCoordinates.props = ["left", "bottom"];
      } else if (tooltipPostion == "right-b") {
        overlayCoordinates.top = btnclient.top + this.offSetValue;
      }

      return overlayCoordinates;
    } else if (tooltipPostion.includes("left")) {

      let overlayCoordinates:any = {
        right: (bodyclient.width - btnclient.left) + this.offSetValue,
        top: (btnclient.top + (btnclient.height / 2)) - (tooltipclient.height / 2),
        props: ["right", "top"]
      }

      if (tooltipPostion == "left-t") {
        overlayCoordinates.bottom = bodyclient.height - btnclient.bottom;
        overlayCoordinates.props = ["right", "bottom"];
      } else if (tooltipPostion == "left-b") {
        overlayCoordinates.top = btnclient.top + this.offSetValue;
      }

      return overlayCoordinates;
    } else if (tooltipPostion.includes("top")) {

      let overlayCoordinates:any = {
        left: (btnclient.right - (btnclient.width / 2)) - (tooltipclient.width / 2),
        bottom: (bodyclient.height - btnclient.top) + this.offSetValue,
        props: ["left", "bottom"]
      }

      if (tooltipPostion == "top-l") {
        overlayCoordinates.right = (bodyclient.width - btnclient.right) + this.offSetValue;
        overlayCoordinates.props = ["right", "bottom"]
      } else if (tooltipPostion == "top-r") {
        overlayCoordinates.left = btnclient.left + this.offSetValue;
      }

      return overlayCoordinates;
    } else if (tooltipPostion.includes("bottom")) {

      let overlayCoordinates:any = {
        left: (btnclient.right - (btnclient.width / 2)) - (tooltipclient.width / 2),
        top: btnclient.bottom + this.offSetValue,
        props: ["left", "top"]
      }

      if (tooltipPostion == "bottom-l") {
        overlayCoordinates.right = (bodyclient.width - btnclient.right) + this.offSetValue;
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

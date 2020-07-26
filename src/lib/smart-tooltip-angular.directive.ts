import { OnInit, Directive, HostBinding, HostListener, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Directive({
  selector: '[smart-tooltip-container]',

})
export class SmartTooltipAngularDirective implements OnInit {

  classes = ["right", "right-t", "right-b", "left", "left-t", "left-b", "bottom", "bottom-r", "bottom-l", "top", "top-r", "top-l"];

  

  @HostBinding("style.position") position;

  @HostListener("mouseenter") mouseEnter() {
    this.myfunc(this.elementRef);
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



  myfunc(elementRef:ElementRef) {
    let root = this;

    let btn = elementRef.nativeElement;
    if (!btn) return;
    var body = document.querySelector("body");

    let tooltip = btn.querySelector(".smart-tooltip");

    if (!tooltip) return;



    var tooltipclient = tooltip.getBoundingClientRect();
    var btnclient = btn.getBoundingClientRect();
    var bodyclient = body.getClientRects()[0];

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


    if (spaces.getSpace("left")) {

      let topHalf = (btnclient.bottom - (btnclient.height / 2));
      let bottomHalf = bodyclient.height - topHalf;
      let halfTooltip = (tooltipclient.height / 2);

      let isContainerBigger = btnclient.height >= tooltipclient.height;

      if (isContainerBigger || ((topHalf > halfTooltip) && (bottomHalf > halfTooltip))) {
        this.removeTooltipClass(tooltip);
        tooltip.classList.add('left');

      } else if (topHalf < halfTooltip) {
        this.removeTooltipClass(tooltip);
        tooltip.classList.add('left-b');

      } else if (bottomHalf < halfTooltip) {
        this.removeTooltipClass(tooltip);
        tooltip.classList.add('left-t');

      }

    } else if (spaces.getSpace("right")) {

      let topHalf = (btnclient.bottom - (btnclient.height / 2));
      let bottomHalf = bodyclient.height - topHalf;
      let halfTooltip = (tooltipclient.height / 2);

      let isContainerBigger = btnclient.height >= tooltipclient.height;

      if (isContainerBigger || ((topHalf > halfTooltip) && (bottomHalf > halfTooltip))) {
        this.removeTooltipClass(tooltip);
        tooltip.classList.add('right');
      } else if (topHalf < halfTooltip) {
        this.removeTooltipClass(tooltip);
        tooltip.classList.add('right-b');


      } else if (bottomHalf < halfTooltip) {
        this.removeTooltipClass(tooltip);
        tooltip.classList.add('right-t');


      }

    } else if (spaces.getSpace("top")) {

      let leftHalf = (btnclient.right - (btnclient.width / 2));
      let rightHalf = bodyclient.width - leftHalf;
      let halfTooltip = (tooltipclient.width / 2);

      let isContainerBigger = btnclient.width >= tooltipclient.width;

      if (isContainerBigger || ((leftHalf > halfTooltip) && (rightHalf > halfTooltip))) {
        this.removeTooltipClass(tooltip);
        tooltip.classList.add('top');

      } else if (leftHalf < halfTooltip) {
        this.removeTooltipClass(tooltip);
        tooltip.classList.add('top-r');

      } else if (rightHalf < halfTooltip) {
        this.removeTooltipClass(tooltip);
        tooltip.classList.add('top-l');
      }

    } else if (spaces.getSpace("bottom")) {

      let leftHalf = (btnclient.right - (btnclient.width / 2));
      let rightHalf = bodyclient.width - leftHalf;
      let halfTooltip = (tooltipclient.width / 2);

      let isContainerBigger = btnclient.width >= tooltipclient.width;

      if (isContainerBigger || ((leftHalf > halfTooltip) && (rightHalf > halfTooltip))) {
        this.removeTooltipClass(tooltip);
        tooltip.classList.add('bottom');

      } else if (leftHalf < halfTooltip) {
        this.removeTooltipClass(tooltip);
        tooltip.classList.add('bottom-r');

      } else if (rightHalf < halfTooltip) {
        this.removeTooltipClass(tooltip);
        tooltip.classList.add('bottom-l');
      }

      // debugger;
      // if (btnclient.left > (bodyclient.width - btnclient.right) || btnclient.left > btnclient.bottom || btnclient.left > btnclient.top) {
      //     this.removeTooltipClass(tooltip);
      //     tooltip.classList.add('bottom');
      // } else {
      //     this.removeTooltipClass(tooltip);
      //     tooltip.classList.add('bottom');
      // }
    } else {
      this.removeTooltipClass(tooltip);
      tooltip.classList.add('bottom');
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

}

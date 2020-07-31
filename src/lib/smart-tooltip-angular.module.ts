import { NgModule, OnInit } from '@angular/core';
import { SmartTooltipAngularDirective } from './smart-tooltip-angular.directive';



@NgModule({
  declarations: [SmartTooltipAngularDirective],
  imports: [
  ],
  exports: [SmartTooltipAngularDirective]
})
export class SmartTooltipAngularModule {

  constructor() {
    
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
              // transition: all .2s;
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

        .smart-tooltip-container .smart-tooltip.overlayed{
            
              transform: none;
              top:initial;
              right:initial;
              bottom:initial;
              left:initial;
        }
    `;
    head.appendChild(cs);

  }
}

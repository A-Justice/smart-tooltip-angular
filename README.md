# What's this
A package that allows you tooltip to show intelligently base on where it is

# Installation

`npm i smart-tooltip-angular --save`

# Getting Started

*Import library to module*
```
import { SmartTooltipAngularModule } from 'smart-tooltip-angular';

@NgModule({
  declarations: [
  ],
  imports: [
    SmartTooltipAngularModule
  ],
  providers: [],
  bootstrap: []
})
```

Html (index.html)

```
    <div smart-tooltip-container> 
                Button 
        <span class="smart-tooltip">Welcome</span>  
    </div>

```


Run your project

```
    ng serve 
```




## options
* Forcing tooltip to stay at particatular position 
_Apply class *stay-left | stay-right | stay-bottom | stay-top*_
eg:
```
    <div smart-tooltip-container> 
                Button 
        <span class="smart-tooltip stay-right">Welcome</span>  
    </div>
```

* Have you run into the trouble of having your tooltip cut because of a parent container overflowed hidden? Dont worry, just add the class _overlay_ eg:


```
    <div smart-tooltip-container > 
                Button 
        <span class="smart-tooltip stay-right overlay">Welcome</span>  
    </div>
```
*NB: TO PREVENT TROUBLES WITH OVERLAY .. PLEASE SPECIFY DEFINITE WITDH FOR TOOLTIP*

* Do you want the tooltip stick around for a while...?
    Add the stick class with the time in milliseconds (stick-100) you want it to stay.
    ```
     <button smart-tooltip-container>
            Button 
            <span class="smart-tooltip overlay stick-200">Tooltip</span>
        </button>
    ```
    Or may be you want to tooltip to stick around until you click anywhere else .. in that case just add the stick class eg:
    ```
     <button smart-tooltip-container>
            Button 
            <span class="smart-tooltip overlay stick">Tooltip</span>
        </button>
    ```

<!-- smart-tooltip supports 2 options all of which are optional
* *type * - _hard | soft_ (Defaults to soft) -->
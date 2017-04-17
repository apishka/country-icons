## How use it

An example how use it [here](https://apishka.github.io/country-icons/#!/).

## Installation

       npm i country-icons -D // priority
       bower install apishka/country-icons -D
       
       
       // in a generally less file
       @import "node_modules/country-icons/index.less";
       // or if use scss
       @import "node_modules/country-icons/Markup/dist/css/country-icons.scss";
       // or css
       @import "node_modules/country-icons/Markup/dist/css/country-icons.css";
       
       // in grunt
       copy: {
            flags  : {
               expand : true,
               flatten: true,
               src    : [
                   'node_modules/country-icons/Markup/blocks/lng/i/*'
               ],
               dest   : markupMain('dist/images/')
           }
       }


## Example

        <span class="lng lng-ar"></span> 
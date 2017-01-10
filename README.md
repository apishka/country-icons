## How use it

An example how use it [here](https://apishka.github.io/language-icons/#!/).

## Installation

       npm i country-icons -D // priority
       bower install apishka/country-icons -D
       
       
       // in a generally less file
       @import "bower_modules/language-icons/index.less";
       // or if use scss or css
       @import inline("bower_modules/language-icons/Markup/dist/css/language-icons.css");
       
       // in grunt
       copy: {
            flags  : {
               expand : true,
               flatten: true,
               src    : [
                   'bower_modules/language-icons/Markup/blocks/lng/i/*'
               ],
               dest   : markupMain('dist/images/')
           }
       }


## Example

        <span class="lng lng-ar"></span> 
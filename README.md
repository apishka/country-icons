## How use it

An example how use it [here](https://apishka.github.io/language-icons/#!/).

## Installation

       bower install apishka/language-icons
       npm i language-icons
       
       // in a generally less file
       @import "bower_modules/language-icons/index.less";
       
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
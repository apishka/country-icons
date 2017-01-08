import angular from 'angular';
import uiRouter from 'angular-ui-router';

import Clipboard from 'clipboard/dist/clipboard.min'

import 'bootstrap/dist/css/bootstrap.css';
import 'global/style.less';
import LangList from 'list';
import LangPage from 'lang';

const app = angular.module('app', [uiRouter]);

app
    .controller('langList', ['$scope', LangList])
    .controller('lang', ['$scope', '$stateParams', LangPage])
    .config(
        [
            '$stateProvider',
            '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider)
            {
                $stateProvider
                    .state(
                        'list', {
                            url        : '/',
                            templateUrl: "src/modules/list/list.html",
                            controller : ['$scope', LangList]
                        }
                    )
                    .state(
                        'lang', {
                            url        : '/:lang',
                            templateUrl: "src/modules/lang/lang.html",
                            controller : ['$scope', '$stateParams', LangPage]
                        }
                    )
                ;
                $urlRouterProvider.otherwise('/');
            }
        ]
    );

let clip = new Clipboard('.Clip');

clip.on(
    'success', function (e)
    {
        e.trigger.textContent = 'Copied!';
        e.clearSelection();

        setTimeout(
            function ()
            {
                e.trigger.textContent = 'Copy to clipboard';
            },
            1000
        )
    }
);
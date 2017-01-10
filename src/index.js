import angular from 'angular';
import uiRouter from 'angular-ui-router';

import Clipboard from 'clipboard/dist/clipboard.min'

import 'bootstrap/dist/css/bootstrap.css';
import 'global/style.less';
import LangList from 'list';
import LangPage from 'lang';
import InstallPage from 'install';

const app = angular.module('app', [uiRouter]);

app
    .controller('langList', ['$scope', LangList])
    .controller('installPage', ['$scope', InstallPage])
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
                        'install', {
                            url        : '/install',
                            templateUrl: "src/modules/install/install.html",
                            controller : ['$scope', InstallPage]
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
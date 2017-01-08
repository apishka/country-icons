import angular from 'angular';
import 'bootstrap/dist/css/bootstrap.css';
import 'page/style.less';
//import List from 'list';
import languages from 'languages.json';
console.log(languages);

const app = angular.module('app', []);

app.controller(
    'langList', function ($scope)
    {
        $scope.list = languages.list;
    }
);

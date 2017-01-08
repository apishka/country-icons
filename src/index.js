import angular from 'angular';
import 'bootstrap/dist/css/bootstrap.css';
import 'page/style.less';
import LangList from 'list';

const app = angular.module('app', []);

app.controller('langList', ['$scope', LangList]);
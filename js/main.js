/**
 * Created by tranchitam on 3/23/16.
 */

"use strict";

var app = angular.module('snowball', ['ui.router', 'ngStorage']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'partials/home.html',
        controller: 'homeController'
    }).state('detail', {
        url: '/detail/:type',
        templateUrl: 'partials/detail.html',
        controller: 'detailController'
    });
}]);
/**
 * Created by tranchitam on 3/25/16.
 */

app.directive('hashtagDirective', [function () {
    return {
        restrict: 'ACE',
        scope: {
            hashtags: '=hashtags'
        },
        templateUrl: '../partials/templates/hashtags.html',
        link: function (scope, element, attrs) {
            
        }
    }
}]);
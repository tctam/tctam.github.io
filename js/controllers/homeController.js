/**
 * Created by tranchitam on 3/23/16.
 */

app.controller('homeController', ['$scope', '$state', '$stateParams', function ($scope, $state, $stateParams) {
    $scope.getPublicDetail = function () {
        $state.go('detail', {type: 'public'})
    }

    $scope.getDummyDetail = function () {
        $state.go('detail', {type: 'dummy'});
    }
}]);
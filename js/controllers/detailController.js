/**
 * Created by tranchitam on 3/23/16.
 */

app.controller('detailController', ['$scope', '$stateParams', 'snowballService', function ($scope, $stateParams, snowballService) {
    if ($stateParams.type) {
        switch ($stateParams.type) {
            case 'public':
                snowballService.getPublicDetail().then(function (data) {
                    $scope.detail = data;
                    $scope.imageUrl = snowballService.getImageUrl($scope.detail.snowball.user.id);
                });
                break;
            case 'dummy':
                snowballService.getDummyDetail().then(function (data) {
                    $scope.detail = data;
                    $scope.imageUrl = snowballService.getImageUrl($scope.detail.snowball.user.id);
                });
                break;
        }
    } else {
        snowballService.getDummyDetail().then(function (data) {
            $scope.detail = data;
            $scope.imageUrl = snowballService.getImageUrl($scope.detail.snowball.user.id);
        });
    }

    $scope.openVideo = function ($item, $detail) {
        $scope.$broadcast('openVideo', $item, $detail);
    }
}]);
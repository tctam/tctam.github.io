/**
 * Created by tranchitam on 3/23/16.
 */

app.controller('detailController', ['$scope', '$stateParams', 'snowballService', function ($scope, $stateParams, snowballService) {
    $scope.setData = function (data, index) {
        $scope.detail = data;
        $scope.imageUrl = snowballService.getImageUrl($scope.detail.snowball.user.id);
        if ($scope.detail && $scope.detail.snowball.items && $scope.detail.snowball.items.length > 0) {
            index = index || 0;
            $scope.currentItem = $scope.detail.snowball.items[index];
        }
    }

    if ($stateParams.type) {
        switch ($stateParams.type) {
            case 'public':
                snowballService.getPublicDetail().then(function (data) {
                    $scope.setData(data);
                });
                break;
            case 'dummy':
                snowballService.getDummyDetail().then(function (data) {
                    $scope.setData(data);
                });
                break;
        }
    } else {
        snowballService.getDummyDetail().then(function (data) {
            $scope.setData(data);
        });
    }

    $scope.openVideo = function ($item, $detail) {
        $scope.$broadcast('openVideo', $item, $detail);
    }

    $scope.changeData = function ($data, $index) {
        $scope.setData($data, $index);
    }
}]);
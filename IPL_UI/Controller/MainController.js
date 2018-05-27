app.controller("MainController", function ($scope, $http, $location, $cookies, getEnvVariables) {
    $scope.userId;
    $scope.backgroundFlag = true;
    $scope.password;
    $scope.alert = false;
     $scope.alertClose = function(){
        $scope.alert = false;
    }
    var url = getEnvVariables.getURL();

    $scope.onSubmit = function () {
        $http({
            method: "POST",
            url: url+"login",
            data:
                {
                    "userName": $scope.userId,
                    "password": $scope.password
                }
        }
        ).then(function successCallback(response) {
            $cookies.put('sessionId', response.data.sessionId);
            $cookies.put('userName', $scope.userId);
            $location.path("/displayMatchList");
        }, function errorCallback(response) {
            // $scope.alert = true;
            // $scope.message = response.data.exception;
            // if(response.data.message === 'Session invalid/inactive') {
                $location.path("/");
            // }
        });
    }
});
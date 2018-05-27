app.controller("rulesController",
    ['$scope', '$http', '$location', '$cookies', 'getEnvVariables',
        function ($scope, $http, $location, $cookies, getEnvVariables) {
            // init function to fetch match list
            var url = getEnvVariables.getURL();

            $scope.logout = function () {
                $http({
                    method: "POST",
                    url: url + "logout",
                    data:
                        {
                            "sessionId": $cookies.get("sessionId") || '',
                            "empId": $cookies.get("userName") || ''
                        }
                }
                ).then(function successCallback(response) {
                    $cookies.remove('userName');
                    $cookies.remove('sessionId');
                    $location.path("/");
                }, function errorCallback(response) {
                    // if (response.data.message === 'Session invalid/inactive') {
                        $location.path("/");
                    // } else {
                    //     $location.path("/displayMatchList");
                    // }
                });
            };
            $scope.reports = function () {
                $location.path("/reports");
            };
            $scope.userReport = function () {
                $location.path("/userReport");
            };
            $scope.goToHome = function () {
                $location.path("/displayMatchList");
            };
            $scope.goToRulesPage = function () {
                $location.path("/rules");
            };
        }]);
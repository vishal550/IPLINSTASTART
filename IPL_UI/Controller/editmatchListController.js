app.controller("editMatchListController",
    ['$scope', '$http', '$location', '$cookies', 'getEnvVariables',
        function ($scope, $http, $location, $cookies, getEnvVariables) {
            // init function to fetch match list
            var url = getEnvVariables.getURL();
            function init() {
                $http({
                    method: "POST",
                    url: url + "getMatchShedule",
                    data:
                        {
                            "sessionId": $cookies.get("sessionId") || '',
                            "empId": $cookies.get("userName") || ''
                        }
                }
                ).then(function successCallback(response) {
                    var matchResult = response.data.data;
					$scope.matchList = matchResult.upcoming;
                    // update each object in match-list array for UI
                    for (var key in $scope.matchList) {
                        var winnerArray = [
                            { "team": null },
                            { "team": $scope.matchList[key].team1 },
                            { "team": $scope.matchList[key].team2 }
                        ];
                        var selectedWinner;
                        if ($scope.matchList[key].winner === $scope.matchList[key].team1) {
                            selectedWinner = { "team": $scope.matchList[key].team1 };
                        } else {
                            selectedWinner = { "team": $scope.matchList[key].team2 };
                        }
                        var voteAllowedArray = [
                            { "isAllowed": true },
                            { "isAllowed": false }
                        ];
                        var isAllowedValue;
                        if ($scope.matchList[key].is_allowed === true) {
                            isAllowedValue = { "isAllowed": true };
                        } else {
                            isAllowedValue = { "isAllowed": false };
                        }
                        $scope.matchList[key].winnerArray = winnerArray;
                        $scope.matchList[key].selectedWinner = selectedWinner;
                        $scope.matchList[key].voteAllowedArray = voteAllowedArray;
                        $scope.matchList[key].isAllowedValue = isAllowedValue;
                    }
                    // render the table using DataTable llibrary
                    angular.element(document).ready(function () {
                        $('#match-list').DataTable();
                    });

                }, function errorCallback(response) {
                    // $scope.alert = true;
                    // $scope.message = response.data.message;
                    // if (response.data.message === 'Session invalid/inactive') {
                        $location.path("/");
                    // }
                });
            }

            init();

            // function to update the match details
            $scope.updateMatchDetails = function (id, isAllowedValue, selectedWinner) {
                var isAllowedVal;
                if (selectedWinner.team == null) {
                    isAllowedVal = true;
                } else {
                    isAllowedVal = isAllowedValue.isAllowed;
                }

                $http({
                    method: "POST",
                    url: url + "manage",
                    data:
                        {
                            "sessionId": $cookies.get("sessionId") || '',
                            "empId": $cookies.get("userName") || '',
                            "id": id,
                            "winner": selectedWinner.team,
                            "isAllowed": isAllowedVal
                        }
                }
                ).then(function successCallback(response) {
                    $location.path("/editMatchList");
                }, function errorCallback(response) {
                    // if (response.data.message === 'Session invalid/inactive') {
                        $location.path("/");
                    // }
                });
            };

            $scope.logout = function () {
                $http({
                    method: "POST",
                    url: url + "logout",
                    data:
                        {
                            "sessionId": $cookies.get("sessionId")  || '',
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
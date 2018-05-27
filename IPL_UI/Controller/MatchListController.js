app.controller("MatchListController", ['$scope', '$http', '$location', '$cookies', 'getMatchReport', 'getEnvVariables', '$uibModal',
    function ($scope, $http, $location, $cookies, getMatchReport, getEnvVariables, $uibModal) {
        $uName = $cookies.get("userName");
        var url = getEnvVariables.getURL();
        $scope.single = false;
        $scope.double = true;
        $scope.alert = false;
          $scope.imagesArray = ['img1', 'img2', 'img3', 'img4', 'img5', 'img6', 'img7'];
        $scope.count = -1;
        $scope.currentImg = 'img1';
        $scope.teamArray = [{ "MI": "blue" }, { "KXP": "pink" }, { "SRH": "orange" }, { "RCB": "red" }, { "KKR": "purple" }, { "DD": "red" }, { "RR": "blue" }, { "CSK": "ocre" }]
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
                $scope.matchResult = response.data.data;

                // render the table using DataTable library
                angular.element(document).ready(function () {
                    $('#voting-match-list').DataTable();
                });

            }, function errorCallback(response) {
                // $scope.alert = true;
                // $scope.message = response.message;
                // if (response.message === 'Session invalid/inactive') {
                    $location.path("/");
                // }
            });
        }

        init();


        setInterval(myTimerImg, 3000);
         function myTimerImg() {
        if ($scope.count == 6) {
            $scope.count = -1;
        }
        $scope.count++;
        $scope.currentImg = $scope.imagesArray[$scope.count];
        $scope.$evalAsync();
    }

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
                $location.path("/");
            }, function errorCallback(response) {
                // if (response.data.message === 'Session invalid/inactive') {
                    $location.path("/");
                // } else {
                //     $location.path("/displayMatchList");
                // }
            });
        };

        $scope.alertClose = function () {
            $scope.alert = false;
        };

        $scope.reports = function () {
            $location.path("/reports");
        };

        $scope.userReport = function () {
            $location.path("/userReport");
        };

        $scope.goTLiveScore = function() {
			$scope.currentLiveMatchArray = $scope.matchList.filter(function(obj){
				return obj.is_allowed;
						});
			console.log($scope.currentLiveMatchArray);
			$http({
                method: "POST",
                url: url + "getLiveScore",
                data:
                    {
                        "sessionId": $cookies.get("sessionId") || '',
                        "empId": $cookies.get("userName") || '',
						"matchId": 9                
					}		
            }
            ).then(function successCallback(response) {
				console.log(response);
                $scope.score = response.data.data.score;
				alert($scope.score);
            }, function errorCallback(response) {
                // $scope.alert = true;
                // $scope.message = response.message;
                // if (response.message === 'Session invalid/inactive') {
                    $location.path("/displayMatchList");
                // }
            });
		}
		
        $scope.goToRulesPage = function () {
            $location.path("/rules");
        };
		
        $scope.openModal = function (matchId, team1, team2) {
            $scope.currentMatchId = matchId;
            $scope.currentMatchTeam1 = team1;
            $scope.currentMatchTeam2 = team2;

            $uibModal.open({
                templateUrl: 'view/userVoteModal.html',
                controller: ['$scope', '$uibModalInstance', '$cookies', 'getTeam1', 'getTeam2', 'getURL', 'getCurrentMatchId', 'initFunction',
                    function ($scope, $uibModalInstance, $cookies, getTeam1, getTeam2, getURL, getCurrentMatchId, initFunction) {
                        $scope.currentMatchId = getCurrentMatchId;
                        $scope.currentMatchTeam1 = getTeam1;
                        $scope.currentMatchTeam2 = getTeam2;
						
						$scope.doubleArray = [44,45,46,47];
                        var url = getURL;
                        $scope.cancel = function () {
                            $uibModalInstance.dismiss('cancel');
                        };

                        $scope.saveVote = function (vote, voteType) {
                            $http({
                                method: "POST",
                                url: url + "postVote",
                                data:
                                    {
                                        "sessionId": $cookies.get("sessionId") || '',
                                        "empId": $cookies.get("userName") || '',
                                        "vote": $scope.selectTeam,
                                        "voteType": ($scope.doubleArray.indexOf($scope.currentMatchId) > -1) ? true : $scope.voteType,
                                        "matchId": $scope.currentMatchId
                                    }
                            }
                            ).then(function successCallback(response) {
                                $scope.alert = true;
                                $scope.message = response.data.message;
                                $scope.selectTeam = null;
                                $scope.voteType = null;

                                //close modal after few millisec
                                setTimeout(function () {
                                    $scope.cancel();
                                    initFunction();
                                }, 500);
                            }, function errorCallback(response) {
                                $scope.alert = true;
                                $scope.selectTeam = null;
                                $scope.voteType = null;
                                $scope.message = response.data.message;

                                //close modal after few millisec
                                setTimeout(function () { $scope.cancel(); }, 500);

                                // if (response.data.message === 'Session invalid/inactive') {
                                    $location.path("/");
                                // }
                            });
                        };
                    }],
                resolve: {
                    getTeam1: function () {
                        return $scope.currentMatchTeam1;
                    },
                    getTeam2: function () {
                        return $scope.currentMatchTeam2;
                    },
                    getURL: function () {
                        return url;
                    },
                    getCurrentMatchId: function () {
                        return $scope.currentMatchId;
                    },
                    initFunction: function () {
                        return init;
                    }
                }
            });
        };

        $scope.openModalForReport = function (matchId) {
            $scope.reportMatchId = matchId;
            getMatchReport.getMatchReports($cookies.get("sessionId"), $cookies.get("userName"), $scope.reportMatchId).then((res) => {
                $scope.myChartObject = {};
                $scope.myChartObject.type = "LineChart";
                $scope.myChartObject.data = {
                    "cols": [
                        { id: "t", label: "cdsfdffffffd", type: "string" },
                        { id: "s", label: "Dooba", type: "number" }
                    ], "rows": res.data.lineChart
                };
                $scope.myChartObject.options = {
                    series: {
                        0: {
                            color: 'green',
                            lineWidth: 2
                        }
                    },
                    hAxis: {
                        title: 'Names',
                        slantedText:true, 
						slantedTextAngle:90  
                    },
                    vAxis: {
                        title: 'Points',
                        // gridlines: {
                        //     color: '#eee'
                        // }
                    },
                    'chartArea': { 'width': '80%', 'height': '70%' },
                    pointSize: 12,
                    pointShape: 'round',
					
                };
				

                $uibModal.open({
                    templateUrl: 'view/matchReportModal.html',
                    controller: ['$scope', '$uibModalInstance', 'getReportChartObject',
                        function ($scope, $uibModalInstance, getReportChartObject) {
                            $scope.myChartObject = getReportChartObject;
                            $scope.closeModalForReport = function () {
                                $uibModalInstance.dismiss('cancel');
                            };
                        }],
                    resolve: {
                        getReportChartObject: function () {
                            return $scope.myChartObject;
                        },
                        initFunction: function () {
                            return init;
                        }
                    }
                });
            },
                (error) => {
                    if ("message" in error.data) {
                        if (error.data.message === "Session invalid/inactive") {
                            $location.path("/");
                        }
                    }
                });
        };

    }]);
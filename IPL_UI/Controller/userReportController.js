app.controller("userReportController",
    ['$scope', '$http', '$location', '$cookies', 'getUserList', 'getEnvVariables', '$uibModal',
        function ($scope, $http, $location, $cookies, getUserList, getEnvVariables, $uibModal) {
            // demo data for line chart
            var url = getEnvVariables.getURL();;
            $scope.logout = function() {
                $http({
                    method: "POST",
                    url: url+"logout",
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
            }
            $scope.reports = function () {
                $location.path("/reports");
            }
            $scope.userReport = function() {
                $location.path("/userReport");
            }
            $scope.goToHome = function() {
                $location.path("/displayMatchList");
            }
            $scope.goToRulesPage = function () {
                $location.path("/rules");
            };

            getUserList.getUserReports($cookies.get("sessionId"), $cookies.get("userName")).then((res) => {
                $scope.userList = res.data;
            },
            (error) => {
                if ("message" in error.data) {
                    if (error.data.message === "Session invalid/inactive") {
                        $location.path("/");
                    }
                }
            });

            $scope.getUserReport = function (userEmpId) {
                $http({
                    method: "POST",
                    url: url+"getUserReport",
                    data:
                        {
                            "sessionId": $cookies.get("sessionId") || '',
                            "empId": $cookies.get("userName") || '',
                            "empIdReport": userEmpId
                        }
                }
                ).then(function successCallback(response) {
                    // create and render google chart
                    $scope.reportChartObject = {};
                    $scope.reportChartObject.type = "ColumnChart";
                    $scope.reportChartObject.data = {
                        /*"cols": [{
                            "label": "Match #",
                            "type": "string"
                        },
                        {
                            "label": "Amount",
                            "type": "number"
                        },
                        {
                            "type": 'string',
                            "role": 'tooltip'
                        }],*/
						"cols": [
							{ id: "t", label: "cdsfdffffffd", type: "string" },
							{ id: "s", label: "Dooba", type: "number" },
							{type: 'string', role: 'tooltip'}
						],
                        "rows": response.data.barChart
                    };
                    $scope.reportChartObject.options = {

                        series: {
                            0: {
                                color: 'blue',
                                lineWidth: 2
                            }
                        },
                        hAxis: {
                            title: 'Match ',
                            gridlines: {
                                color: '#F6F6F6'
                            },
							'textStyle' : {
								fontSize: 12
							},
							slantedText:true, 
							slantedTextAngle:90 
                        },
                        vAxis: {
                            title: 'Points',
                            gridlines: {
                                color: '#eee'
                            }
                        },
                        'chartArea': {'width': '80%', 'height': '70%'},
                        pointSize: 10,
                        pointShape: 'round'
                    };

                    $uibModal.open({
                        templateUrl: 'view/userReportModal.html',
                        controller: ['$scope', '$uibModalInstance', 'getReportChartObject', 'getUserName',
                            function ($scope, $uibModalInstance, getReportChartObject, getUserName) {
                                $scope.reportChartObject = getReportChartObject;
                                $scope.userName = getUserName;
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };
                            }],
                        resolve: {
                            getReportChartObject: function () {
                                return $scope.reportChartObject;
                            },
                            getUserName: function () {
                                return userEmpId;
                            }
                        }
                    });



                }, function errorCallback(response) {
                    // if(response.data.message === 'Session invalid/inactive') {
                        $location.path("/");
                    // }
                });
            };
        }]);
app.controller("reportController", function ($scope, $http, $cookies, $location, getReportsData, getEnvVariables) {
    var url = getEnvVariables.getURL();

    $scope.logout = function () {
        $http({
            method: "POST",
            url: url + "logout",
            data:
                {
                    "sessionId": $cookies.get("sessionId"),
                    "empId": $cookies.get("userName")
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
    }
    $scope.reports = function () {
        $location.path("/reports");
    }
    $scope.userReport = function () {
        $location.path("/userReport");
    }
    $scope.goToHome = function () {
        $location.path("/displayMatchList");
    }
    $scope.goToRulesPage = function () {
        $location.path("/rules");
    };

	getReportsData.getmatchPointData($cookies.get("sessionId"), $cookies.get("userName")).then((res) => {
        $scope.myMatchChartObject = {};
        $scope.myMatchChartObject.type = "ColumnChart";
        $scope.myMatchChartObject.data = {
            "cols": [
                { id: "t", label: "cdsfdffffffd", type: "string" },
                { id: "s", label: "Points", type: "number" },
				{ id: "to", label: "Points", type: "string", role: "tooltip" }
            ], "rows": res.data.barChart
        };
        $scope.myMatchChartObject.options = {
            'title': 'IPL me kaun kitna dooba',
            'hAxis' : { 
                'textStyle' : {
                    fontSize: 11
                },
                slantedText:true, 
                slantedTextAngle:90        
            },
			colors: ["#4682B4"],
			width: '100%',
			height: '100%'
        };
    },
        (error) => {
            if ("message" in error.data) {
                if (error.data.message === "Session invalid/inactive") {
                    $location.path("/");
                }
            }
        });

    getReportsData.getReports($cookies.get("sessionId"), $cookies.get("userName")).then((res) => {
        $scope.myChartObject = {};
        $scope.myChartObject.type = "ColumnChart";
        $scope.myChartObject.data = {
            "cols": [
                { id: "t", label: "cdsfdffffffd", type: "string" },
                { id: "s", label: "Dooba", type: "number" }
            ], "rows": res.data.barChart
        };
		$scope.totalAmt = res.data.totalAmount;
        $scope.myChartObject.options = {
            'title': 'IPL me kaun kitna dooba',
            'hAxis' : { 
                'textStyle' : {
                    fontSize: 12
                },
                slantedText:true, 
                slantedTextAngle:90        
            },
			colors: ["#008080"],
			width: '100%',
			height: '100%'
        };
        $scope.myPieChartObject = {};
        $scope.myPieChartObject.type = "PieChart";
        $scope.myPieChartObject.data = {
            "cols": [
                { id: "t", label: "cdsfdffffffd", type: "string" },
                { id: "s", label: "Dooba", type: "number" }
            ], "rows": res.data.pieChart
        };
        $scope.myPieChartObject.options = {
            'title': 'IPL me kaun kitna dooba'
        };
    },
        (error) => {
            if ("message" in error.data) {
                if (error.data.message === "Session invalid/inactive") {
                    $location.path("/");
                }
            }
        });
	getReportsData.getWinLeaderboard($cookies.get("sessionId"), $cookies.get("userName")).then((res) => {
        $scope.myTableObject = {};
        $scope.myTableObject.type = "Table";
        $scope.myTableObject.data = {
            "cols": [
                { id: "t", label: "Emp Id", type: "string" },
				{ id: "s", label: "Name", type: "string" },
                { id: "s", label: "Wins", type: "number" }
            ], "rows": res.data
        };
		var cssClassNames = {
			headerRow: 'bigAndBoldClass',
			hoverTableRow: 'highlightClass',
			tableRow: 'tableRow'
		};
		$scope.myTableObject.options = {
			'title': 'Baazigar',
			'cssClassNames': cssClassNames,
			'page': 'enable',
			'pageSize': 8,
			alternatingRowStyle: false,
			width: '100%'
		}
    },
        (error) => {
            if ("message" in error.data) {
                if (error.data.message === "Session invalid/inactive") {
                    $location.path("/");
                }
            }
        });	
		
		getReportsData.getDoubleWinLeaderboard($cookies.get("sessionId"), $cookies.get("userName")).then((res) => {
        $scope.myDoubleTableObject = {};
        $scope.myDoubleTableObject.type = "Table";
        $scope.myDoubleTableObject.data = {
            "cols": [
                { id: "t", label: "Emp Id", type: "string" },
				{ id: "s", label: "Name", type: "string" },
                { id: "s", label: "Wins", type: "number" }
            ], "rows": res.data
        };
		var cssClassNames = {
			headerRow: 'bigAndBoldClassDouble',
			hoverTableRow: 'highlightClassDouble',
			tableRow: 'tableRow'
		};
		$scope.myDoubleTableObject.options = {
			'title': 'Baazigar',
			'cssClassNames': cssClassNames,
			'page': 'enable',
			'pageSize': 8,
			alternatingRowStyle: false,
			width: '100%'
		}
    },
        (error) => {
            if ("message" in error.data) {
                if (error.data.message === "Session invalid/inactive") {
                    $location.path("/");
                }
            }
        });	
		
});
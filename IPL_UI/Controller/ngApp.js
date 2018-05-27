var app = angular.module("mainApp", ["ngRoute", "ngCookies", "googlechart", 'ui.bootstrap']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "view/login.html",
            controller: "MainController"
        })
        .when("/displayMatchList", {
            templateUrl: "view/matchList.html",
            controller: "MatchListController"
        })
        .when("/reports", {
            templateUrl: "view/reports.html",
            controller: "reportController"
        })
        .when("/matchReport", {
            templateUrl: "view/matchReport.html",
            controller: "matchReportController"
        })
        .when("/userReport", {
            templateUrl: "view/userReport.html",
            controller: "userReportController"
        })
        .when("/manage", {
            templateUrl: "view/manage.html",
            controller: "manageController"
        })
        .when("/editMatchList", {
            templateUrl: "view/editMatchList.html",
            controller: "editMatchListController"
        })
        .when("/rules", {
            templateUrl: "view/rules.html",
            controller: "rulesController"
        })
});

var url = 'http://35.173.230.229:3000/';
app.service('getReportsData', function ($http, $cookies) {
    this.getReports = function (sessionId, userName) {
        var data = {
            "sessionId": sessionId || '',
            "empId": userName || ''
        }
        return $http.post(url + "getReport", data);
    }
	
	this.getWinLeaderboard = function (sessionId, userName) {
        var data = {
            "sessionId": sessionId || '',
            "empId": userName || ''
        }
        return $http.post(url + "getWinLeaderboard", data);
    }
	
	this.getDoubleWinLeaderboard = function (sessionId, userName) {
        var data = {
            "sessionId": sessionId || '',
            "empId": userName || ''
        }
        return $http.post(url + "getDoubleWinLeaderboard", data);
    }
	
	this.getmatchPointData = function (sessionId, userName) {
        var data = {
            "sessionId": sessionId || '',
            "empId": userName || ''
        }
        return $http.post(url + "getMatchPointReport", data);
    }
});

app.service('getUserList', function ($http, $cookies) {
    this.getUserReports = function (sessionId, userName) {
        var data = {
            "sessionId": sessionId || '',
            "empId": userName || ''
        }
        return $http.post(url + "getUserList", data);
    }
});

app.service('getMatchReport', function ($http, $cookies) {
    this.getMatchReports = function (sessionId, userName, matchId) {
        var data = {
            "sessionId": sessionId || '',
            "empId": userName || '',
            "matchId": matchId
        }
        return $http.post(url + "getMatchReport", data);
    }
});

app.service('getEnvVariables', function () {
    this.getURL = function () {
        var url = 'http://35.173.230.229:3000/';
        // var url = 'http://172.27.176.18:3000/';
        return url;
    }
});
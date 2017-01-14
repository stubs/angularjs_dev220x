app.controller('labController', [
    '$scope', '$q', '$timeout', '$http', 'gitHub',
    function ($scope, $q, $timeout, $http, gitHub) {
        $scope.model={
            number:0,
            result: 'Ready',
        };
        console.log($scope.model);
        $scope.checkOddNumber = checkOddNumber;
        $scope.getRepos = getRepos;
        $scope.loadDetail = loadDetail;

        function checkOddNumber(input){
            $scope.model.result = "Working...";
            checkOddNumberHandler(input).then(function(result){
                $scope.model.result = "Success: " + result;
            }, function(result) {
                $scope.model.result = "Error: " + result;
            })
        }

        function checkOddNumberHandler(input){
            var defer = $q.defer();
            //$timeout(function(){
                if(isNumberOdd(input)){
                    defer.resolve('Yes, an odd number');
                } else {
                    defer.reject('Not an odd number');
                }
            //}, 1000);
            return defer.promise;
        }

        function isNumberOdd(input){
            return !isNaN(input) && input % 2 == 1;
        }

        function getRepos(input){
            gitHub.getAll({org: input}).$promise.then(function (result){
                $scope.model.repos = result;
                console.log($scope.model.repos);
            }, function (result){
                $scope.model.repos = "Error: " + result;
            })
        }

        function loadDetail(name, orgs) {
            gitHub.getDetail({id: name, org: orgs}).$promise.then(function(result){
                $scope.model.detail = result;
            }, function (result){
                $scope.model.detail = "Error: " + result;
            })
        }
    }
]);

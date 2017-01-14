app.controller('labController', [
    '$scope','registration',
    function ($scope, registration) {
        $scope.reset = reset;
        $scope.submit = submit;
        reset();

        function reset(){
            $scope.model = {};
        }

        function submit(model){
            registration.submit(model).$promise
                .then(function (response){
                    alert('Success');
                    $scope.model.token = response.token;
                }, function (response){
                    alert('Error');
                });
        }
    }
]);

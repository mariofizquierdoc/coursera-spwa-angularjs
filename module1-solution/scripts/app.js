(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
	$scope.items = "";
	$scope.message = "";
	$scope.status = "";

	$scope.checkItems = function() {
		if ($scope.items == "") {
			$scope.message = "Please enter data first";
			$scope.status = "empty";
		} else {
			$scope.status = "correct";
			var items = $scope.items.split(",");
			var totalCount = 0;

			for (var i = 0; i < items.length; i++) {
				var item = items[i].trim();
				if (item != "") {
					totalCount++;
				}
			}

			if (totalCount <= 3) {
				$scope.message = "Enjoy!";
			} else {
				$scope.message = "Too much!";
			}
		}
	}
}

})();

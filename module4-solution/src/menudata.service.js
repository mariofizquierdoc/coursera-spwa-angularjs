(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;

  service.getAllCategories = function() {
    return $http({

      method: "GET",
      url: (ApiBasePath + "/categories.json")

    }).then(function (response) {
      var categories = response.data;
      return categories;

    });
  };

  service.getItemsForCategory = function(categoryShortName) {
    return $http({

      method: "GET",
      url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)

    }).then(function (response) {
      
      var categoryItems = response.data.menu_items;
      return categoryItems;

    });
  };

}

})();

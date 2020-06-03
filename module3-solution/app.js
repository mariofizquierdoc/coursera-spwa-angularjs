(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {

  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    transclude: true
  };

  return ddo;

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowItDown = this;

  narrowItDown.found = [];
  narrowItDown.searchTerm = "";

  narrowItDown.getMatchedMenuItems = function () {
    if (narrowItDown.searchTerm.trim() == "")
    {
      // Display message: not found
    }
    else
    {
      console.log('hi');
      narrowItDown.found = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);
      if (narrowItDown.found.length == 0)
      {
        // Display message: not found (again)
      }
    }
  };

  narrowItDown.removeItem = function (itemIndex) {
    narrowItDown.found.splice(itemIndex, 1);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {

  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {

    return ($http({

      method: "GET",
      url: (ApiBasePath + "/menu_items.json")

    }).then(function (response) {
      
      var items = response.data;
      var foundItems = [];
      
      for (var i = 0; i < items.length; i++) {
      
        var item = items[i];
      
        if (item.description.search(searchTerm) == -1) {
          foundItems.push(item);
        }
      
      }

      return foundItems;

    }));

  };

}


})();

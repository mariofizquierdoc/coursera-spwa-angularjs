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
      onRemove: '&',
      notFoundMessage: '<',
    },
    controller: NarrowItDownDirectiveController,
    controllerAs: 'narrowItDown',
    bindToController: true,
    transclude: true
  };

  return ddo;

}

function NarrowItDownDirectiveController() {
  var narrowItDown = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowItDown = this;

  narrowItDown.found = [];
  narrowItDown.searchTerm = "";
  narrowItDown.notFoundMessage = "";

  narrowItDown.getMatchedMenuItems = function () {
    if (narrowItDown.searchTerm.trim() == "")
    {
      narrowItDown.notFoundMessage = "Not found";
    }
    else
    {
      var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);

      promise.then(function (response) {
        narrowItDown.found = response;
      }).catch(function (error) {
        console.log("Something went terribly wrong.");
      });
      if (narrowItDown.found.length == 0)
      {
        narrowItDown.notFoundMessage = "Not found";
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

    return $http({

      method: "GET",
      url: (ApiBasePath + "/menu_items.json")

    }).then(function (response) {
      
      var items = response.data.menu_items;
      var foundItems = [];
      
      for (var i = 0; i < items.length; i++) {
      
        var item = items[i];
      
        if (item.description.search(searchTerm) != -1) {
          foundItems.push(item);
        }
      
      }

      return foundItems;

    });

  };

}


})();

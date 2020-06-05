(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['$stateParams', 'MenuDataService', 'categories'];
function ItemsController($stateParams, MenuDataService, categories) {
  var itco = this;
  var category = categories[$stateParams.categoryId];
  var promise = MenuDataService.getItemsForCategory(category.short_name);
  promise.then(function (menuItems) {
  	itco.category = category;
  	itco.items = menuItems;
  }).catch(function (error) {
    console.log("Something went terribly wrong.");
  });
}

})();

(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['$stateParams', 'categories', 'items'];
function ItemsController($stateParams, categories, items) {
  var itco = this;
  console.log(categories);
  var category = categories[$stateParams.categoryId];
  itco.category = category;
  itco.items = items;
}

})();

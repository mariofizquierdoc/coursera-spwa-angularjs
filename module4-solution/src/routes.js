(function () {
  'use strict';
  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/',
      template: ''
    })
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/templates/main-categories.template.html',
      controller: 'CategoriesController as catco',
      resolve: {
        categories: [
          'MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }
        ]
      }
    })
    .state('categories.items', {
      url: '/items/{categoryId}',
      templateUrl: 'src/templates/main-items.template.html',
      controller: "ItemsController as itco",
      params: { categoryId: null },
      resolve: {
        items: [
          '$stateParams', 'MenuDataService', 'categories', function ($stateParams, MenuDataService, categories) {
            console.log($stateParams);
            var category = categories[$stateParams.categoryId];
            return MenuDataService.getItemsForCategory(category.short_name);
          }
        ]
      }
    });
  }
})();

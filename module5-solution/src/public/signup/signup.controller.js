(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService', 'PublicInfoService'];
function SignupController(MenuService, PublicInfoService) {
  var $ctrl = this;
  $ctrl.short_name_invalid = false;
  $ctrl.completed = false;
  $ctrl.submit = function () {
    var promise = MenuService.getMenuItem($ctrl.user.menu_item);
    promise.then(function (response) {
      $ctrl.completed = true;

      PublicInfoService.updatePublicInfoItem("first_name", $ctrl.user.first_name);
      PublicInfoService.updatePublicInfoItem("last_name", $ctrl.user.last_name);
      PublicInfoService.updatePublicInfoItem("email", $ctrl.user.email);
      PublicInfoService.updatePublicInfoItem("phone", $ctrl.user.phone);
      PublicInfoService.updatePublicInfoItem("favorite_dish", response);
    }).catch(function (error) {
      $ctrl.short_name_invalid = true;
      console.log("Something went terribly wrong.");
    });
  };
}

})();

(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['PublicInfoService', 'ApiPath'];
function MyInfoController(PublicInfoService, ApiPath) {
  var $ctrl = this;
  $ctrl.first_name = PublicInfoService.getPublicInfoItem("first_name");
  $ctrl.last_name = PublicInfoService.getPublicInfoItem("last_name");
  $ctrl.email = PublicInfoService.getPublicInfoItem("email");
  $ctrl.phone = PublicInfoService.getPublicInfoItem("phone");
  $ctrl.favorite_dish = PublicInfoService.getPublicInfoItem("favorite_dish");
  $ctrl.basePath = ApiPath;
  $ctrl.empty = function() {
    return PublicInfoService.getPublicInfoItem("first_name").length == 0;
  }
}

})();

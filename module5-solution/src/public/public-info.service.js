(function() {
'use strict';

angular.module('public')
.service('PublicInfoService', PublicInfoService);

function PublicInfoService() {
  var service = this;

  var public_info = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    favorite_dish: ""
  };

  service.updatePublicInfoItem = function (itemKey, itemValue) {
    public_info[itemKey] = itemValue;
  };

  service.getPublicInfo = function () {
    return public_info;
  };

  service.getPublicInfoItem = function (itemKey) {
    return public_info[itemKey];
  };
}

})();

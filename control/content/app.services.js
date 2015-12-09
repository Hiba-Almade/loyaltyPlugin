'use strict';

(function (angular, buildfire) {
  angular.module('loyaltyPluginContent')
    .provider('Buildfire', [function () {
      var Buildfire = this;
      Buildfire.$get = function () {
        return buildfire
      };
      return Buildfire;
    }])
    .factory('LoyaltyAPI', ['$q', 'STATUS_CODE', 'STATUS_MESSAGES', 'SERVER', '$http',
      function ($q, STATUS_CODE, STATUS_MESSAGES, SERVER, $http) {
        var addEditApplication = function (app) {
          console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", app);
          var deferred = $q.defer();
          if (!app) {
            deferred.reject(new Error('Undefined app data'));
          }
          $http.post(SERVER.URL + '/api/loyaltyApp', {
            data: app
          }).success(function (response) {
            console.log("+++++++++++_+_________+_+_", response);
            if (response)
              deferred.resolve(response);
            else
              deferred.resolve(null);
          })
            .error(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        };

        var getApplication = function (id) {
          var deferred = $q.defer();
          if (!id) {
            deferred.reject(new Error('Undefined app id'));
          }
          $http.get(SERVER.URL + '/api/loyaltyApp/' + id).success(function (response) {
            response.image = [{
              "action": "noAction",
              "iconUrl": "https://imagelibserver.s3.amazonaws.com/1441017939845-09614174673333764/3e399340-82aa-11e5-8545-1303965d11a5.jpg",
              "title": "image"
            },
              {
                "action": "noAction",
                "iconUrl": "https://imagelibserver.s3.amazonaws.com/1441017939845-09614174673333764/361c1500-8de7-11e5-81a7-bdc8b1a0342d.jpg",
                "title": "image"
              }];

            if (response)
              deferred.resolve(response);
            else
              deferred.resolve(null);
          }).error(function (error) {
            deferred.reject(error);
          });
          return deferred.promise;
        };

        var addReward = function (data) {
          var deferred = $q.defer();
          if (!data) {
            deferred.reject(new Error('Undefined reward data'));
          }
          $http.post(SERVER.URL + '/api/loyaltyRewards', {data: data}).success(function (response) {
            if (response)
              deferred.resolve(response);
            else
              deferred.resolve(null);
          })
            .error(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        };

        var getRewards = function (id) {
          var deferred = $q.defer();
          if (!id) {
            deferred.reject(new Error('Undefined app id'));
          }
          $http.get(SERVER.URL + '/api/loyaltyRewards/' + id).success(function (response) {
            if (response)
              deferred.resolve(response);
            else
              deferred.resolve(null);
          })
            .error(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        };

        var updateReward = function (data) {
          var deferred = $q.defer();
          if (!data._id) {
            deferred.reject(new Error('Undefined reward id'));
          }
          $http.post(SERVER.URL + '/api/loyaltyRewards', {data: data}).success(function (response) {
            if (response.statusCode == 200)
              deferred.resolve(response);
            else
              deferred.resolve(null);
          })
            .error(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        };

        var removeReward = function (id, data) {
          var deferred = $q.defer();
          if (!id) {
            deferred.reject(new Error('Undefined reward id'));
          }
          $http.delete(SERVER.URL + '/api/loyaltyRewards/' + id, {data: data}).success(function (response) {
            if (response.statusCode == 200)
              deferred.resolve(response);
            else
              deferred.resolve(null);
          })
            .error(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        };

        var sortRewards = function (data) {
          var deferred = $q.defer();
          if (!data.appId) {
            deferred.reject(new Error('Undefined app Id'));
          }
          $http.post(SERVER.URL + '/api/loyaltyRewardsSort', {data: data}).success(function (response) {
            if (response)
              deferred.resolve(response);
            else
              deferred.resolve(null);
          })
            .error(function (error) {
              deferred.reject(error);
            });
          return deferred.promise;
        };

        return {
          addEditApplication: addEditApplication,
          getApplication: getApplication,
          addReward: addReward,
          getRewards: getRewards,
          updateReward: updateReward,
          removeReward: removeReward,
          sortRewards: sortRewards
        };
      }])
})(window.angular, window.buildfire);
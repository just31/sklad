'use strict';

/**
 * @ngdoc function
 * @name calendarApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the calendarApp
 */

angular.module('calendarApp')
  .controller('MainCtrl', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

    var vm = this;

    // Получить значение сегодняшнего дня.
    vm.today = function() {
      return vm.today = $filter('date')(new Date(), 'dd');
    }


    // Получить данные, для рендиренга сетки календаря.
    $http({
      method: 'GET',
      url: 'list/list.json'
    }).then(function (data){
      vm.calendar = data.data;

    },function (error){
    });

    // Дополнительное свойство, можно использовать для заголовка результатов поиска.
    vm.resultSearch = 'Результаты поиска';


  }]);

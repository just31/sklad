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

        let vm = this,
            _counter;

        // Получаем значение текущего месяца. Присваиваем его переменной счетчика.
        _counter = parseInt($filter('date')(new Date(), 'MM'));

        // Получить данные, для рендиренга сетки календаря.
        let date = () => {
            $http({
                method: 'GET',
                url: 'list/list' + _counter + '.json'
            }).then(function (data) {
                vm.calendar = data.data;
                vm.dateToday = data.data[0].dateToday;

            }, function (error) {
            });
        }

        // Получить значения сегодняшнего дня и месяца. Сделать переключение на месяц с сегодняшней датой, если был выбран другой месяц.
        vm.getToday = () => {
            _counter = parseInt($filter('date')(new Date(), 'MM'));
            date();
            return vm.today = $filter('date')(new Date(), 'MM-dd');
        }

        // Функция переключающая календарь на 1 месяц вперед. Тестово сделано только до мая.
        vm.next = () => {
            _counter < 5 ? _counter++ : _counter = 5;
            date();
            return _counter;
        }

        // Функция переключающая календарь на 1 месяц назад. Тестово сделано только до марта.
        vm.prev = () => {
            _counter > 3 ? _counter-- : _counter = 3;
            date();
            return _counter;
        }

        // При загрузке страницы, вызываем функцию рендиренга сетки календаря.
        date();

        // Дополнительное свойство, можно использовать для заголовка результатов поиска.
        vm.resultSearch = 'Результаты поиска';


    }]);

'use strict';

angular.module('main.alarm')
    .controller('AlarmCtrl', ['$scope', '$routeParams', '$http', '$location', 'Global',
        function ($scope, $routeParams, $http, $location, Global) {
            $scope.global = Global;

            $scope.find = function(){
                $http.get('/alarms')
                .success(function(res){
                    if(res.error) {
                        $scope.errorMsg = res.error;
                        return;
                    }
                    $scope.alarms = res;
                });
            };

            $scope.alarmId = null;

            $scope.creating = false;

            $scope.alarms = [];

            $scope.update = function(){
                $http.put(
                    '/alarms'+ $scope.alarmId,
                    $scope.alarm
                )
                .success(function(res){
                    if(res.error) {
                        $scope.errorMsg = res.error;
                        return;
                    }
                    $scope.alarm = res;
                });
            };

            $scope.days = [
                {
                    day : 1,
                    label : 'Sun'
                },
                {
                    day : 2,
                    label : 'Mon'
                },
                {
                    day : 3,
                    label : 'Tue'
                },
                {
                    day : 4,
                    label : 'Wed'
                },
                {
                    day : 5,
                    label : 'Thu'
                },
                {
                    day : 6,
                    label : 'Fri'
                },
                {
                    day : 7,
                    label : 'Sat'
                }
            ];


            $scope.isAlarm = function(alarm){
                if(alarm._id && alarm._id === $scope.alarmId)
                    return true;
                else if(!alarm._id && $scope.creating)
                    return true;
                return false;
            };

            $scope.create = function(){
                $http.post(
                    '/alarms',
                    $scope.alarm
                )
                .success(function(res){
                    if(res.error) {
                        $scope.errorMsg = res.error;
                        return;
                    }
                    $scope.alarm = res;
                });
            };

            $scope.findOne = function(alarm){
                $scope.alarmId = alarm._id || null;
                if(!$scope.alarmId) {
                    if($scope.creating){
                        $scope.alarm = alarm;
                    }
                    return;
                }
                $scope.creating = false;
                $http.get('/alarms/' + $scope.alarmId)
                .success(function(res){
                    if(res.error) {
                        $scope.errorMsg = res.error;
                        return;
                    }
                    $scope.alarm = res;
                });
            };

            $scope.addAlarm = function(){
                
                if($scope.creating) return;

                $scope.creating = true;

                var alarm = {
                    name : 'My Alarm',
                    days : [],
                };

                $scope.alarms.push(alarm);

                $scope.alarm = alarm;
            };

            $scope.selectDay = function(day){
                if(!$scope.alarm.days || !$scope.alarm.days.length) $scope.alarm.days = [];
                var index = $scope.alarm.days.indexOf(day);
                if(~index){
                    delete $scope.alarm.days[index];
                }else{
                    $scope.alarm.days.push(day);
                }
            };
        }
    ]);

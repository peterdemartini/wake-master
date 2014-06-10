'use strict';

angular.module('main.alarm')
    .controller('AlarmCtrl', ['$scope', '$routeParams', '$http', '$location', 'Global',
        function ($scope, $routeParams, $http, $location, Global) {
            $scope.global = Global;

            $scope.alarmId = null;

            $scope.creating = false;

            $scope.alarms = [];

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

            $scope.hours = [];

            for(var hour = 0; hour < 24; hour++)
                $scope.hours.push({
                    value : hour,
                    label : hour < 10 ? '0' + hour : hour
                });

            $scope.minutes = [];

            for(var min = 0; min < 60; min++)
                $scope.minutes.push({
                    value : min,
                    label : min < 10 ? '0' + min : min
                });

            $scope.find = function(){
                $http.get('/alarms')
                .success(function(res){
                    if(res.error) {
                        $scope.errorMsg = res.error;
                        return;
                    }
                    $scope.alarms = res;
                    if($scope.alarms && $scope.alarms.length){
                        $scope.alarm = $scope.alarms[0];
                        $scope.alarmId = $scope.alarm._id;
                    }
                });
            };

            $scope.findOne = function(alarm){
                $scope.alarmId = alarm._id || null;
                if(!$scope.alarmId) {
                    if($scope.creating){
                        $scope.alarm = alarm;
                    }else{
                        $scope.creating = true;
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

            $scope.update = function(){
                if($scope.creating) return $scope.create();
                var alarm = $scope.alarm;

                alarm.active = !!alarm.active;
                alarm.snooze = !!alarm.snooze;

                if(!alarm.udpated || !alarm.updated.length) alarm.updated = [];

                alarm.updated.push(new Date());

                $http.put(
                    '/alarms/'+ $scope.alarmId,
                    alarm
                )
                .success(function(res){
                    if(res.error) {
                        $scope.errorMsg = res.error;
                        return;
                    }
                    $scope.alarm = res;
                });
            };

            $scope.create = function(){

                var alarm = $scope.alarm;

                alarm.active = !!alarm.active;
                alarm.snooze = !!alarm.snooze;

                $http.post(
                    '/alarms',
                    alarm
                )
                .success(function(res){
                    if(res.error) {
                        $scope.errorMsg = res.error;
                        return;
                    }
                    $scope.alarm = res;
                });

            };

            $scope.delete = function(){

                $http.delete(
                    '/alarms/'+ $scope.alarmId
                )
                .success(function(res){
                    if(res.error) {
                        $scope.errorMsg = res.error;
                        return;
                    }
                    for(var x in $scope.alarms){
                        var alarm = $scope.alarms[x];
                        if(alarm._id === $scope.alarmId){
                            delete $scope.alarms[x];
                            break;
                        }
                    }
                    $scope.alarmId = null;
                    $scope.alarm = null;
                });

            };

            $scope.isAlarm = function(alarm){
                if(!alarm) return false;
                if(alarm._id && alarm._id === $scope.alarmId)
                    return true;
                else if(!alarm._id && $scope.creating)
                    return true;
                else
                    return false;
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

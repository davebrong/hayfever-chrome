// Generated by CoffeeScript 1.4.0

/*
Angular.js Popup Tasks Controller
*/


(function() {
  var TasksController;

  angular.module('hayfeverApp', ['ui']);

  TasksController = function($scope) {
    var bg_app, bg_page;
    bg_page = chrome.extension.getBackgroundPage();
    bg_app = bg_page.application;
    $scope.projects = bg_app.projects;
    $scope.clients = bg_app.clients;
    $scope.timers = bg_app.todays_entries;
    $scope.prefs = bg_app.get_preferences();
    $scope.current_hours = bg_app.current_hours.toClockTime();
    $scope.total_hours = bg_app.total_hours.toClockTime();
    $scope.tasks = {
      billable: [],
      non_billable: []
    };
    $scope.refresh = function() {
      return bg_app.refresh_hours(function() {
        $scope.projects = bg_app.projects;
        $scope.clients = bg_app.clients;
        $scope.timers = bg_app.todays_entries;
        $scope.prefs = bg_app.get_preferences();
        $scope.current_hours = bg_app.current_hours.toClockTime();
        $scope.total_hours = bg_app.total_hours.toClockTime();
        return $scope.$apply();
      });
    };
    $scope.add_timer = function() {
      var task;
      task = {
        project_id: $scope.task_project,
        task_id: $scope.task_task,
        hours: $scope.task_hours,
        notes: $scope.task_notes
      };
      return console.log(task);
    };
    $scope.project_change = function() {
      var tasks;
      $scope.tasks = {
        billable: [],
        non_billable: []
      };
      tasks = bg_app.project_db.first({
        id: parseInt($scope.task_project)
      }).tasks;
      return tasks.forEach(function(task) {
        if (task.billable) {
          return $scope.tasks.billable.push(task);
        } else {
          return $scope.tasks.non_billable.push(task);
        }
      });
    };
    $scope.toggle_timer = function(timer_id) {
      var result;
      result = bg_app.client.toggle_timer(timer_id);
      return result.success(function(json) {
        return $scope.refresh();
      });
    };
    return $scope.delete_timer = function(timer_id) {
      var result;
      result = bg_app.client.delete_entry(timer_id);
      return result.complete(function() {
        console.log("" + timer_id + " deleted");
        return $scope.refresh();
      });
    };
  };

  window.TasksController = TasksController;

}).call(this);

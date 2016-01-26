angular.module("portfolioApp", ['ngAnimate'])

.controller("portfolioCtrl", ['$scope', '$timeout', function($scope, $timeout) {
    $scope.projects = data.projects;
    $scope.tags = data.tagOrder;
    var projectsByTags = {
        'all': $scope.projects
    };
    var transitioning = false;

    $scope.filterWork = function(tag){
        if(transitioning) return false;
        transitioning = true;
        $scope.selectedTag = tag;

        // this will give us our desired animation
        $scope.filteredProjects = [];
        $timeout(function(){
            $scope.filteredProjects = projectsByTags[tag];
            transitioning = false;
        }, 600);
    };

    // store a mapping for work filter
    var mapProjectsByTag = function(){
        _.each(data.projects, function(project){
            _.each(project.tags, function(tag){
                if(projectsByTags[tag] == null){
                    projectsByTags[tag] = [];
                }
                projectsByTags[tag].push(project);
            })
        });
    };

    var init = function(){
        mapProjectsByTag();
        $scope.filterWork('all');
    };

    init();
}]);

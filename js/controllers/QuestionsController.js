// QuestionsController.js

angular.module('SPAquiz.controllers').controller('QuestionsController', QuestionsController);

function QuestionsController($scope, $stateParams, QuestionsService) {

    console.log('$stateParams : ', $stateParams);

    console.log('QuestionsService : ', QuestionsService.getQuestions());

    $scope.questions = QuestionsService.getQuestions();
}
// QuestionsController.js

angular.module('SPAquiz.controllers').controller('QuestionsController', QuestionsController);

function QuestionsController($scope, $stateParams, QuestionsService) {

    console.log('$stateParams : ', $stateParams);

    console.log('QuestionsService : ', QuestionsService.getQuestions($stateParams.idx));

    $scope.questions = QuestionsService.getQuestions($stateParams.idx);
}
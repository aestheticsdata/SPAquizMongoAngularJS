// QuestionsController.js

angular.module('SPAquiz.controllers').controller('QuestionsController', QuestionsController);

function QuestionsController($scope, $stateParams, QuestionsService) {

    console.log('$stateParams : ', $stateParams);

    console.log('QuestionsService : ', QuestionsService.getQuestions($stateParams.idx));

    $scope.isPrevDisabled = true;
    $scope.isNextDisabled = false;

    $scope.questions = QuestionsService.getQuestions($stateParams.idx);
    $scope.currentQuestionIdx = parseInt($stateParams.idx, 10) + 1; // array 0 based
    $scope.totalQuestionIdx   = QuestionsService.getQuestions().length;

    $scope.chosen = $scope.questions.choices[0];
}
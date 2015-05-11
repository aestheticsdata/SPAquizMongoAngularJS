// QuestionsService.js

angular.module('SPAquiz.services').factory('QuestionsService', QuestionsService);

function QuestionsService() {

    var qs = {
        questions    : [],
        setQuestions : _setQuestions,
        getQuestions : _getQuestions
    };

    return qs;




//  ┌─┐┬─┐┬┬  ┬┌─┐┌┬┐┌─┐  ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
//  ├─┘├┬┘│└┐┌┘├─┤ │ ├┤   │││├┤  │ ├─┤│ │ ││└─┐
//  ┴  ┴└─┴ └┘ ┴ ┴ ┴ └─┘  ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘

    function _setQuestions(questions) {

        console.log('QuestionsService::setQuestions : ' , questions);

        qs.questions = questions;
        return true;
    }

    function _getQuestions(idx) {
        return qs.questions[idx];
    }
}
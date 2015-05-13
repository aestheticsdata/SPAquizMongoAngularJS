// QuestionsService.js

angular.module('SPAquiz.services').factory('QuestionsService', QuestionsService);

function QuestionsService() {

    var qs = {
        questions    : [],
        score        : 0,
        setScore     : _setScore,
        getScore     : _getScore,
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

        return idx ? qs.questions[idx] : qs.questions;
    }


    function _setScore(score) {

        qs.score = score;

        return true;
    }


    function _getScore(){

        return qs.score;
    }
}
var getParameters = function (paramName) {
// 리턴값을 위한 변수 선언
var returnValue;

// 현재 URL 가져오기
var url = location.href;

// get 파라미터 값을 가져올 수 있는 ? 를 기점으로 slice 한 후 split 으로 나눔
var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');

// 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
for (var i = 0; i < parameters.length; i++) {
var varName = parameters[i].split('=')[0];
if (varName.toUpperCase() == paramName.toUpperCase()) {
returnValue = parameters[i].split('=')[1];

return decodeURIComponent(returnValue);
}
}
};

const fullName = getParameters('name');
const answerString = getParameters('answers');
const answers = answerString.split(',');

let uncertainAnswer;

const QUESTION_LIST = [
    '선배님 학과가 무엇인가요?',
    '선배님 mbti가 어떻게 되시나요?',
    '특이취향이신가요?',
    'cc 해보셨나요?ㅎㅎ',
    '연대 떨어지고 고대 오셨나요?',
    '이 후배랑 친하다고 생각하시나요?ㅎㅎ',
    '후배에게 한마디',
];

function npc () {

    $messageRowSend = $('<div class = "message-row"></div>');
    $messageRowSendDiv1 = $('<div class = "message-row__content"></div>');
    $messageRowSendDiv2 = $('<div class="message__info"></div>');
    $messageRowSend.append($('<img src="tiger.JPG">'));
    $messageRowSend.append($messageRowSendDiv1);
    $messageRowSendDiv1.append('<span class="message__author">선배님</span>');
    $messageRowSendDiv1.append($messageRowSendDiv2);
    $messageRowSendDiv2.append(`<span class="message__bubble">${answers[questionCount]}<span>`);
    $messageRowSendDiv2.append('<span class="message__time">21:27<span>');
    $('.main-chat').append($messageRowSend);
}

function npcAnswer () {

    $messageRowSend = $('<div class = "message-row"></div>');
    $messageRowSendDiv1 = $('<div class = "message-row__content"></div>');
    $messageRowSendDiv2 = $('<div class="message__info"></div>');
    $messageRowSend.append($('<img src="tiger.JPG">'));
    $messageRowSend.append($messageRowSendDiv1);
    $messageRowSendDiv1.append('<span class="message__author">후배님</span>');
    $messageRowSendDiv1.append($messageRowSendDiv2);
    $messageRowSendDiv2.append(`<span class="message__bubble">정답이에요!<span>`);
    $messageRowSendDiv2.append('<span class="message__time">21:27<span>');
    $('.main-chat').append($messageRowSend);
}



function user () {
    $messageRowRecieve = $('<div class = "message-row message-row--own"></div>');
    $messageRowRecieveDiv1 = $('<div class = "message-row__content"></div>');
    $messageRowRecieveDiv2 = $('<div class="message__info"></div>');
    $messageRowRecieve.append($messageRowRecieveDiv1);
    $messageRowRecieveDiv1.append($messageRowRecieveDiv2);
    $messageRowRecieveDiv2.append(`<span class="message__bubble">${uncertainAnswer}<span>`);
    $messageRowRecieveDiv2.append('<span class="message__time">21:27<span>');
    $('.main-chat').append($messageRowRecieve);
}
function userQuestion () {
    $messageRowRecieve = $('<div class = "message-row message-row--own"></div>');
    $messageRowRecieveDiv1 = $('<div class = "message-row__content"></div>');
    $messageRowRecieveDiv2 = $('<div class="message__info"></div>');
    $messageRowRecieve.append($messageRowRecieveDiv1);
    $messageRowRecieveDiv1.append($messageRowRecieveDiv2);
    $messageRowRecieveDiv2.append(`<span class="message__bubble">${QUESTION_LIST[questionCount]}<span>`);
    $messageRowRecieveDiv2.append('<span class="message__time">21:27<span>');
    $('.main-chat').append($messageRowRecieve);
}

function ifAnswerIsCorrect(){
    console.log("1");
    npcAnswer();
    $('input').attr('placeholder', '작성 완료!');
    $('.black-bg').addClass('show-opacity');
    $('.score').html(`7점 만점에 ${score}점입니다!`);
    $('.youKnow').html(`${fullName} 선배님을 잘 ${score>4 ? KNOW : NOT_KNOW} 있군요?`);
    switch(score){
        case 1 :
            $('.gift').html(`${fullName} 선배가 알려주는 대로 FM하기!`);
            $('.header').html('후배님..좀 더 분발하시지?');
            break;
        case 2 :
            $('.gift').html(`${fullName} 선배가 고대빵을 사줄거에요!`);
            $('.header').html('후배님..실망이에요!');
            break;
        case 3 :
            $('.gift').html(`${fullName} 선배가 클루 아이디를 빌려줄거에요!`);
            $('.header').html(`${fullName} 선배와 나름 친하군요?`);

            break;
        case 4 :
            $('.gift').html(`${fullName} 선배가 밥약해줄 거에요ㅎㅎ`);
            $('.header').html('좀 치시네요~');
            break;
        case 5 :
            $('.gift').html(`${fullName} 선배가 시간표를 같이 짜줄 거에요!`);
            $('.header').html('오!!');
            break;
        case 6 :
            $('.gift').html(`${fullName} 선배가 캠퍼스투어를 시켜줄 거에요!`);
            $('.header').html('와!!!');

            break;
        case 7 :
            $('.gift').html(`${fullName} 선배가 FM 어떻게 하는지 '직접' 보여줄 거에요ㅎㅎ`);
            $('.header').html('혹시 스토커세요?');
        default : break;
    }
    return;

}

let questionCount = 0;
let score;
const KNOW = '알고';
const NOT_KNOW = '모르고';

$('form').on('submit', (e) => 
{
    e.preventDefault();
    if(questionCount<8
        ){
        let $input = $('form').find('input');
        uncertainAnswer = $input.val();
        $('input').val('');
        user();
        score = 8 - questionCount;
        console.log(score);
        if(uncertainAnswer == fullName){
            ifAnswerIsCorrect();
        }
        userQuestion();
        npc();
        questionCount++;
    }
}
);

$('.black-bg').on('click', () => $('.black-bg').removeClass('show-opacity'));


function saveAs(uri, filename) {
        // 캡처된 파일을 이미지 파일로 내보냄
        var link = document.createElement('a');
        if (typeof link.download === 'string') {
            link.href = uri;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(uri);
        }
    }

    $(".capture-button").on("click", function(){
        html2canvas(document.querySelector(".white-bg")).then(canvas => {
            saveAs(canvas.toDataURL('image/jpg'),"result.jpg");
            });
        });
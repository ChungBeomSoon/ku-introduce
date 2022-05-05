
    const firebaseConfig = {
        apiKey: "AIzaSyBe4dyKNgUDySzx8IoqK9htjJXo9OeD_xM",
        authDomain: "introduce-ku-1a16c.firebaseapp.com",
        projectId: "introduce-ku-1a16c",
        storageBucket: "introduce-ku-1a16c.appspot.com",
        messagingSenderId: "552795752076",
        appId: "1:552795752076:web:ba1b184a3be690c6b89da9"
    };
      
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    const db = firebase.firestore();
    
    
    // 선배side data 보내기
    async function sendAnswerData(){
        // dummy data
        
        await db.collection('후배1').doc().set({
            name: fullName,
            answers: answers
        });
    }

const answers = [];
let fullName;

const QUESTION_LIST = [
    '학과가 무엇인가요?',
    'mbti.',
    '특이취향이신가요?',
    'cc 해보셨나요?ㅎㅎ',
    '연대 떨어지고 고대 오셨나요?',
    '이 후배랑 친하다고 생각하시나요?ㅎㅎ',
    '후배에게 한마디',
    '후배님이 선배님을 빨리 알아차릴수록 점수가 높아져요!<br>'+
    '7점 : 후배님에게 FM 시연해주기 or 응원가 불러주기<br>'+
    '6점 : 캠퍼스투어 시켜주기<br>'+
    '5점 : 시간표 같이 짜주기<br>'+
    '4점 : 밥약해주기<br>'+
    '3점 : 클루 아이디<br>'+
    '2점 : 고대빵 사주기<br>'+
    '1점 : 선배가 알려주는 대로 후배가 FM 하기'
];


function npc () {

    $messageRowSend = $('<div class = "message-row"></div>');
    $messageRowSendDiv1 = $('<div class = "message-row__content"></div>');
    $messageRowSendDiv2 = $('<div class="message__info"></div>');
    $messageRowSend.append($('<img src="tiger.JPG">'));
    $messageRowSend.append($messageRowSendDiv1);
    $messageRowSendDiv1.append('<span class="message__author">후배님</span>');
    $messageRowSendDiv1.append($messageRowSendDiv2);
    $messageRowSendDiv2.append(`<span class="message__bubble">${QUESTION_LIST[questionCount]}<span>`);
    $('.main-chat').append($messageRowSend);
}

function user () {
    $messageRowRecieve = $('<div class = "message-row message-row--own"></div>');
    $messageRowRecieveDiv1 = $('<div class = "message-row__content"></div>');
    $messageRowRecieveDiv2 = $('<div class="message__info"></div>');
    $messageRowRecieve.append($messageRowRecieveDiv1);
    $messageRowRecieveDiv1.append($messageRowRecieveDiv2);
    $messageRowRecieveDiv2.append(`<span class="message__bubble">${answers[questionCount]}<span>`);
    $('.main-chat').append($messageRowRecieve);


}



let questionCount = 0;
$('form').on('submit', (e) => 
{
    if(questionCount<8
        ){
        let $input = $('form').find('input');
        const TEXT = $input.val();
        answers.push(TEXT);
        console.log(answers);
        $('input').val('');
        user();
        npc();
        questionCount++;
        e.preventDefault();
        fullName = answers[0];
        console.log(fullName);
        if(questionCount==8){
            answers.shift();
            $('input').attr('placeholder', '작성 완료!');
            sendAnswerData();

        }
    }
    else {
        e.preventDefault();
    }
}
    );
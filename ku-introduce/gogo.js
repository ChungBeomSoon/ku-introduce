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


// // 선배side data 보내기
// function sendAnswerData(){
//     // dummy data
//     const fullName = "안수진";
//     const answers = [
//         "여자",
//         "석계",
//         "a형",
//         "esfj",
//         "미필",
//         "19",
//         "안경안씀",
//         "발라드"
//     ];
//     db.collection('후배1').doc().set({
//         name: fullName,
//         answers: answers
//     });
// }

function paintGame(name, answers) {
    console.log(name, answers);
}


let reqList = [];
// 리스트 가져오기
const elderList = document.querySelector('.elder-list');
// 리스트 만들기s
async function makeElderList(){
    const elderRef = db.collection('후배1');
    const docs = await elderRef.get();

    docs.forEach((doc)=>{
        const name = doc.data().name;
        const answers = doc.data().answers;
        let list = [];
        list.push(name);
        list.push(answers);
        reqList.push(list);
    });

    var i = 1;
    reqList.forEach(function(item){
        const newId = i++;
        // 전체 박스 생성
        const div = document.createElement("div");
    
        const name = `${newId}번 선배`;
        div.innerText = name;
        div.className = "elder-item";
        div.id = i;

        const navigateBtn = document.createElement("button");
        navigateBtn.className = "nav-btn";
        navigateBtn.innerText = "GO!";
        
        // 새로운 페이지로 이동겸,
        // 매개변수 등록 -> 이름, 답변 리스트
        navigateBtn.addEventListener('click', function(e){
            e.preventDefault();
            location.href = "./game.html";
            paintGame(item[0],item[1]);
        });

        div.appendChild(navigateBtn);
        elderList.appendChild(div);
    });
}
makeElderList();


// CreateJS 라이브러리를 사용합니다.
var stage = new createjs.Stage("canvas");


var reqWord = new XMLHttpRequest(); // 비동기 처리를 위한 객체
reqWord.open("GET", "res/word/words.xlsx", true); // 파일 불러오기
reqWord.responseType = "arraybuffer";

var reqSentence = new XMLHttpRequest(); // 비동기 처리를 위한 객체
reqSentence.open("GET", "res/sentence/sentences.xlsx", true); // 파일 불러오기
reqSentence.responseType = "arraybuffer";


const White = "#FFFFFFFF";
const Transparent = "#FFFFFF00";

const BtnBackgroundColor_none = "#FFFF99FF";
const BtnBackgroundColor_const = "#FAAC96FF";
const BtnBackgroundColor_clicked = "#FFCC00FF";
const BtnStrokeColor = "#33FFCCFF";

const ResolutionX = 1920;
const ResolutionY = 1080;
const RectWidth = 250;
const RectHeight = 70;
const LineCount = 5;


// 버튼 간 간격과 줄 간 간격
const buttonSpacing = 20;
const lineSpacing = 20;

const Resources = new Map();

let SentenceCount = 0;
let CurrentSentence = "";
let CurrentSentenceImage = null;

var TitleAnimationContainer;
var FallingButtonContainer;


var btnCorrect;
var btnWrong;

var ResourceCount = 0;
var ResourceLoadedCount = 0;


 var data; // xml request의 응답을 받을 데이곳
 var workbook; // 엑셀 파일
 var sheetName; // 엑셀 파일내 시트이름 string
 var worksheet; // 엑셀 파일 내 시트
 
 var HoldingWord; // 현재 드래그중인 word
 var HoldingWordPosition;

var SentenceImages = new Array();
var Sentences = new Array();


var WordVerb = new Array();
var WordNoun = new Array();
var WordAdjective = new Array();
var WordConjunction = new Array();
var WordPreposition = new Array();



var GameWords = new Array();

var GameAnswerBox;

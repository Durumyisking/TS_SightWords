// 마우스 이벤트*/

function GameStart (event)
{
	Main.gotoAndStop(1);
	stage.removeChild(event.target);
	stage.removeChild(TitleAnimationContainer);
	
	for (var i = FallingButtonContainer.numButtons - 1; i >= 0; i--) 
	{
		var button = FallingButtonContainer.getChildAt(i);
		createjs.Tween.removeTweens(button);
		FallingButtonContainer.removeChild(button);
		button.removeAllEventListeners();
		button.visible = false;
		button = null;
	}
	stage.removeChild(FallingButtonContainer);

}

var offset;

function startDragging(event) {
	// 마우스 위치에서 버튼 위치까지의 거리 계산
	HoldingWord = event.target;

	WordDesign_Clicked(HoldingWord);


	var bounds = HoldingWord.getBounds(); // 객체의 크기 절반만큼 offset 이동하여 단어 중앙으로 오게함
	offset = {
		x: bounds.width / 2
		, y: bounds.height / 2
		};

	var parent = event.target.parent;
	parent.setChildIndex(event.target, parent.getNumChildren()-1); // 해당 객체의 인덱스를 최상위로 올려준다.

}

function startDragging_const (event) {
	
	var pos = new Vector2 (event.target.x, event.target.y); 
	var text = event.target.Textbox.text;
	var btn = AddWordButton_word(pos, text);
	HoldingWord = btn;
	HoldingWord.Type = "const";

	WordDesign_Clicked(HoldingWord);

	var bounds = HoldingWord.getBounds(); // 객체의 크기 절반만큼 offset 이동하여 단어 중앙으로 오게함
	offset = {
		x: bounds.width / 2
		, y: bounds.height / 2
		};
	
	var parent = btn.parent;
	parent.setChildIndex(btn, parent.getNumChildren()-1); // 해당 객체의 인덱스를 최상위로 올려준다.  
  }


function dragButton(event) {
  // 마우스 위치에 따라 버튼 위치 변경
  event.target.x = event.stageX - offset.x;
  event.target.y = event.stageY - offset.y;
}

function dragButton_const(event) {
	// 마우스 위치에 따라 버튼 위치 변경
	HoldingWord.x = event.stageX - offset.x;
	HoldingWord.y = event.stageY - offset.y;
  }

function stopDragging() {
 	 // 버튼 드래그가 끝난 후 실행할 코드
	
	var CenterPos = new GetCenterPos(HoldingWord);
	
	// answerbox 내에 있는지 검사
	if(IsInAnswerBox(CenterPos))
	{
		// answerbox 밖에서 끌어온애만 Add해야한다.
		if(HoldingWord.InAnswerBox == false)
		{
			HoldingWord.InAnswerBox = true;
			GameAnswerBox.AddWord(HoldingWord);	
		}
		WordDesign_InAnswerBox(HoldingWord);
	}
	else
	{
		HoldingWord.InAnswerBox = false;
		if(null != GameAnswerBox.FindWord(HoldingWord.Textbox.text))
		{
			GameAnswerBox.DeleteWord(HoldingWord);
		}
		if(HoldingWord.Type == "none")
		{
			HoldingWord.x = HoldingWord.DefaultPos.x;
			HoldingWord.y = HoldingWord.DefaultPos.y;
			WordDesign_Initialization(HoldingWord);	
		}
		else if(HoldingWord.Type == "const")
		{
			stage.removeChild(HoldingWord);
		}
	}

	HoldingWordPosition = Vector2(0, 0);

	HoldingWord = null;
}

function stopDragging_const() {

	var CenterPos = new GetCenterPos(HoldingWord);
	
	if(IsInAnswerBox(CenterPos))
	{
		if(HoldingWord.InAnswerBox == false)
		{
			HoldingWord.InAnswerBox = true;
			GameAnswerBox.AddWord(HoldingWord);	
		}
		WordDesign_InAnswerBox(HoldingWord);
	}
	else
	{
		HoldingWord.InAnswerBox = false;
		if(null != GameAnswerBox.FindWord(HoldingWord.Textbox.text))
		{
			GameAnswerBox.DeleteWord(HoldingWord);
		}
		stage.removeChild(HoldingWord);
	}
 
	HoldingWordPosition = Vector2(0, 0);
 
	HoldingWord = null;
}

function ClearAnswerbox()
{
	GameAnswerBox.ClearWord("wrong")
}
function Correct()
{
	// 정답 체크
	// answerbox내 단어들을 배열에 담는다.
	var wordsVector = new Array();
	
	// map 순회
	GameAnswerBox.Words.forEach((value) => {
		wordsVector.push(value);
	  });
	  
	SortWordsByPosition(wordsVector);

	var answerSentence = MakeSentence(wordsVector);

	PrintAnswer_LOG(answerSentence);

	if(answerSentence === CurrentSentence)
	{
		GameAnswerBox.ClearWord("correct");	
	}
	else
	{
		GameAnswerBox.ClearWord("wrong");	
	}
}

///////////////////////////////////
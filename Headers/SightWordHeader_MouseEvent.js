// 마우스 이벤트*/

var offset;

function startDragging(event) {
  // 마우스 위치에서 버튼 위치까지의 거리 계산
  HoldingWord = event.target;
  //HoldingWordPosition = new Vector2(HoldingWord.x, HoldingWord.y);
  WordDesign_Clicked(HoldingWord);
	
  
  var bounds = HoldingWord.getBounds(); // 객체의 크기 절반만큼 offset 이동하여 단어 중앙으로 오게함
  offset = {
	  x: bounds.width / 2
	  , y: bounds.height / 2
	  };
  
  var parent = event.target.parent;
  parent.setChildIndex(event.target, parent.getNumChildren()-1); // 해당 객체의 인덱스를 최상위로 올려준다.

}

function dragButton(event) {
  // 마우스 위치에 따라 버튼 위치 변경
  event.target.x = event.stageX - offset.x;
  event.target.y = event.stageY - offset.y;
}

function stopDragging(event) {
  // 버튼 드래그가 끝난 후 실행할 코드
	
	var CenterPos = new GetCenterPos(HoldingWord);

	
	// answerbox 내에 있는지 검사
	if(IsInAnswerBox(CenterPos))
	{
		if(null == GameAnswerBox.FindWord(HoldingWord.Textbox.text))
		{
			GameAnswerBox.AddWord(HoldingWord);
		}
		WordDesign_InAnswerBox(HoldingWord);
		}
	else
	{
		if(null != GameAnswerBox.FindWord(HoldingWord.Textbox.text))
		{
			GameAnswerBox.DeleteWord(HoldingWord);
		}
		HoldingWord.x = HoldingWord.DefaultPos.x;
		HoldingWord.y = HoldingWord.DefaultPos.y;
		WordDesign_Initialization(HoldingWord);
	}
	console.log(GameAnswerBox.Words);

	HoldingWordPosition = Vector2(0, 0);


	HoldingWord = null;
}


function ClearAnswerbox()
{
	GameAnswerBox.ClearWord("wrong")
}
function Correct()
{
	GameAnswerBox.ClearWord("correct");	
}

///////////////////////////////////
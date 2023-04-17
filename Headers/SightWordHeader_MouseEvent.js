// 마우스 이벤트*/

var offset;

function startDragging(event) {
  // 마우스 위치에서 버튼 위치까지의 거리 계산
  HoldingWord = event.target;
  //HoldingWordPosition = new Vector2(HoldingWord.x, HoldingWord.y);
  WordDesign_Clicked(HoldingWord);
	
  
  var bounds = HoldingWord.Symbol.getBounds(); // 객체의 크기 절반만큼 offset 이동하여 단어 중앙으로 오게함
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


		var GameAnswerBoxScale = GameAnswerBox.Scale;
		var wordCount = GameAnswerBox.Words.size;
	
		// 처음 들어오는 단어면 단어를 중앙에 위치하고 wordindex 0번에 객체를 넣습니다.
		if(GameAnswerBox.Words.size == 1)
		{
			var StepX = GameAnswerBox.WorldPos.x + GameAnswerBoxScale.x / (wordCount +  1) ;
			var bound = HoldingWord.Symbol.getBounds();
			HoldingWord.x = StepX -(bound.width / 2) ;
			HoldingWord.y = GameAnswerBox.CenterPos.y -(bound.height / 2);
			GameAnswerBox.WordsIndex[0] = HoldingWord;
			HoldingWord.Index = 0;
		}
		else
		{
			var arrLength = GameAnswerBox.WordsIndex.length;
			for (let i = 0; i<arrLength; ++i)// wordindex 0번부터 순회함
			{
				var word = GameAnswerBox.WordsIndex[i];
				var wordCenterPos = new GetCenterPos(word);	
				// 단어들 순회하며 위치비교
				// 들고있는 단어의 위치가 현재 단어보다 왼쪽에 있으면 break (WordsIndex는 0번이 가장 왼쪽에 있는 단어가 들어갈 것이기 때문에 작동)

				if(CenterPos.x < wordCenterPos.x)
				{					
					GameAnswerBox.WordsIndex.splice(word.Index, 0, HoldingWord)
					HoldingWord.Index = i;
					break;
				}

				// 마지막 순회일때 위에 조건 안거치면 맨 오른쪽에 뒀다는거임 
				if(i == (arrLength - 1))
				{
					HoldingWord.Index = i + 1;
				}
			}

			arrLength = GameAnswerBox.WordsIndex.length; // 새로 넣었으니까 갱신해주어야함.
			
			for (let i = HoldingWord.Index + 1; i < arrLength; ++i) // holdingword index 이후의 word의 index 1씩 올려주어야함
			{
				++(GameAnswerBox.WordsIndex[i].Index);
				console.log(GameAnswerBox.WordsIndex[i]);
			}

		}
	}
	else //answerbox 밖이면
	{
		if(null != GameAnswerBox.FindWord(HoldingWord.Textbox.text))
		{
			GameAnswerBox.DeleteWord(HoldingWord);
		}
		HoldingWord.x = HoldingWord.DefaultPos.x;
		HoldingWord.y = HoldingWord.DefaultPos.y;
		WordDesign_Initialization(HoldingWord);
	}

	// 단어 추가 및 삭제 끝나면 단어 배치
	var arrLength = GameAnswerBox.WordsIndex.length;
	var iRepeat = Math.floor((arrLength / 4) + 1); // 한줄에 단어 3개씩 넣어보자 소수점 떼야함;
	// index 순서대로 단어 배치
	for (let i = 0; i < iRepeat; ++i)
	{
		let jRepeat;
		if (i == (iRepeat - 1)) // 마지막 i일때
		{
			jRepeat = arrLength % 4;
		}
		else
		{
			jRepeat = 3
		}

		for (let j = 0; j < jRepeat; ++j)
		{
			var word = GameAnswerBox.WordsIndex[i * 3 + j];
			var bound = word.Symbol.getBounds();

			var StepX = GameAnswerBox.WorldPos.x + GameAnswerBoxScale.x / (jRepeat +  1) ;
			var StepY = GameAnswerBox.WorldPos.y + GameAnswerBoxScale.y / (iRepeat +  1) ;
			word.x = StepX * (j + 1) - (bound.width / 2) ;
			word.y = StepY * (i + 1) -(bound.height / 2);

		}	
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
	GameAnswerBox.ClearWord("correct");	
}

///////////////////////////////////
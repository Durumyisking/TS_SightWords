// 게임 로직 함수*/

function SetRandomWord(Textbox)
{
	var WordType = Math.floor(Math.random() * 5);	
	
	if(0 == WordType) // verb
	{		
		Textbox.Type = "verb";
		return GetRandomVerb();
	}
	else if (1== WordType) // noun
	{
		Textbox.Type = "noun";
		return GetRandomNoun();
	}
	else if (2== WordType) // adjective
	{
		Textbox.Type = "adjective";
		return GetRandomAdjective();
	}
	else if (3== WordType) // conjunction
	{
		Textbox.Type = "conjunction";
		return GetRandomConjunction();
	}
	else if (4== WordType) // preposition
	{
		Textbox.Type = "preposition";
		return GetRandomPreposition();
	}	
}

function RepushWord(Textbox)
{
	switch(Textbox.Type)
	{
		case "verb":
			WordVerb.push(Textbox.text);
			break;
		case "noun":
			WordNoun.push(Textbox.text);
			break;
		case "adjective":
			WordAdjective.push(Textbox.text);
			break;
		case "conjunction":
			WordConjunction.push(Textbox.text);
			break;
		case "preposition":
			WordPreposition.push(Textbox.text);
			break;			
		default:
			break;
	}
}

function GetRandomVerb()
{
	var RandomNumber;	
	RandomNumber = Math.floor(Math.random() * WordVerb.length);
	var verb = WordVerb[RandomNumber];
	WordVerb.splice(RandomNumber , 1);

	return verb;
}

function GetRandomNoun()
{
	var RandomNumber;	
	RandomNumber = Math.floor(Math.random() * WordNoun.length);		
	var noun = WordNoun[RandomNumber];
	WordNoun.splice(RandomNumber , 1);	

	return noun;
}

function GetRandomAdjective()
{
	var RandomNumber;	
	RandomNumber = Math.floor(Math.random() * WordAdjective.length);		
	var Adjective = WordAdjective[RandomNumber];
	WordAdjective.splice(RandomNumber , 1);	

	return Adjective;
}

function GetRandomConjunction()
{
	var RandomNumber;	
	RandomNumber = Math.floor(Math.random() * WordConjunction.length);		
	var Conjunction = WordConjunction[RandomNumber];
	WordConjunction.splice(RandomNumber , 1);	

	return Conjunction;
}

function GetRandomPreposition()
{
	var RandomNumber;	
	RandomNumber = Math.floor(Math.random() * WordPreposition.length);		
	var Preposition = WordPreposition[RandomNumber];
	WordPreposition.splice(RandomNumber , 1);	

	return Preposition;
}


function CorrectOperate(word)
{
	if(word[1].Type == "none" )
	{
		// 새로운 단어들 받아와야함
		let newPos = GetButtonGrid(word[1].DefaultPos);
		AddWordButton(newPos);	// 일반 단어 추가
	}

	
	stage.removeChild(word[1]);
}

function WrongOperate(word)
{
	if(word[1].Type == "none" )
	{
		word[1].x = word[1].DefaultPos.x;
		word[1].y = word[1].DefaultPos.y;
		WordDesign_Initialization(word[1]);
	}
	else if(word[1].Type == "const" )
	{
		stage.removeChild(word[1]);
	}
}
////////////////////////////////////////

// 애니메이션 관련 함수

function LoadSequence(frameImages, path, size)
{
	for (var i = 1; i <= size; i++)
	{
		frameImages.push(path + i + ".png")
	}
}


function PlayAnimation(AnimContainer, frameImages ,loop)
{
	var currentFrame = 0;
	createjs.Ticker.addEventListener("tick", handleTick); // Ticker 이벤트 리스너 등록
	createjs.Ticker.framerate = 24; // 재생 프레임 속도 설정
	function handleTick(event) 
	{
		// 현재 프레임에 해당하는 이미지만 보이도록 설정
		for (var i = 0; i < AnimContainer.children.length; i++) {
			AnimContainer.children[i].visible = false;
		}
		AnimContainer.children[currentFrame].visible = true;

		// 다음 프레임으로 이동
		currentFrame++;
		if (currentFrame >= frameImages.length) {

			if(loop)
			{
				currentFrame = 0;
			}
			else
			{
				createjs.Ticker.removeEventListener("tick", handleTick);
				CreateStartButton();	
			}
		}

		// 화면 업데이트
		stage.update();
	}


}

  
function IsInAnswerBox(pos)
{
	if((pos.x < (GameAnswerBox.CenterPos.x + GameAnswerBox.Scale.x / 2)) &&
		(pos.x > (GameAnswerBox.CenterPos.x - GameAnswerBox.Scale.x / 2))&&
		(pos.y < (GameAnswerBox.CenterPos.y + GameAnswerBox.Scale.y / 2)) &&
		(pos.y > (GameAnswerBox.CenterPos.y - GameAnswerBox.Scale.y / 2)))
	{
		return true;
	}
	return false;
}

/////////////////////////////




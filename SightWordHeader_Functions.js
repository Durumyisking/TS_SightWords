function Vector2(_x, _y)
{
	this.x = _x;
	this.y = _y;
}

function GetCenterPos(_obj)
{
	var CenterPos = new Vector2(_obj.x, _obj.y);
	var bounds = _obj.getBounds();
	CenterPos.x += bounds.width / 2;
	CenterPos.y += bounds.height / 2;
	
	this.x = CenterPos.x;
	this.y = CenterPos.y;
}


// 랜덤 단어 얻기*/

function GetRandomWord()
{
	var WordType = Math.floor(Math.random() * 2);	
	
	if(0 == WordType) // verb
	{		
		return GetRandomVerb();
	}
	else if (1== WordType) // noun
	{
		return GetRandomNoun();
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
////////////////////////////////////////





// 이미지 리사이징 함수
function resizeImage(image, newWidth, newHeight) {
  var canvas = document.createElement('canvas');
  canvas.width = newWidth;
  canvas.height = newHeight;

  var context = canvas.getContext('2d');
  context.drawImage(image, 0, 0, newWidth, newHeight);
	
  return canvas.toDataURL();
}


function CreateBackground()
{
	var bg = Resources.get('background');
	stage.addChildAt(bg, 0);
}

function CreateAnswerBox()
{
	var answerbox = Resources.get('answerbox');
	stage.addChildAt(answerbox, 1);
	
	answerbox.scaleX = 1.75;	
	answerbox.scaleY = 1.5;
	var bound = answerbox.getBounds();
	bound.width *= 1.75;
	bound.height *= 1.5;

	
	answerbox.x = (stage.canvas.width / 2) - (bound.width / 2) - 250;
	answerbox.y = stage.canvas.height / 2 + 200;
	
	const answerBoxWorldPos = new Vector2(answerbox.x, answerbox.y);
	const answerBoxCenterPos = new Vector2(answerbox.x + (bound.width / 2), answerbox.y + (bound.height / 2));
	const answerBoxscale = new Vector2(bound.width, bound.height);

	GameAnswerBox = new AnswerBox
	(
		answerbox, 
		answerBoxWorldPos,
		answerBoxCenterPos, 
		answerBoxscale
	);
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

function CreateButtons()
{
	btnCorrect = Resources.get('correct');
	btnWrong = Resources.get('wrong');
	
	btnCorrect.x = GameAnswerBox.CenterPos.x + GameAnswerBox.Scale.x / 2 + 20;
	btnCorrect.y = GameAnswerBox.WorldPos.y + 20;
	
	var bound = btnCorrect.getBounds();
	btnWrong.x = btnCorrect.x + bound.width + 20;
	btnWrong.y = GameAnswerBox.WorldPos.y + 20;

	
	stage.addChildAt(btnCorrect, 1);
	stage.addChildAt(btnWrong, 1);
	
	btnWrong.on("pressup", ClearAnswerbox);
	btnCorrect.on("pressup", Correct);
}

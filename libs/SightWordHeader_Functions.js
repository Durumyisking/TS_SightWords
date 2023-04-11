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


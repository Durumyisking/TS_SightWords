

// 랜덤 단어 얻기*/

function GetRandomWord()
{
	var WordType = Math.floor(Math.random() * 5);	
	
	if(0 == WordType) // verb
	{		
		return GetRandomVerb();
	}
	else if (1== WordType) // noun
	{
		return GetRandomNoun();
	}
	else if (2== WordType) // adjective
	{
		return GetRandomAdjective();
	}
	else if (3== WordType) // conjunction
	{
		return GetRandomConjunction();
	}
	else if (4== WordType) // preposition
	{
		return GetRandomPreposition();
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


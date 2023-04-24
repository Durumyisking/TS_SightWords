

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

///////////////////////////

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


/////////////////////////////

// 위치 및 회전 관련 함수
function SetRandomPos(Obj, NegativeX, NegativeY, InitialValueX = 0, InitialValueY = 0) // stage기준 랜덤위치로 정합니다.
{
	if(NegativeX)
	{
		Obj.x = (-Math.random() * stage.canvas.width) + InitialValueX; // -1980 ~ 0 무작위 위치	
	}
	else
	{
		Obj.x = (Math.random() * stage.canvas.width) + InitialValueX; // 0 ~ 1980 무작위 위치	
	}
	if(NegativeY)
	{
		Obj.y = (-Math.random() * stage.canvas.height) + InitialValueY; // -1080 ~ 0
	}
	else
	{
		Obj.y = (Math.random() * stage.canvas.height) + InitialValueY; // 0 ~ 1080	
	}

}

function SetRandomRotation(Obj , MaxValue = 360)
{
	Obj.rotation = Math.random() * MaxValue; // MaxValue 내의 각도로 무작위로 회전
}


function MoveEffect_RandomFall(Obj, durationInital, durationRandom, startDelay, heightLimit)
{
	// Tween을 사용하여 버튼 심볼을 밑으로 떨어트림 (무한 반복)
	var duration = durationInital + Math.random() * durationRandom; // 이동하는데 걸리는 시간을 랜덤으로 설정
	var delay = Math.random() * startDelay; // 시작 딜레이를 랜덤으로 설정
	createjs.Tween.get(Obj, { loop: true })
		.wait(delay) // 시작 딜레이 적용
		.to({ y: stage.canvas.height + heightLimit }, duration, createjs.Ease.linear) // 무작위로 이동, linear 이징 사용 height + heightLimit 넘어가면 이동 끝
		.call(function () {
			// 이동이 완료되면 버튼 심볼을 다시 랜덤위치로부터 시작함
			SetRandomPos(Obj, false, true, 0, -200);
			SetRandomRotation(Obj);
		});

}


////////////////////////
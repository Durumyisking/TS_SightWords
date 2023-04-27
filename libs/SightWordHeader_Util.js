////////////유틸////////////

function getRandomNumberInRange(min, max) 
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getParsedString(string, delimiter)
{
	// 문자열을 구분자(delimiter)를 기준으로 분리하여 배열에 저장
	const parsedArray = string.split(delimiter);
	console.log(parsedArray); // ["It", "is", "rainy"]

	return parsedArray;
}

function swap(Arr ,IdxA, IdxB)
{
	var Temp = Arr[IdxA];
	Arr[IdxA] = Arr[IdxB];
	Arr[IdxB] = Temp;

	console.log(Arr);
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



function GetButtonPos(grid)
{
	var x = buttonSpacing + (RectWidth + buttonSpacing) * grid.x;
	var y = buttonSpacing + (RectHeight + lineSpacing) * grid.y;
	var pos = new Vector2(x, y);
	return pos;
}

function GetButtonGrid(pos)
{
	var x = Math.floor((pos.x - buttonSpacing) / (RectWidth + buttonSpacing)); 
	var y = Math.floor((pos.y - buttonSpacing) / (RectHeight + lineSpacing)); 
	var grid = new Vector2(x, y);
	return grid;
}
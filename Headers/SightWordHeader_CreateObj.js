function CreateBackground()
{
	var bg = Resources.get('background');
	stage.addChildAt(bg, 0);

// 버튼 심볼을 담을 컨테이너
var buttonContainer = new createjs.Container();
stage.addChild(buttonContainer);

// 버튼 심볼의 개수와 간격 설정
var numButtons = 20;
var buttonSpacing = 50;

// 버튼 심볼 생성 및 배치
for (var i = 0; i < numButtons; i++) {


	var scaleRatio =  (Math.random() * 3) + 1;
	var buttonSymbol = CreateShape(10, BtnStrokeColor, BtnBackgroundColor_none, RectWidth / scaleRatio, RectHeight / scaleRatio, 10);

	// 버튼 심볼의 초기 위치 무작위 설정
	buttonSymbol.x = Math.random() * stage.canvas.width; // 가로 방향 무작위 위치
	buttonSymbol.y = -Math.random() * (stage.canvas.height + 1000); // 위에서부터 무작위 위치
	buttonSymbol.rotation = Math.random() * 360; // 무작위로 회전

	buttonContainer.addChild(buttonSymbol);

  // Tween을 사용하여 버튼 심볼을 밑으로 떨어트림 (무한 반복)
  var duration = 1000 + Math.random() * 1000; // 이동하는데 걸리는 시간을 랜덤으로 설정
  var delay = Math.random() * 2000; // 시작 딜레이를 랜덤으로 설정
  createjs.Tween.get(buttonSymbol, { loop: true })
    .wait(delay) // 시작 딜레이 적용
    .to({ y: stage.canvas.height + buttonSpacing }, duration, createjs.Ease.linear) // 무작위로 이동, linear 이징 사용
    .call(function() {
      // 이동이 완료되면 버튼 심볼을 다시 초기 위치로 되돌림
      buttonSymbol.x = Math.random() * stage.canvas.width;
      buttonSymbol.y = -buttonSpacing;
      buttonSymbol.rotation = Math.random() * 360;
    }) .addEventListener("change", function(e) {
		// 버튼 심볼이 화면 밖을 나가면 사라지도록 함
		if (buttonSymbol.y > stage.canvas.height + buttonSpacing + 200) {
		  buttonContainer.removeChild(buttonSymbol);
		}
	  });
}

// 특정 이벤트가 발생하기 전까지 배경에 버튼 심볼이 내리는 효과를 계속 유지
// 예시로 5초 후에 이벤트가 발생한다고 가정하고 setTimeout 함수를 사용하여 5초 후에 이벤트를 처리하는 코드 작성
	setTimeout(function() {
	// 이벤트 발생 시 처리할 코드 작성
	}, 5000);
}

function CreateTitleLogo()
{
	// 이미지 시퀀스를 담을 컨테이너
	animationContainer = new createjs.Container();

	// 이미지 시퀀스의 프레임 이미지 파일들의 경로와 파일명 배열
	var frameImages = [];

	for (var i = 1; i <= 30; i++)
	{
		frameImages.push("res/images/title/title" + i + ".png")
	}

	// 이미지 파일들을 로드할 LoadQueue 객체 생성
	var loader = new createjs.LoadQueue();

	// 이미지 파일들을 로드 완료된 후 실행될 콜백 함수 등록
	loader.addEventListener("complete", handleLoadComplete);

	// 이미지 파일들 로드 시작
	loader.loadManifest(frameImages, true);

	// 이미지 파일들 로드 완료된 후 실행될 콜백 함수
	function handleLoadComplete() 
	{
		// 이미지 시퀀스의 각 프레임 이미지를 Bitmap 객체로 생성하여 컨테이너에 추가
		for (var i = 0; i < frameImages.length; i++) 
		{
			var frameImage = new createjs.Bitmap(loader.getResult(frameImages[i]));
			frameImage.scaleX = 2;
			frameImage.scaleY = 2;
			frameImage.x = ResolutionX / 2 - 676; // 프레임 간의 가로 위치 조절
			animationContainer.addChild(frameImage); // 컨테이너에 추가
			frameImage.visible = false; // 모든 이미지를 숨김
		}

		// 애니메이션 컨테이너를 화면에 추가
		stage.addChild(animationContainer);

		// 애니메이션 재생
		var currentFrame = 0;
		createjs.Ticker.addEventListener("tick", handleTick); // Ticker 이벤트 리스너 등록
		createjs.Ticker.framerate = 24; // 재생 프레임 속도 설정
		function handleTick(event) 
		{
			// 현재 프레임에 해당하는 이미지만 보이도록 설정
			for (var i = 0; i < animationContainer.children.length; i++) {
				animationContainer.children[i].visible = false;
			}
			animationContainer.children[currentFrame].visible = true;

			// 다음 프레임으로 이동
			currentFrame++;
			if (currentFrame >= frameImages.length) {
				createjs.Ticker.removeEventListener("tick", handleTick);
				CreateStartButton();
			}

			// 화면 업데이트
			stage.update();
		}
	}
}

function CreateStartButton()
{
	var button = new createjs.MovieClip();
	var buttonSymbol = CreateShape(10, BtnStrokeColor, BtnBackgroundColor_none, 320, 200, 10);
	var buttonText = CreateTextbox("START", "bold", "70", "Arial", "#000000", "center");

	buttonText.x = buttonSymbol.getBounds().width / 2;
	buttonText.y = buttonSymbol.getBounds().height / 2 - 35; // 글씨 크기의 절반을 빼줘야댐		

	// 버튼 위치 설정
	button.x = ResolutionX / 2 - buttonSymbol.getBounds().width / 2;
	button.y = ResolutionY / 2 + buttonSymbol.getBounds().height / 2;
		
	button.on("pressup", GameStart);
	
	button.addChild(buttonSymbol);
	button.addChild(buttonText);

	button.alpha = 0;

	// 버튼을 stage에 추가
	stage.addChild(button);

    Fade(button, "in", 0.3);
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


function AddWordButton(pos)
{
	var button = new createjs.MovieClip();
		
	// 버튼 심볼 생성
	var buttonSymbol = CreateShape(10, BtnStrokeColor, BtnBackgroundColor_none, RectWidth, RectHeight, 10);
	
	// 버튼 안의 텍스트 생성
	var buttonText = CreateTextbox("버튼", "bold", "30", "Arial", "#000000", "center");


	buttonText.x = buttonSymbol.getBounds().width / 2;
	buttonText.y = buttonSymbol.getBounds().height / 2 - 15; // 글씨 크기의 절반을 빼줘야댐		
	buttonText.text = GetRandomWord();

	// 버튼 위치 설정
	button.x = pos.x;
	button.y = pos.y;
	
	button.DefaultPos = new Vector2(button.x, button.y);
	button.Symbol = buttonSymbol;
	button.Textbox = buttonText;
	
	button.on("mousedown", startDragging); // on은 createjs에서 addeventlistener 간편하게 사용하기 위해 만든거
	button.on("pressmove", dragButton);
	button.on("pressup", stopDragging);

	
	button.addChild(buttonSymbol);
	button.addChild(buttonText);
    button.alpha = 0;

	// 버튼을 stage에 추가
	stage.addChild(button);

    Fade(button, "in", 0.3);
    // Fade(word[1].Textbox, "out", 0.5);

	button.Type = "none";

	return button;
}

function AddWordButton_word(pos, word)
{
	var button = new createjs.MovieClip();
	var buttonSymbol = CreateShape(10, BtnStrokeColor, BtnBackgroundColor_none, RectWidth, RectHeight, 10);
	var buttonText = CreateTextbox("버튼", "bold", "30", "Arial", "#000000", "center");


	buttonText.x = buttonSymbol.getBounds().width / 2;
	buttonText.y = buttonSymbol.getBounds().height / 2 - 15; // 글씨 크기의 절반을 빼줘야댐		
	buttonText.text = word;

	// 버튼 위치 설정
	button.x = pos.x;
	button.y = pos.y;
	
	button.DefaultPos = new Vector2(button.x, button.y);
	button.Symbol = buttonSymbol;
	button.Textbox = buttonText;
	
	button.on("mousedown", startDragging); // on은 createjs에서 addeventlistener 간편하게 사용하기 위해 만든거
	button.on("pressmove", dragButton);
	button.on("pressup", stopDragging);

	
	button.addChild(buttonSymbol);
	button.addChild(buttonText);
    button.alpha = 0;

	stage.addChild(button);

    Fade(button, "in", 0.3);

	button.Type = "none";
	return button;
}


function AddConstWordButton(pos, word)
{
	var button = new createjs.MovieClip();
	var buttonSymbol = CreateShape(10, BtnStrokeColor, BtnBackgroundColor_const, RectWidth, RectHeight, 10);	
	var buttonText = CreateTextbox("버튼", "bold", "30", "Arial", "#000000", "center");


	buttonText.x = buttonSymbol.getBounds().width / 2;
	buttonText.y = buttonSymbol.getBounds().height / 2 - 15; 	
	buttonText.text = word;

	// 버튼 위치 설정
	button.x = pos.x;
	button.y = pos.y;
	
	button.DefaultPos = new Vector2(button.x, button.y);
	button.Symbol = buttonSymbol;
	button.Textbox = buttonText;
	
	button.on("mousedown", startDragging_const); 
	button.on("pressmove", dragButton_const);
	button.on("pressup", stopDragging_const);

	
	button.addChild(buttonSymbol);
	button.addChild(buttonText);
    button.alpha = 0;

	stage.addChild(button);

    Fade(button, "in", 0.3);

	button.Type = "const";
	return button;
}
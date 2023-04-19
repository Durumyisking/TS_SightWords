function CreateBackground()
{
	var bg = Resources.get('background');
	stage.addChildAt(bg, 1);
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
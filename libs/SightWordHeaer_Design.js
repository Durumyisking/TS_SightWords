//////////////////////////디자인 관련///////////////////////////////////////

// 버튼 심볼 디자인 생성 */
function CreateShape(_StrokeSize, _StrokeColor, _FillColor, Width, Height, RoundSize)
{
	// 버튼 심볼 생성
	var newShape = new createjs.Shape();
	newShape.graphics.setStrokeStyle(_StrokeSize);
	newShape.graphics.beginStroke(_StrokeColor);
	newShape.graphics.beginFill(_FillColor);
	newShape.graphics.drawRoundRect(0, 0, Width, Height, RoundSize);
	newShape.setBounds(0, 0, Width, Height);
	
	return newShape;
	
}

function CreateTextbox(_text, _style, _size, _font, _color, _align)
{
	var textform = _style + " " + _size+"px" + " "+_font;
	
	var textbox = new createjs.Text(_text,  textform, _color);
	textbox.textAlign = _align;
	
	return textbox;
}

function WordDesign_Initialization(word)
{
	word.Symbol.graphics.clear();
	word.Symbol.graphics.setStrokeStyle(10);
	word.Symbol.graphics.beginStroke(BtnStrokeColor);	
	word.Symbol.graphics.beginFill(BtnBackgroundColor_none).drawRoundRect(0,0,RectWidth,RectHeight,10,10);
}
function WordDesign_Clicked(word)
{
	word.Symbol.graphics.clear();
	word.Symbol.graphics.setStrokeStyle(10);
	word.Symbol.graphics.beginStroke(BtnStrokeColor);	
	word.Symbol.graphics.beginFill(BtnBackgroundColor_clicked).drawRoundRect(0,0,RectWidth,RectHeight,10,10);
}
function WordDesign_InAnswerBox(word)
{
	var bound = word.getBounds();
	word.Symbol.graphics.clear();
	word.Symbol.graphics.setStrokeStyle(0);
	word.Symbol.graphics.beginStroke(White);	
	
	var size = new Vector2(100, 30);
	word.Symbol.graphics.beginFill(White).drawRect((RectWidth / 2) - (size.x / 2), (RectHeight / 2) - (size.y / 2), size.x, size.y);	
}

function Fade(obj, type, duration)
{
	duration *= 1000;
	if(type == "in")
	{
		createjs.Tween.get(obj).to({alpha: 1}, duration, createjs.Ease.linear);
	}
	else if (type == "out")
	{
		createjs.Tween.get(obj).to({alpha: 0}, duration, createjs.Ease.linear);
	}
}

////////////////////////////////////////////////////////////////////////////////
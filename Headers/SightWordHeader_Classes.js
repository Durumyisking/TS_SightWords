class AnswerBox 
{
	constructor(_answerBox, _WorldPos ,_CenterPos, _Scale)
	{
		this.answerBox = _answerBox;
		this.WorldPos =  _WorldPos;	
		this.CenterPos = _CenterPos;		
		this.Scale = _Scale;		
		this.Words = new Map();
	}

	AddWord(_button)
	{
		var key = _button.Textbox.text;
		var count = 0;
		while(true)
		{
			if(null == GameAnswerBox.FindWord(key))
			{
				break;
			}
			else
			{
				++count;
				key = key + count.toString();			
			}

		}
		this.Words.set(key, _button);

	}
	DeleteWord(_button)
	{
		this.Words.delete(_button.Textbox.text);
	}
	FindWord(_key)
	{
		var rst = this.Words.get(_key);
		
		return rst;
	}
	ClearWord(type)
	{
		for	(let word of this.Words)
		{				
			if(type == "correct")
			{				
				CorrectOperate(word);
			}
			
			else if(type == "wrong")
			{
				WrongOperate(word);
			}
			
		}
		if(type == "correct")
		{				
			CurrentSentence = "";
			stage.removeChild(CurrentSentenceImage);
			CurrentSentenceImage = null;
			AddSentenceImage();
		}
		this.Words.clear();
	}

}


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
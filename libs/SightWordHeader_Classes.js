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

		console.log(this.Words)
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
				if(word[1].Type == "none" )
				{
					// 새로운 단어들 받아와야함
					let newPos = new Vector2(word[1].DefaultPos.x, word[1].DefaultPos.y);
					AddWordButton(newPos);	// 일반 단어 추가
				}

				stage.removeChild(word[1]);
			}
			
			else if(type == "wrong")
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
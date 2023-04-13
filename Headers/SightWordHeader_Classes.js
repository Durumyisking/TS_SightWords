class AnswerBox 
{
	constructor(_answerBox, _WorldPos ,_CenterPos, _Scale)
	{
		this.answerBox = _answerBox;
		this.WorldPos =  _WorldPos;	
		this.CenterPos = _CenterPos;		
		this.Scale = _Scale;		
		this.Words = new Map();
		this.WordsIndex = new Array();
	}

	AddWord(_button)
	{
		this.Words.set(_button.Textbox.text, _button);
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
				Fade(word[1], "out", 0.5);
				
				// 새로운 단어들 받아와야함

				let newPos = new Vector2(word[1].DefaultPos.x, word[1].DefaultPos.y);

				AddWordButton(newPos);			
			}
			else if(type == "wrong")
			{
				word[1].x = word[1].DefaultPos.x;
				word[1].y = word[1].DefaultPos.y;
				WordDesign_Initialization(word[1]);
			}
			
		}
		this.Words.clear();
		this.WordsIndex.clear();
	}

}




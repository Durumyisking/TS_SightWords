class Word 
{
	constructor(_button,  _WorldPos, _WorldSheetMatrix, _symbol,_textbox)
	{
		this.button = _button;
		this.WorldPos = _WorldPos;		
		this.WorldSheetMatrix = _WorldSheetMatrix;
		//this.WordType = _WordType;		
		this.word = _textbox;
		
		this.word.text = GetRandomWord();
		
		this.button.addChild(_symbol);
		this.button.addChild(_textbox);

	}
		
}

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
				Fade(word[1].Symbol, "out", 0.5);
				Fade(word[1].Textbox, "out", 0.5);
				
				
			}
			else if(type == "wrong")
			{
				word[1].x = word[1].DefaultPos.x;
				word[1].y = word[1].DefaultPos.y;
				WordDesign_Initialization(word[1]);
			}
			
		}
		this.Words.clear();
	}

}




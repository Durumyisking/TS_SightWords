(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



// stage content:
(lib.test = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		var page_body = document.getElementsByTagName("body")[0];
		page_body.style.backgroundColor = "#00000000";
		page_body.style.overflow = "hidden";
		page_body.style.position = "fixed";
		
		var page_canvas = document.getElementsByTagName("canvas")[0];
		stageWidth = page_canvas.width;
		stageHeight = page_canvas.height;
		
		var viewport = document.querySelector('meta[name=viewport]');
		var viewportContent = 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0';
		
		if (viewport === null) {
		 var head = document.getElementsByTagName('head')[0];
		 viewport = document.createElement('meta');
		 viewport.setAttribute('name', 'viewport');
		 head.appendChild(viewport);
		}
		
		viewport.setAttribute('content', viewportContent);
		
		function onResize() {
		 var widthToHeight = stageWidth / stageHeight;
		 var newWidth = window.innerWidth;
		 var newHeight = window.innerHeight;
		 var newWidthToHeight = newWidth / newHeight;
		 //
		 if (newWidthToHeight > widthToHeight) {
		 newWidth = newHeight * widthToHeight;
		 page_canvas.style.height = newHeight + "px";
		 page_canvas.style.width = newWidth + "px";
		 } else {
		 newHeight = newWidth / widthToHeight;
		 page_canvas.style.height = newHeight + "px";
		 page_canvas.style.width = newWidth + "px";
		 }
		 scale = newWidthToHeight / widthToHeight;
		 stage.width = newWidth;
		 stage.height = newHeight;
		 page_canvas.style.marginTop = ((window.innerHeight - newHeight) / 2) + "px";
		 page_canvas.style.marginLeft = ((window.innerWidth - newWidth) / 2) + "px";
		}
		
		window.onresize = function () {
		 onResize();
		}
		
		onResize();
		var Words = new Array();
		
		
		
		// 게임 불러오기 */
		
		
		// 리소스 관리 */
		function LoadResources()
		 {
			AddResource('background', "res/sky.png");
			AddResource('answerbox', "res/answerbox.png");	
		}
		
		function AddResource(_key, _path, LoadWordscallback)
		{
			++ResourceCount;
		
			var bitmap = null;
			bitmap = new createjs.Bitmap(_path);
			bitmap.image.onload = onLoadComplete;
			Resources.set(_key, bitmap);
			
			function onLoadComplete() 
			{	
				ResourceLoadedCount++;
				if (ResourceLoadedCount >= ResourceCount)  // 리소스 로드 개수만큼 확인
				{ 
					LoadWords(init);
				}
			}
		}
		
		
		// 단어 load
		function LoadWords (Initcallback)
		{
			req.onload = function() { // 파일 불러오기 끝났을때 실행되는 함수
				 
				data = new Uint8Array(req.response);
				workbook = XLSX.read(data, { type: "array" });
		
				// 첫 번째 워크시트(액셀 하단탭의 그것)를 선택
				sheetName = workbook.SheetNames[0];
				worksheet = workbook.Sheets[sheetName];
				
				// 동사 단어들 불러옵니다
				var range = 'B2:B51'; // B2부터 B51까지
				var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, range });
			
				for(var i=0 ; i<50; ++i)
				{
					WordVerb.push(jsonData[i]);		
				}
			
			
				// 명사 단어들 불러옵니다.
				range = 'C2:C51'; // B2부터 B51까지
				jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, range });	
			
				for(var i=0 ; i<50; ++i)
				{
					WordNoun.push(jsonData[i]);			
				}
		
				// 게임 초기화
				// word를 비동기로 불러오기 때문에 word 로딩이 완료되기전에 callback이 호출되는걸 방지한다.
				if (typeof Initcallback === 'function') 
				{
		
					Initcallback();
				}
			};
		
			req.send(); // 파일을 다시 불러오도록 요청한다 (이후에 재사용 위해) (일단 남겨둠)
			
			
		}
		
		
		// 초기화
		function init ()
		{
			CreateBackground();
			CreateAnswerBox();	
			CreateWords();
		}
		
		
		function CreateBackground()
		{
			var bg = Resources.get('background');
			stage.addChildAt(bg, 0);
		}
		
		function CreateAnswerBox()
		{
			var answerbox = Resources.get('answerbox');
			stage.addChildAt(answerbox, 1);
			
			answerbox.x = (stage.canvas.width / 2) - (answerbox.image.width / 2);
			answerbox.y = stage.canvas.height / 2;
			
		}
		
		// 단어 생성 및 배치
		function CreateWords()
		{
			// 버튼 간 간격과 줄 간 간격
			var buttonSpacing = 20;
			var lineSpacing = 20;
		
			// 2줄에 버튼을 채우기 위한 변수
			var buttonsPerLine = Math.floor((stage.canvas.width - buttonSpacing) / (RectWidth + buttonSpacing));
			var currentLine = 0;
			var currentButton = 0;
		
			// 화면 좌측 상단부터 버튼 생성 및 배치
			for (var i = 0; i < 4 * buttonsPerLine; i++) 
			{
				// 버튼 생성
				var button = new createjs.MovieClip();
				
				// 버튼 심볼 생성
				var buttonSymbol = CreateShape(10, BtnStrokeColor, BtnBackgroundColor_none, RectWidth, RectHeight, 10);
				
				// 버튼 안의 텍스트 생성
				var buttonText = CreateTextbox("버튼", "bold", "50", "Arial", "#000000", "center");
		
		
				buttonText.x = buttonSymbol.getBounds().width / 2;
				buttonText.y = buttonSymbol.getBounds().height / 2 - 25;		
				
				button.addChild(buttonSymbol);
				button.addChild(buttonText);
					
		
				// 버튼 위치 설정
				button.x = buttonSpacing + (RectWidth + buttonSpacing) * currentButton;
				button.y = buttonSpacing + (RectHeight + lineSpacing) * currentLine;
		
				// 버튼을 stage에 추가
				stage.addChild(button);
		
				// 다음 버튼 위치 설정
				currentButton++;
				if (currentButton >= buttonsPerLine) 
				{
					currentLine++;
					currentButton = 0;
				}
		
				// button에 랜덤 word 지정
				button.children[1].text = GetRandomWord();
			
				button.on("mousedown", startDragging); // on은 createjs에서 addeventlistener 간편하게 사용하기 위해 만든거
				button.on("pressmove", dragButton);
				button.on("pressup", stopDragging);
		
				var newWord = new Word(button, Vector2(button.x, button.y), Vector2(i, currentLine));
				newWord.SetWord(button.children[1].text);
			
				Words.push(newWord);
			}
		}
		//////////////////////////////////////////////
		
		
		// 랜덤 단어 얻기*/
		
		function GetRandomWord()
		{
			var WordType = Math.floor(Math.random() * 2);	
			
			if(0 == WordType) // verb
			{		
				return GetRandomVerb();
			}
			else if (1== WordType) // noun
			{
				return GetRandomNoun();
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
		////////////////////////////////////////
		
		
		// 드래그 이벤트*/
		
		var offset;
		
		function startDragging(event) {
		  // 마우스 위치에서 버튼 위치까지의 거리 계산
		  HoldingWord = event.target;
		  HoldingWordPosition = new Vector2(HoldingWord.x, HoldingWord.y);
		  HoldingWord.getChildAt(0).graphics.beginFill(BtnBackgroundColor_clicked).drawRoundRect(0,0,RectWidth,RectHeight,10,10);
			
		  
		  var bounds = HoldingWord.getBounds(); // 객체의 크기 절반만큼 offset 이동하여 단어 중앙으로 오게함
		  offset = {
			  x: bounds.width / 2
			  , y: bounds.height / 2
			  };
		  
		  var parent = event.target.parent;
		  parent.setChildIndex(event.target, parent.getNumChildren()-1); // 해당 객체의 인덱스를 최상위로 올려준다.
		
		}
		
		function dragButton(event) {
		  // 마우스 위치에 따라 버튼 위치 변경
		  event.target.x = event.stageX - offset.x;
		  event.target.y = event.stageY - offset.y;
		}
		
		function stopDragging(event) {
		  // 버튼 드래그가 끝난 후 실행할 코드
			HoldingWord.x = HoldingWordPosition.x;
			HoldingWord.y = HoldingWordPosition.y;
			
			HoldingWordPosition = Vector2(0, 0);
			HoldingWord.getChildAt(0).graphics.beginFill(BtnBackgroundColor_none).drawRoundRect(0,0,RectWidth,RectHeight,10,10);
		
			HoldingWord = null;
		}
		///////////////////////////////////
		
		
		
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
		//////////////////////////////////////////
		
		
		// 이미지 불러오기
		LoadResources();
		
		// 엑셀 파일 불러오기
		//LoadWords(init);
		
		// stage 업데이트
		stage.update();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);
// library properties:
lib.properties = {
	id: '1299523199400343B751879641BC0ED0',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['1299523199400343B751879641BC0ED0'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;
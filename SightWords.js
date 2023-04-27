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
(lib.SightWords = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1];
	// timeline functions:
	this.frame_0 = function() {
		var page_body = document.getElementsByTagName("body")[0];
		page_body.style.backgroundColor = "#00000000";
		page_body.style.overflow = "hidden";
		page_body.style.position = "fixed";
		
		var page_canvas = document.getElementsByTagName("canvas")[0];
		page_canvas.width = 1920;
		page_canvas.height = 1080;
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
		Main = this;
		
		// 리소스 관리 */
		function LoadObjectImages()
		 {
			AddResource('background', "res/images/sky.png");
			AddResource('answerbox', "res/images/answerbox.png");	
			AddResource('correct', "res/images/correct.png");	
			AddResource('wrong', "res/images/wrong.png");	
			 
			LoadSentenceImage();
		}
		
		function LoadSentenceImage()
		{
				for(var i = 0; i<SentenceImages.length; ++i)
			{
				var key = SentenceImages[i][0];
		//		key = key.replace(".png", "");
				var path = SentenceImages[i][0];
				path = "res/sentence/image/" + path;
		
				AddResource(key, path);	
			}
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
			reqWord.onload = function() { // 파일 불러오기 끝났을때 실행되는 함수
				 
				data = new Uint8Array(reqWord.response);
				workbook = XLSX.read(data, { type: "array" });
		
				// 첫 번째 워크시트(액셀 하단탭의 그것)를 선택
				sheetName = workbook.SheetNames[0];
				worksheet = workbook.Sheets[sheetName];
				
				// 동사 단어들 불러옵니다
				var range = 'B2:B1000'; // B2부터 B51까지
				var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, range });
				var i = 0;
				while(true)
				{
					if(jsonData[i][0] == null)
						break;
					WordVerb.push(jsonData[i]);			
					++i;		
				}
		
			
			
				// 명사 단어들 불러옵니다.
				range = 'C2:C1000'; // B2부터 B51까지
				jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, range });	
				i = 0;
				while(true)
				{
					if(jsonData[i][0] == null)
						break;
					WordNoun.push(jsonData[i]);			
					++i;		
				}
			
			
				// 형용사 단어들 불러옵니다.
				range = 'D2:D1000'; // B2부터 B51까지
				jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, range });	
				i = 0;
				while(true)
				{
					if(jsonData[i][0] == null)
						break;
					WordAdjective.push(jsonData[i]);			
					++i;		
				}
			
				// 접속사 단어들 불러옵니다.
				range = 'E2:E1000'; // B2부터 B51까지
				jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, range });		
				i = 0;
				while(true)
				{
					if(jsonData[i][0] == null)
						break;
					WordConjunction.push(jsonData[i]);			
					++i;		
				}
			
				// 전치사 단어들 불러옵니다.
				range = 'F2:F1000'; // B2부터 B51까지
				jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, range });	
				i = 0;
				while(true)
				{
					if(jsonData[i][0] == null)
						break;
					WordPreposition.push(jsonData[i]);			
					++i;		
				}
		
				// 게임 초기화
				// word를 비동기로 불러오기 때문에 word 로딩이 완료되기전에 callback이 호출되는걸 방지한다.
				if (typeof Initcallback === 'function') 
				{
					Initcallback();
				}
			};
		
			reqWord.send(); // 파일을 다시 불러오도록 요청한다 (이후에 재사용 위해) (일단 남겨둠)
			
			
		}
		
		
		// 문장 load
		function LoadSentence (LoadImagecallback)
		{
			reqSentence.onload = function() { // 파일 불러오기 끝났을때 실행되는 함수
				 
				data = new Uint8Array(reqSentence.response);
				workbook = XLSX.read(data, { type: "array" });
		
				// 첫 번째 워크시트(액셀 하단탭의 그것)를 선택
				sheetName = workbook.SheetNames[0];
				worksheet = workbook.Sheets[sheetName];
				
				// 동사 단어들 불러옵니다
				var range = 'B1:B1000'; // B2부터 B51까지
				var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, range });
				var i = 0;
				while(true)
				{
					if(jsonData[i][0] == null)
						break;
					SentenceImages.push(jsonData[i]);		
					++SentenceCount;
					++i;		
				}
			
				if (typeof LoadImagecallback === 'function') 
				{
					LoadImagecallback();
				}
				
			};
		
			reqSentence.send();
			
			
		}
		
		
		// 초기화
		function init ()
		{
			CreateBackground();
			CreateTitleLogo();
		}
		
		// 이미지 불러오기
		LoadSentence(LoadObjectImages);
		
		this.stop();
	}
	this.frame_1 = function() {
		// 초기화
		function init ()
		{
			CreateAnswerBox();	
			CreateButtons();
			CreateWords_Initgame();
			AddSentenceImage();
		}
		
		
		init();
		
		// stage 업데이트
		stage.update();
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(2));

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
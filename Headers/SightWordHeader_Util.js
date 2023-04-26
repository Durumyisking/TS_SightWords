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
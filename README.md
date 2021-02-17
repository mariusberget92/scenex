# Scenex

This package allows you to grab tags from a scene-release formatted string.
See usage below.

````javascript
import scenex from 'scenex';
var tags = scenex('Citizenfour.2014.1080p.BluRay.DTS.x264-HDMaNiAcS');
console.log(tags);

/*
{
	audio: "DTS",
  	group: "HDMaNiAcS",
  	resolution: "1080p",
  	title: "Citizenfour",
  	type: "BluRay",
  	encoding: "x264",
  	year: "2014"
}
*/
````




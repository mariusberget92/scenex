# Scenex

This package allows you to grab tags from a scene-release formatted string.
See usage below.

````javascript
import scenex from 'scenex';
var tags = scenex('Citizenfour.2014.1080p.BluRay.DTS.x264-HDMaNiAcS');
console.log(tags);

/*
{
  title: 'Citizenfour',
  year: '2014',
  resolution: '1080p',
  videoEncoding: 'x264',
  videoSource: 'BluRay',
  audio: 'DTS',
  releaseGroup: 'HDMaNiAcS'
}
*/
````

All tags that can be extracted with examples:

````
	title            The Movie Title
	year             2003
    resolution       1080p
    HDR              HDR
    UHD              UHD
    audio            DTS
    videoBitDepth    10bit
    videoEncoding    x264
    videoStandard    PAL
    videoEdition     Remastered
    videoSource      BluRay
    video3D          3D
    streamingSource  AMZN
    releaseGroup     NoGRoUP
    misc             INTERNAL
    trash            REDUX
````



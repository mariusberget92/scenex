# Scenex

## Archived!

This package allows you to grab tags from a scene-release formatted string.
Now works with movies, complete tv shows or single episodes and XXX titles.
There might be some bugs after the big update the allowed for matching against
shows and other stuff, so if you encounter one just open an issue and I'll see
what I can do.


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
    title:              Media Title
    year:               Year
    resolution:         1080p/i
    HDR:                HDR
    UHD:                UHD
    videoBitDepth:      10-bit
    videoEncoding:      X264
    videoCodec:         AVC
    videoStandard:      PAL
    videoEdition:       EXTENDED
    videoSource:        BluRay
    video3D:            3D
    streamingSource:    AMZN
    misc:               LIMITED
    remux:              REMUX
    language:           NORWEGiAN/MULTi
    audio:              DTS/AAC/Atmos/DTS HD-MA 5.1
    seasonEpisode:      S01/S01-S11/S01E02
    airDate:            2020 03 04/20 03 04
    completeRelease:    COMPLETE
    XXX:                XXX
    trash:              Stuff we dont need tbh.
    releaseGroup:       GR0UP
````



#!/usr/bin/env node
'use strict';
export default function(str) {

  // All plus signs are removed
  str = str.replace(/\+/g, '');

  // Convert underscores to spaces
  str = str.replace(/\_/g, ' ');

  // All regexes
  var scenex = {

    // Movie title
    title: /^((?:(?!\b\d{4}\b(?!\d|.*\b\d{4}\b))(?:[^\r\n]|[\r\n]))+)/ig,

     // Matching a 4-digit year, with negative lookahead
    year: /\b\d{4}\b(?!\d|.*\b\d{4}\b)/ig,

    // Matching a resolution (720p, 1080p, 1440p etc.) with negative lookahead
    resolution: /\b(\d{3,4}(p|i))\b(?!\b(\d{3,4}(p|i))\b|.*\b(\d{3,4}(p|i))\b)/ig,
    
    // HDR with negative lookahead
    HDR: /\bHDR\b(?!\bHDR\b|.*\bHDR\b)/ig,

    // UHD with negative lookahead
    UHD: /\bUHD\b(?!\bUHD\b|.*\bUHD\b)/ig,

    // Video bit depth with negative lookahead
    videoBitDepth: /\b\d{1,2}bit\b(?!\b\d{1,2}bit\b|.*\b\d{1,2}bit\b)/ig,

    // Video encoding with negative lookeahead
    videoEncoding: /\b[xh][\.\s]?\d{3}\b(?!\b[xh][\.\s]?\d{3}\b|.*\b[xh][\.\s]?\d{3}\b)/ig,
    
    // Video codec with negative lookahead
    videoCodec: /(\bHEVC|AVC\b)/ig,

    // Video standard with negative lookahead
    videoStandard: /\b(NTSC|PAL)\b(?!\b(NTSC|PAL)\b|.*\b(NTSC|PAL)\b)/ig,    
    
    // Video edition with negative lookahead
    videoEdition: /UNRATED|\bDC\b|REMASTERED|(DIRECTORS|EXTENDED|COLLECTORS|FINAL)[\.\s](CUT|EDITION)|EXTENDED|\bHARDCORE VERSION\b/ig,
    
    // Video source with negative lookahead
    videoSource: /\bCAM\b|\bTS(?!C)\b|TELESYNC|(DVD|BD)SCR|\bSCR\b|\bDDC\b|R5([\.\s\-]LINE)?|(DVD|HD|BR|BD|WEB)Rip|DVD(R)?|(HD|PD)TV|(BluRay|Blu-Ray)|(WEB(-)?(DL)?)(?!\bCAM\b|\bTS(?!C)\b|TELESYNC|(DVD|BD)SCR|\bSCR\b|\bDDC\b|R5([\.\s\-]LINE)?|(DVD|HD|BR|BD|WEB)Rip|DVD(R)?|(HD|PD)TV|(BluRay|Blu-Ray)|(WEB(-)?(DL)?)|.*\bCAM\b|\bTS(?!C)\b|TELESYNC|(DVD|BD)SCR|\bSCR\b|\bDDC\b|R5([\.\s\-]LINE)?|(DVD|HD|BR|BD|WEB)Rip|DVD(R)?|(HD|PD)TV|(WEB(-)?(DL)?))|(BluRay|Blu-Ray)(?!\bCAM\b|\bTS(?!C)\b|TELESYNC|(DVD|BD)SCR|\bSCR\b|\bDDC\b|R5([\.\s\-]LINE)?|(DVD|HD|BR|BD|WEB)Rip|DVD(R)?|(HD|PD)TV|(BluRay|Blu-Ray)|(WEB(-)?(DL)?)(?!\bCAM\b|\bTS(?!C)\b|TELESYNC|(DVD|BD)SCR|\bSCR\b|\bDDC\b|R5([\.\s\-]LINE)?|(DVD|HD|BR|BD|WEB)Rip|DVD(R)?|(HD|PD)TV|(BluRay|Blu-Ray)|(WEB(-)?(DL)?)|.*\bCAM\b|\bTS(?!C)\b|TELESYNC|(DVD|BD)SCR|\bSCR\b|\bDDC\b|R5([\.\s\-]LINE)?|(DVD|HD|BR|BD|WEB)Rip|DVD(R)?|(HD|PD)TV|(BluRay|Blu-Ray)|(WEB(-)?(DL)?))|.*\bCAM\b|\bTS(?!C)\b|TELESYNC|(DVD|BD)SCR|\bSCR\b|\bDDC\b|R5([\.\s\-]LINE)?|(DVD|HD|BR|BD|WEB)Rip|DVD(R)?|(HD|PD)TV|(BluRay|Blu-Ray)|(WEB(-)?(DL)?)(?!\bCAM\b|\bTS(?!C)\b|TELESYNC|(DVD|BD)SCR|\bSCR\b|\bDDC\b|R5([\.\s\-]LINE)?|(DVD|HD|BR|BD|WEB)Rip|DVD(R)?|(HD|PD)TV|(BluRay|Blu-Ray)|(WEB(-)?(DL)?)|.*\bCAM\b|\bTS(?!C)\b|TELESYNC|(DVD|BD)SCR|\bSCR\b|\bDDC\b|R5([\.\s\-]LINE)?|(DVD|HD|BR|BD|WEB)Rip|DVD(R)?|(HD|PD)TV|(BluRay|Blu-Ray)|(WEB(-)?(DL)?)))/ig,

    // 3D with negative lookahead
    video3D: /\b3D\b(?!\b3D\b|.*\b3D\b)/ig,

    // Streaming source with negative lookahead
    streamingSource: /(\bPCOK\b|\bNICK\b|\bHULU\b|\bFOX\b|\bCW\b|\bCBS\b|\bBBC\b|\bATVP\b|\bNF\b|\bAMZN\b|\bDSNP\b|\bHMAX\b)(?!(\bPCOK\b|\bNICK\b|\bHULU\b|\bFOX\b|\bCW\b|\bCBS\b|\bBBC\b|\bATVP\b|\bNF\b|\bAMZN\b|\bDSNP\b|\bHMAX\b)|.*(\bPCOK\b|\bNICK\b|\bHULU\b|\bFOX\b|\bCW\b|\bCBS\b|\bBBC\b|\bATVP\b|\bNF\b|\bAMZN\b|\bDSNP\b|\bHMAX\b))/ig,

    // Misceleanious
    misc: /(LIMITED|INTERNAL|DUBBED|DOCU)/ig,

    // Is remux with negative lookahead
    remux: /(\bREMUX\b)/ig,

    // Language with negative lookahead
    language: /((MULTI|NORDIC|DANISH|SWEDISH|NORWEGIAN|GERMAN|ITALIAN|FRENCH|SPANISH)(SUBS)?)(?!((MULTI|NORDIC|DANISH|SWEDISH|NORWEGIAN|GERMAN|ITALIAN|FRENCH|SPANISH)(SUBS)?)|.*((MULTI|NORDIC|DANISH|SWEDISH|NORWEGIAN|GERMAN|ITALIAN|FRENCH|SPANISH)(SUBS)?))(?!((MULTI|NORDIC|DANISH|SWEDISH|NORWEGIAN|GERMAN|ITALIAN|FRENCH|SPANISH)(SUBS)?)(?!((MULTI|NORDIC|DANISH|SWEDISH|NORWEGIAN|GERMAN|ITALIAN|FRENCH|SPANISH)(SUBS)?)|.*((MULTI|NORDIC|DANISH|SWEDISH|NORWEGIAN|GERMAN|ITALIAN|FRENCH|SPANISH)(SUBS)?))|.*((MULTI|NORDIC|DANISH|SWEDISH|NORWEGIAN|GERMAN|ITALIAN|FRENCH|SPANISH)(SUBS)?)(?!((MULTI|NORDIC|DANISH|SWEDISH|NORWEGIAN|GERMAN|ITALIAN|FRENCH|SPANISH)(SUBS)?)|.*((MULTI|NORDIC|DANISH|SWEDISH|NORWEGIAN|GERMAN|ITALIAN|FRENCH|SPANISH)(SUBS)?)))/ig,

    // Audio
    audio: /\b2audio\b|(FLAC(([\.\s])?[0-9][\.\s][0-9])?|FLAC)|(AAC([0-9][\.\s][0-9])?|AAC)|(DTS([\.\s\-](HD(([\.\s\-])?MA)?))?(([\.\s\-])?\d[\.\s\-]\d)?)|(AC3([\.\s](DD([0-9][\.\s][0-9])?)?)?)|\b(DD(P)?(([\+\-\.\s])?([\+\-\.\s]ATMOS)?(\d)?[\-\.\s]\d)?([\-\.\s]ATMOS)?)\b|((ATMOS[\.\-\s])?TRUE([\-\.\s])?HD[\.\-\s](ATMOS[\.\-\s])?(\d[\.\-\s]\d)?|(ATMOS)([\.\s\-]\d[\.\s\-]\d)?)/ig,

    // Season and episode
    seasonEpisode: /(S\d{2}\-S\d{2}|S\d{2}(E\d{2})?)(?!(S\d{2}\-S\d{2}|S\d{2}(E\d{2})?)|.*(S\d{2}\-S\d{2}|S\d{2}(E\d{2})?))/ig,

    // Air date
    airDate: /\b(\d{2}|\d{2})(\d{2})?[\.\-\s]\d{2}[\.\-\s]\d{2}\b(?!\b(\d{2}|\d{2})(\d{2})?[\.\-\s]\d{2}[\.\-\s]\d{2}\b|.*\b(\d{2}|\d{2})(\d{2})?[\.\-\s]\d{2}[\.\-\s]\d{2}\b)/ig,

    // Complete release for full series or seasons
    completeRelease: /\bCOMPLETE\b(?!\bCOMPLETE\b|.*\bCOMPLETE\b)/ig,

    // Check for XXX
    XXX: /\bXXX\b(?!\bXXX\b|.*\bXXX\b)/ig,

    // Some stuff we don't care about tbh.
    trash: /BACKHAUL|REAL[\.\s]PROPER|PROPER|REPACK|READNFO|READ[\.\s]NFO|DiRFiX|NFOFiX|REDUX|MP4(?!BACKHAUL|REAL[\.\s]PROPER|PROPER|REPACK|READNFO|READ[\.\s]NFO|DiRFiX|NFOFiX|REDUX|MP4.*BACKHAUL|REAL[\.\s]PROPER|PROPER|REPACK|READNFO|READ[\.\s]NFO|DiRFiX|NFOFiX|REDUX|MP4)/ig,

    // Release group
    releaseGroup: /\w+$/ig,

  };
  
  // Data object and matches
  var data = {};

  var matches = '';
  
  // Do all matching
  for(var [key, regex] of Object.entries(scenex)) {
    
    // If there is a match, append it to the data object
    // and append it with a pipeline character to the matches string
    if (str.match(regex)) {

      var i = 0;
      for (var [x, match] of Object.entries(str.match(regex))) {
        data[key] = (i == 0) ? match : data[key].concat(' '+ match);
        i++;
      }

      matches+= data[key] + '|';
    }

  }
  
  // Do some cleanup to title
  matches = matches.replace(/,/g, '|')
  matches = matches.split('|').slice(1).join('|');
  console.log(matches);
  data.title = data.title.replace(/\./g, ' ').replace(RegExp(matches+ '-', 'g'), '')
  .replace(/\s{2,}/g, ' ')
  .trim();

  // Do some cleanup to audio
  if (data.audio != undefined) {
    data.audio = data.audio.replace(/\./g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  }

  // Fix for titles containing web & bluray as web will be added to videosource aswell as bluray..
  // Most titles does not have a BluRay word in them, but they can have Web as i have seen
  // This could propably be improved later
  if (/\bWEB\b/i.test(data.videoSource) && /\bBluRay\b/i.test(data.videoSource)) {
    data.videoSource = 'BluRay';
  }

  // Same as above, but for titles containing the word Pal as this is also a
  // video standard..
  if (/\bPAL\b/i.test(data.title) && !/\bDVD|DVD-R|DVDRip|DVD-RIP\b/i.test(data.videoSource)) {
    data.videoStandard = '';
  }

  return data;

}
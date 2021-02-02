'use strict';
export default function(str) {

  str = str.replace(/\+/g, '');

  // All regexes
  var scenex = {
    year:       /(?!^)[1,2]\d{3}/i,
    resolution: /\d{3,4}p/i,
    size:       /\d{2,5}[MG]B/i,
    color:      /(10-bit|\bHDR\b)/i,
    tags:       /(COMPLETE|LIMITED|INTERNAL|DUBBED)/i,
    video:      /(REMUX?[\.\s](AVC|HEVC)?)|((AVC|HEVC)?[\.\s]?REMUX)|NTSC|PAL|[xh]?[\.\s]?(264|265)|(HEVC)/i,
    release:    /REAL[\.\s]PROPER|PROPER|REPACK|READNFO|READ[\.\s]NFO|DiRFiX|NFOFiX/i,
    lang:       /(MULTISUBS|MULTI|NORDIC|DANISH|SWEDISH|NORWEGIAN|GERMAN|ITALIAN|FRENCH|SPANISH)([\.\s]NORDICSUBS|[\.\s]ENG)?/i,
    edition:    /UNRATED|DC|REMASTERED|(Directors|EXTENDED)[\.\s](CUT|EDITION)|EXTENDED|3D|2D|\bNF\b|\bAMZN\b|\bDSNP\b/i,
    type:       /CAM|\bTS(?!C)\b|TELESYNC|(DVD|BD)SCR|\bSCR\b|DDC|R5[\.\s]LINE|R5|(DVD|HD|BR|BD|WEB)Rip|DVD|DVDR|(HD|PD)TV|WEB-DL|WEBDL|BluRay|WEB/i,
    audio:      /AAC2[\.\s]0|AAC|(DTS-HD([\.\s]MA[\.\s]5[\.\s]1)?|DTS[0-9][\.\s][0-1]|DTS)|(AC3[\.\s](DD2[\.\s]0|DD5[\.\s]1)|AC3|DD[\+](Atmos)?(5[\.\s]1|DD5[\.\s]1)?)|(DDP5[\.\s]1|DDP2[\.\s]0|DDP2[\.\s]1)|(TRUEHD[\.\s]5[\.\s]1)/i,
    other:      /UHD|DOCU/i,
    group:      /\w+$/i
  };
  
  // Data object and matches
  var data = {};
  var matches = '';
  
  // Do all matching
  for(var [key, regex] of Object.entries(scenex)) {
    
    // If there is a match, append it to the data object
    // and append it with a pipeline character to the matches string
    if (str.match(regex)) {
      data[key] = str.match(regex)[0];
      matches+= data[key] + '|';
    }
    
  }
  
  // Add the title to the data object
  matches = matches.replace(/,/g, '|');
  data.title = str.replace(RegExp(matches + '-', 'g'), '')
  .replace(/\./g, ' ')
  .replace(/\s{2,}/g, ' ')
  .trim();
  
  return data;

}

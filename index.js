'use strict';
export default function(str) {

  str = str.replace(/\+/g, '');

  // All regexes
  var scenex = {
    year:       /\b(?!^)[1,2]\d{3}\b/i,
    resolution: /(\d{3,4}p)/i,
    size:       /\d{2,5}[MG]B/i,
    color:      /(10-bit|\bHDR\b)/i,
    tags:       /(COMPLETE|LIMITED|INTERNAL|DUBBED)/i,
    video:      /((REMUX[\.\s](AVC|HEVC)?|(AVC|HEVC)[\.\s]REMUX)|NTSC|PAL|HEVC)/i,
    encoding:   /\b[xh]?[\.\s]?\d{3}\b/i,
    release:    /REAL[\.\s]PROPER|PROPER|REPACK|READNFO|READ[\.\s]NFO|DiRFiX|NFOFiX/i,
    lang:       /((MULTI|NORDIC|DANISH|SWEDISH|NORWEGIAN|GERMAN|ITALIAN|FRENCH|SPANISH)(SUBS)?)/i,
    edition:    /UNRATED|DC|REMASTERED|(Directors|EXTENDED|COLLECTORS)[\.\s](CUT|EDITION)|EXTENDED|3D|2D|\bNF\b|\bAMZN\b|\bDSNP\b|\bHMAX\b/i,
    type:       /CAM|\bTS(?!C)\b|TELESYNC|(DVD|BD)SCR|\bSCR\b|DDC|R5[\.\s]LINE|R5|(DVD|HD|BR|BD|WEB)Rip|DVD(R)?|(HD|PD)TV|(WEB(-)?(DL)?)|BluRay/i,
    audio:      /(AAC[0-9][\.\s][0-9]|AAC)|(DTS([\.\s\-](HD[\.\s\-]MA|HD|MA)([\.\s][0-9][\.\s][0-9]|))?|DTS([0-9][\.\s][0-9])?)|(AC3([\.\s](DD([0-9][\.\s][0-9])?)?)?)|(DD([\+][0-9][\.\s][0-9]|[\.\s\+]ATMOS))|(DD(P)?[0-9][\.\s][0-9])|(TRUEHD[\.\s][0-9][\.\s][0-9])|(ATMOS)/i,
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

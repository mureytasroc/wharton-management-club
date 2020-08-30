titleToId = {
  'Member': 'memberslink',
  'Wharton Management Club': 'homelink',
  'News': 'newslink',
  'News Post': 'newslink',
  'About': 'aboutlink',
  'Activities': 'activitieslink',
  'Clients': 'clientslink',
  'Sponsors': 'sponsorslink',
  'Contact': 'contactlink'
}
$('#'+titleToId[Object.keys(titleToId).reduce((e, r)=>{
  if(document.title.includes(e)){ return e; } else{ return r; }
}, 'none')]).css('color','#EA4231')

setTimeout(function(){ $.jsdvPopup({}); }, 500)

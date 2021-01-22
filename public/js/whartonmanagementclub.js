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

vp_amp = {
  "name": "Charley Cunningham",
  "penn_key": "ccunning",
  "domain": "seas"
}
vp_finance = {
  "name": "Lucia Macchi",
  "penn_key": "lmacchi",
  "domain": "wharton"
}
vp_relations = {
  "name": "Matt Dieffenthaller",
  "penn_key": "dieffmat",
  "domain": "seas"
}
vp_sae = {
  "name": "Ryan Sachs",
  "penn_key": "sachs23",
  "domain": "wharton"
}

$("#vp_amp_name").text(vp_amp["name"])
email = vp_amp["penn_key"] + "@" + vp_amp["domain"] + ".upenn.edu"
$("#vp_amp_email").text(email)
$("#vp_amp_email").attr("href", "mailto:" + email)

$("#vp_finance_name").text(vp_finance["name"])
email = vp_finance["penn_key"] + "@" + vp_finance["domain"] + ".upenn.edu"
$("#vp_finance_email").text(email)
$("#vp_finance_email")

$("#vp_relations_name").text(vp_relations["name"])
email = vp_relations["penn_key"] + "@" + vp_relations["domain"] + ".upenn.edu"
$("#vp_relations_email").text(email)
$("#vp_relations_email").attr("href", "mailto:" + email)

$("#vp_sae_name").text(vp_sae["name"])
email = vp_sae["penn_key"] + "@" + vp_sae["domain"] + ".upenn.edu"
$("#vp_sae_email").text(email)
$("#vp_sae_email").attr("href", "mailto:" + email)

$('.grid').masonry({
  // options
  itemSelector: '.grid-item',
  columnWidth: 200,
  isFitWidth: true
});

$(window).resize(function () {
  $grid.masonry('reloadItems')
});

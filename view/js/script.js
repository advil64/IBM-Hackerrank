
const add_contact = document.getElementById('submit');
const name_click = document.getElementById('nameColumn');
let clicks = 0;

name_click.addEventListener('click', (e) => {
  if(clicks % 2 === 0){
    window.contactsList.sort((a, b) => {
      return a.name > b.name;
    });
  } else{
    window.contactsList.sort((a, b) => {
      return a.name < b.name;
    });
  }
  clicks++;
  resetTable(document.getElementById('summaryTable'), window.contactsList);
})

add_contact.addEventListener('click', (e) => {
  let new_row = {
    name: document.getElementById('name').value,
    mobile: document.getElementById('mobile').value,
    email: document.getElementById('email').value
  };
  if(validate(new_row)){
    window.contactsList.push(new_row);
    resetTable(document.getElementById('summaryTable'), window.contactsList);
    document.getElementById('name').value = "";
    document.getElementById('mobile').value = "";
    document.getElementById('email').value = "";
  }
});

//do our checks
function validate(row){
  if(row.name.length > 20 || !row.name.match(/^[A-Za-z\s]+$/) || row.name === ""){
    document.getElementById('error').classList.remove('dn');
    return false;
  }
  if(row.mobile.length !== 10 || !row.mobile.match(/^[0-9]+$/)){
    document.getElementById('error').classList.remove('dn');
    return false;
  }
  if(row.email.length > 40 || !row.email.includes("@") || !row.email.includes(".com") || row.email === ""){
    document.getElementById('error').classList.remove('dn');
    return false;
  }
  if(!document.getElementById('error').classList.contains('dn')){
    document.getElementById('error').classList.add('dn');
  }
  return true;
}

function resetTable(nl, data) {
  console.log(data);
  console.log(nl.childNodes[3]);
  var new_rows = document.createElement('tbody');
  data.forEach((e, i) => {
    var tr = new_rows.insertRow(i);
    //go through our object and insert accordingly
    Object.keys(e).forEach((k, j) => {
      var cell = tr.insertCell(j);
      cell.innerHTML = e[k];
      if(i % 2 == 0){
        cell.style.backgroundColor = '#f2f2f2';
      }
    });
  });
  nl.replaceChild(new_rows, nl.childNodes[3]);
}
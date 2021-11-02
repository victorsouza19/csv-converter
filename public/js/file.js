// alterando valor da label input file
document.querySelector('#file').addEventListener('change', function(){
  document.querySelector('.text').textContent = this.files[0].name;
});

function setCard(event, form){
event.preventDefault();

let completed = document.getElementById('completed');
let convert = document.getElementById('convert');

convert.style.display = 'none';

completed.classList.add('animate__zoomIn');
completed.style.display = 'block';
form.submit();
};

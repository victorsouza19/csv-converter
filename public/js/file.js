document.querySelector('#file').addEventListener('change', function(){
  document.querySelector('.text').textContent = this.files[0].name;
});
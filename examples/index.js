const fs = require('fs');

/*
================================================
  Manipulando o primeiro arquivo(victor.souza)
================================================
*/
// leitura
fs.readFile("./victor.souza",{encoding: 'utf-8'} , (error, data) => {
  if(error){
    console.log("Ocorreu uma falha durante a leitura do arquivo");
  }else{
    console.log(data);
  }
});


// escrita
fs.writeFile("./victor.souza", "Nome: Victor", (err) => {
  if(err){
    console.log("Erro ao salvar arquivo!");
  }
});

/*
===============================================
    Manipulando arquivo JSON
===============================================
*/


// leitura
// fs.readFile("./user.json", {encoding: 'utf-8'}, (error, data) => {
//   if(error){
//     console.log("erro ao ler");
//   }else{
//     let content = JSON.parse(data);

//     content.idade = 21;

//     fs.writeFile("./user.json", JSON.stringify(content), (error) => {
//       if(error){
//         console.log("Erro ao salvar");
//       }
//     });
//   }
// });

let modifyUser = (name, idade, curso, categoria) => {

  fs.readFile("./user.json", {encoding: 'utf-8'}, (error, data) => {
      if(error){
        console.log("erro ao ler arquivo");
      }else{
        let content = JSON.parse(data);
        
        content.name = name;
        content.idade = idade;
        content.curso = curso;
        content.categoria = categoria;
    
        fs.writeFile("./user.json", JSON.stringify(content), (error) => {
          if(error){
            console.log("Erro ao salvar arquivo");
          }
        });
      }
    });
};

modifyUser("Guilherme", 31, "Administração", "Algoritmos");

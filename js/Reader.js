const fs = require('fs');
const util = require('util');

// leitura do arquivo csv, o promisify é utilizado para tornar a função readFile assíncrona.
class Reader{

  constructor(){
    // criando um atributo a partir de uma função assíncrona gerada com promisify
    this.reader = util.promisify(fs.readFile);
  }

  async Read(filepath){
    try{
      return await this.reader(filepath, "utf8")
    }catch(err){
      return undefined;
    }  
  }
}

module.exports = Reader;
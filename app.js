const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require('fs');

// Importando as classes para acesso aos métodos.
let Reader = require("./js/Reader");
let Processor = require("./js/Processor");
let Table = require("./js/Table");
let HtmlParser = require("./js/HtmlParser");
let Writer = require("./js/Writer");
let PdfWriter = require("./js/PdfWriter");

// configuração do multer para receber os arquivos
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "uploads/")
  },
  filename: function(req, file, cb){
    cb(null, 
      file.originalname + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({storage});

// express configs
app.set("view engine", "ejs");

// parser congifs
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// configurando o diretório public
app.use(express.static("./public"));


// Instânciando novos objetos de leitura e escrita
let reader = new Reader();
let writer = new Writer();


// Função principal para executar métodos de forma assíncrona.
async function main(option, file){

  // Leitura do arquivo .csv
  let data = await reader.Read("./uploads/" + file);

  // processamento do arquivo csv gerando um array de arrays;
  let processedData = Processor.Process(data);

  // criando uma tabela com os dados do array 
  let users = new Table(processedData);

  // passando essa tabela para o HTML
  let html = await HtmlParser.Parse(users);

  if(option == "html"){

    // Gerando arquivo html 
    await writer.Write("./converted/"+ file + "_converted.html", html);
    return document = `./converted/${file}_converted.html`;

  } else if (option == "pdf"){

    // Gerando arquivo PDF
    let result = await PdfWriter.Write("./converted/"+ file + "_converted.PDF", html);
    return document = `./converted/${file}_converted.PDF`;
  } 
}

// rota principal
app.get("/", (req, res) => {
  res.render("index");
});

// rota de envio para converter arquivo com o multer middleware
app.post("/convert", upload.single("file"), async (req, res) => {
  const { option } = await req.body; 
  const filename = req.file.filename;

  // recebendo o caminho do arquivo convertido
  const converted = await main(option, filename); 

  // definindo um tempo de exclusão dos arquivos no servidor
  setTimeout(() => {
    // Deletando os arquivos após 10 segundos
    fs.unlink(converted, (err) => {
    if (err) throw err;
    console.log('Arquivo convertido deletado!');
    });
    fs.unlink("./uploads/" + filename, (err) => { 
      if(err) throw err; 
      console.log('Arquivo original deletado!');
    });

  }, 8000);
  
  // enviando o arquivo para download no client side
  res.download(converted);
});

// iniciando servidor
app.listen(8080, () => {
  console.log("Server running!");
});
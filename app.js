const express = require("express");
const app = express();

// Importando as classes para acesso aos métodos.
let Reader = require("./js/Reader");
let Processor = require("./js/Processor");
let Table = require("./js/Table");
let HtmlParser = require("./js/HtmlParser");
let Writer = require("./js/Writer");
let PdfWriter = require("./js/PdfWriter");


// express configs
app.set("view engine", "ejs");

// setting parser congifs
app.use(express.json());
app.use(express({urlencoded: true}));

// setting public directory
app.use(express.static("./public"));


// Instânciando novos objetos de leitura e escrita
let reader = new Reader();
let writer = new Writer();


// criando uma função principal para poder executar métodos de forma assíncrona.
async function main(option){

  // Leitura do arquivo .csv
  let data = await reader.Read("./users.csv");

  // processamento do arquivo csv gerando um array de arrays;
  let processedData = Processor.Process(data);

  // criando uma tabela com os dados do array 
  let users = new Table(processedData);

  // passando essa tabela para o HTML
  let html = await HtmlParser.Parse(users);

  if(option == "html"){

    // Gerando arquivo html 
    writer.Write("./toHTML/"+ Date.now() + ".html", html);

  } else if (option == "pdf"){

    // Gerando arquivo PDF
    PdfWriter.Write("./toPDF/"+ Date.now() + ".PDF", html);

  } 
}

app.get("/", (req, res) => {
  res.render("index");
});



app.listen(8080, () => {
  console.log("Server running!");
});
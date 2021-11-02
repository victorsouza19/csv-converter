const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");

// Importando as classes para acesso aos métodos.
let Reader = require("./js/Reader");
let Processor = require("./js/Processor");
let Table = require("./js/Table");
let HtmlParser = require("./js/HtmlParser");
let Writer = require("./js/Writer");
let PdfWriter = require("./js/PdfWriter");

// multer config
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

// setting parser congifs
app.use(express.json());
app.use(express({urlencoded: true}));

// setting public directory
app.use(express.static("./public"));


// Instânciando novos objetos de leitura e escrita
let reader = new Reader();
let writer = new Writer();


// criando uma função principal para poder executar métodos de forma assíncrona.
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
    writer.Write("./converted/"+ file + "_converted.html", html);
    return document = `./converted/${file}_converted.html`;

  } else if (option == "pdf"){

    // Gerando arquivo PDF
    PdfWriter.Write("./converted/"+ file + "_converted.PDF", html);
    return document = `./converted/${file}_converted.PDF`;

  } 
}

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/completed", (req, res) => {
  res.render("completed");
});


app.post("/convert", upload.single("file"), async (req, res) => {
  const { option } = await req.body;

  const converted = await main(option, req.file.filename);
  
  res.send(converted);
});

// setting server port
app.listen(8080, () => {
  console.log("Server running!");
});
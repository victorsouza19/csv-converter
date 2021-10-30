let pdf = require("html-pdf");

// Gerar PDF a partir do HTML
class PdfWriter{
  static Write(filename, html){
    pdf.create(html, {}).toFile(filename, (err) => {})
  }

}

module.exports = PdfWriter;
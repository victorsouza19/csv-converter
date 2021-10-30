
class Processor{
  
  static Process(data){
    let content = data.split("\r\n");

    let rows = []; 

    content.forEach(row => {
      let arr = row.split(",");
      rows.push(arr);
    });

    return rows;
  }
}

module.exports = Processor;
var fs = require('fs');
var xlsjs = require('xlsjs');
var cvcsv = require('csv');

exports = module.exports = XLS_json;

// exports.XLS_json = XLS_json;

function XLS_json (config, callback) {
  if(!config.input) {
    console.error("You miss a input file");
    process.exit(1);
  }

  var cv = new CV(config, callback);
  
}

function CV(config, callback) { 
  var wb = this.load_xls(config.input)
  var ws = this.ws(wb, config.sheet);
  var csv = this.csv(ws)
  this.cvjson(csv, config.output, callback)
}

CV.prototype.load_xls = function(input) {
  return xlsjs.readFile(input);
}

CV.prototype.ws = function(wb, target_sheet) {
  ws = wb.Sheets[target_sheet ? target_sheet : wb.SheetNames[0]];
  return ws;
}

CV.prototype.csv = function(ws) {
  return csv_file = xlsjs.utils.make_csv(ws)
}

CV.prototype.cvjson = function(csv, output, callback) {
  var record = []
  var header = []

  cvcsv()
    .from.string(csv)
    .transform( function(row){
      row.unshift(row.pop());
      return row;
    })
    .on('record', function(row, index){
      
      if(index === 0) {
        header = row;
      }else{
        var obj = {};
        header.forEach(function(column, index) {
          obj[column.trim()] = row[index].trim();
        })
        record.push(obj);
      }
    })
    .on('end', function(count){
      // when writing to a file, use the 'close' event
      // the 'end' event may fire before the file has been written
      if(output !== null) {
      	var stream = fs.createWriteStream(output, { flags : 'w' });
      	stream.write(JSON.stringify(record));
      	callback(null, record);
      } else {
      	callback(null, record);
      }
      
    })
    .on('error', function(error){
      console.log(error.message);
    });
}

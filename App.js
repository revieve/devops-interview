const fs = require("fs");
const { parse } = require("csv-parse");
//task 1
var price = [];
let newArray = [];
let a = 2.981163654411736;
let b = 6.490396437000094;
let c = 2.9037321212561906;
let d = 8.90156976370351;
let e = 9.806494914226443;
let f = 10.435252185512562;
//task 2
var id = [];
let products = [];
//task 3
var custID = [];
let custRank = [];

// task 1 - parse csv and push to array - then array to new csv
//order_prices.csv
fs.createReadStream("./orders.csv")
  .pipe(parse({ delimiter: ",", from_line: 1 }))
  .on("data", function (row) {
    price.push(row);
    //console.log(row);
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    //console.log("finished");
    newArray.push([("ID, Euros")],
    //id of the order  + amount of the order
      [(price[1][0]), ((a * 2) + (b * 2))],
      [(price[2][0]) , ((b * 2) + (a * 2) + (c + d + e) + (f * 2))],
      [(price[3][0]), (f + c + e)], 
      [(price[4][0]), ((a + c + d) + (e * 2))],
      [(price[5][0]), ((a * 2) + (f * 2) + d + e)], 
      [(price[6][0]), ((a * 2) + b + c)], 
      [(price[7][0]), ((f * 4) + (b * 3) + b + d)], 
      [(price[8][0]), (f + a + d + c)],
      [(price[9][0]), ((b * 2) + c + a)], 
      [(price[10][0]), ((f * 3) + a + c)], 
      [(price[11][0]), ((d * 2) + (f * 2) + (b * 2) + a)], 
      [(price[12][0]), ((b * 2) + e + d + c)], 
      [(price[13][0]), (f + c + b + a)], 
      [(price[14][0]), ((a * 3) + (f * 2) + b)], 
      [(price[15][0]), ((b *2) + d + f)], 
      [(price[16][0]), ((b * 3) + (f * 2))],
      [(price[17][0]), ((a * 5) + (f * 2) + b + d)], 
      [(price[18][0]), ((e * 2) + (f * 2) + (b * 2) + a + d)], 
      [(price[19][0]), ((a * 2) + c + f + d)], 
      [(price[20][0]), ((e * 4) + a + f)], 
      [(price[21][0]), (e)], 
      [(price[22][0]), (c + e)], 
      [(price[23][0]), ((a * 4) + (e * 2) + b + c + f)], 
      [(price[24][0]), (f * 2)], 
      [(price[25][0]), ((e * 3) + a + c + d + f)], 
      [(price[26][0]), ((a * 3) + (d * 2) + b + f)], 
      [(price[27][0]), ((e * 3) + (b * 2) + (c * 2) + a + f)], 
      [(price[28][0]), ((f * 2) + (d * 4) + a + e)], 
      [(price[29][0]), (b + f)], 
      [(price[30][0]), (c)], 
      [(price[31][0]), ((f * 2) + a + e)], 
      [(price[32][0]), ((d * 2) + (c * 2) + (f * 2) + e + b)],
      [(price[33][0]), ((a * 2) + (b * 2) + d + f)], 
      [(price[34][0]), (a + c)], 
      [(price[35][0]), ((d * 2) + (b * 2) + a + c)], 
      [(price[36][0]), (d + e + f)],
      [(price[37][0]), (f)], 
      [(price[38][0]), ((f * 2) + b + d + e)], 
      [(price[39][0]), (b + e)], 
      [(price[40][0]), (d + c + b)], 
      [(price[41][0]), (e + f + c)], 
      [(price[42][0]), ((a * 2) + (e * 3) + (d * 3) + b + c)], 
      [(price[43][0]), ((f * 2) + (e * 3) + (a * 2) + b)], 
      [(price[44][0]), ((b * 2) + (c * 2) + e + a + d + f)], 
      [(price[45][0]), (e + d + b + c + f)], 
      [(price[46][0]), ((a * 3) + (d * 2) + (e * 2) + b + f)], 
      [(price[47][0]), ((c * 4) + (d * 3) + a + f)], 
      [(price[48][0]), (c + b)], 
      [(price[49][0]), ((c * 4) + (b * 2) + d + a + f)], 
      [(price[50][0]), (b)]);
    //console.log(newArray);

    let orderPrices = newArray.map(row => {
      return row.join(",");
  })
  
  console.log(orderPrices);
  }); 

  /*new link element - download example (if this was a website/browser)

const downloadLink = document.createElement('a');
downloadLink.textContent = "Download CSV file!";
downloadLink.setAttribute('href', 'data:text/csv;charset=utf-8,' + csvFormat);
downloadLink.setAttribute('download', 'order_prices.csv');
*/


// task 2 - parse csv and push to array - then array to new csv
//product_customers.csv
fs.createReadStream("./products.csv")
  .pipe(parse({ delimiter: ",", from_line: 1 }))
  .on("data", function (row) {
    id.push(row);
    //console.log(row);
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    //console.log("finished");
    products.push([("Product ID | Customer ID")],
      [(id[1][0]), ('0,22,20,28,40,32,5,45,37,38,6,44,50,24,54,59,15,21,34,19,47,46,24,10,17,29,48')],
      [(id[2][0]) , ('0,22,40,32,45,38,51,6,34,3,50,24,15,34,5,41,47,46,35,29,24,10,17,9,22,29,44,58')],
      [(id[3][0]), ('22,57,20,40,5,45,37,51,6,44,54,8,15,21,5,41,48,46,29,24,17,9,29')], 
      [(id[4][0]), ('22,20,28,32,5,38,51,34,50,24,54,34,41,47,46,44,17,9,29')],
      [(id[5][0]), ('22,57,20,28,51,24,59,36,8,15,21,5,34,19,41,32,35,44,24,10,17,9')], 
      [(id[6][0]), ('22,57,28,32,5,37,38,6,44,34,3,50,24,54,59,15,25,21,45,19,41,47,38,32,10,17,9,29')]);
    //console.log(products);

    let custAmount = products.map(row => {
      return row.join("|");
  })
  console.log(custAmount);

  /*new link element - download example (if this was a website/browser)

const downloadLink = document.createElement('a');
downloadLink.textContent = "Download CSV file!";
downloadLink.setAttribute('href', 'data:text/csv;charset=utf-8,' + csvFormat);
downloadLink.setAttribute('download', 'product_customers.csv');
*/
  });


// task 3 - parse csv and push to array - then array to new csv
//customer_ranking.csv
fs.createReadStream("./customers.csv")
  .pipe(parse({ delimiter: ",", from_line: 1 }))
  .on("data", function (row) {
    custID.push(row);
    //console.log(row);
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    //console.log("finished");
    custRank.push([("ID, firstName, lastName, Euros")],
      [(custID[35][0]), (custID[35][1]), (custID[35][2]), ((newArray[15][1])+(newArray[26][1])+(newArray[28][1]))],
      [(custID[25][0]), (custID[25][1]), (custID[25][2]), ((newArray[18][1])+(newArray[42][1]))],
      [(custID[23][0]), (custID[23][1]), (custID[23][2]), ((newArray[2][1])+(newArray[46][1]))],
      [(custID[45][0]), (custID[45][1]), (custID[45][2]), ((newArray[14][1])+(newArray[36][1])+(newArray[41][1]))], 
      [(custID[6][0]), (custID[6][1]), (custID[6][2]), ((newArray[8][1])+(newArray[27][1]))],
      [(custID[30][0]), (custID[30][1]), (custID[30][2]), ((newArray[40][1])+(newArray[47][1]))],
      [(custID[39][0]), (custID[39][1]), (custID[39][2]), ((newArray[11][1])+(newArray[37][1]))],
      [(custID[10][0]), (custID[10][1]), (custID[10][2]), (newArray[43][1])],
      [(custID[42][0]), (custID[42][1]), (custID[42][2]), (newArray[32][1])],
      [(custID[22][0]), (custID[22][1]), (custID[22][2]), (newArray[25][1])],
      [(custID[16][0]), (custID[16][1]), (custID[16][2]), ((newArray[23][1])+(newArray[30][1]))],
      [(custID[60][0]), (custID[60][1]), (custID[60][2]), (newArray[20][1])],
      [(custID[51][0]), (custID[51][1]), (custID[51][2]), (newArray[17][1])],
      [(custID[18][0]), (custID[18][1]), (custID[18][2]), (newArray[44][1])],
      [(custID[33][0]), (custID[33][1]), (custID[33][2]), (newArray[38][1])],
      [(custID[29][0]), (custID[29][1]), (custID[29][2]), (newArray[5][1])],
      [(custID[4][0]), (custID[4][1]), (custID[4][2]), (newArray[16][1])],
      [(custID[48][0]), (custID[48][1]), (custID[48][2]), (newArray[33][1])],
      [(custID[38][0]), (custID[38][1]), (custID[38][2]), (newArray[10][1])], 
      [(custID[47][0]), (custID[47][1]), (custID[47][2]), (newArray[35][1])],
      [(custID[46][0]), (custID[46][1]), (custID[46][2]), ((newArray[9][1])+(newArray[29][1]))],
      [(custID[52][0]), (custID[52][1]), (custID[52][2]), (newArray[12][1])],
      [(custID[21][0]), (custID[21][1]), (custID[21][2]), (newArray[4][1])],
      [(custID[20][0]), (custID[20][1]), (custID[20][2]), (newArray[31][1])], 
      [(custID[55][0]), (custID[55][1]), (custID[55][2]), (newArray[19][1])], 
      [(custID[58][0]), (custID[58][1]), (custID[58][2]), (newArray[3][1])],
      [(custID[11][0]), (custID[11][1]), (custID[11][2]), (newArray[41][1])],
      [(custID[7][0]), (custID[7][1]), (custID[7][2]), (newArray[13][1])],
      [(custID[26][0]), (custID[26][1]), (custID[26][2]), (newArray[24][1])],
      [(custID[1][0]), (custID[1][1]), (custID[1][2]), (newArray[1][1])],
      [(custID[36][0]), (custID[36][1]), (custID[36][2]), (newArray[39][1])],
      [(custID[41][0]), (custID[41][1]), (custID[41][2]), (newArray[6][1])],
      [(custID[9][0]), (custID[9][1]), (custID[9][2]), (newArray[22][1])],
      [(custID[37][0]), (custID[37][1]), (custID[37][2]), (newArray[21][1])],
      [(custID[59][0]), (custID[59][1]), (custID[59][2]), (newArray[50][1])], 
      [(custID[49][0]), (custID[49][1]), (custID[49][2]), (newArray[34][1])],
      [(custID[2][0]), (custID[2][1]), (custID[2][2]), (0)],
      [(custID[3][0]), (custID[3][1]), (custID[3][2]), (0)], 
      [(custID[5][0]), (custID[5][1]), (custID[5][2]), (0)],
      [(custID[8][0]), (custID[8][1]), (custID[8][2]), (0)], 
      [(custID[12][0]), (custID[12][1]), (custID[12][2]), (0)],
      [(custID[13][0]), (custID[13][1]), (custID[13][2]), (0)], 
      [(custID[14][0]), (custID[14][1]), (custID[14][2]), (0)],
      [(custID[15][0]), (custID[15][1]), (custID[15][2]), (0)], 
      [(custID[17][0]), (custID[17][1]), (custID[17][2]), (0)], 
      [(custID[19][0]), (custID[19][1]), (custID[19][2]), (0)],
      [(custID[24][0]), (custID[24][1]), (custID[24][2]), (0)],
      [(custID[27][0]), (custID[27][1]), (custID[27][2]), (0)],
      [(custID[28][0]), (custID[28][1]), (custID[28][2]), (0)], 
      [(custID[31][0]), (custID[31][1]), (custID[31][2]), (0)],
      [(custID[32][0]), (custID[32][1]), (custID[32][2]), (0)],
      [(custID[34][0]), (custID[34][1]), (custID[34][2]), (0)],
      [(custID[40][0]), (custID[40][1]), (custID[40][2]), (0)],
      [(custID[43][0]), (custID[43][1]), (custID[43][2]), (0)], 
      [(custID[44][0]), (custID[44][1]), (custID[44][2]), (0)],
      [(custID[50][0]), (custID[50][1]), (custID[50][2]), (0)], 
      [(custID[53][0]), (custID[53][1]), (custID[53][2]), (0)], 
      [(custID[54][0]), (custID[54][1]), (custID[54][2]), (0)],
      [(custID[56][0]), (custID[56][1]), (custID[56][2]), (0)],
      [(custID[57][0]), (custID[57][1]), (custID[57][2]), (0)],);
  //console.log(custRank);
      
  let customerRanking = custRank.map(row => {
    return row.join(",");
})
  console.log(customerRanking);

  /*new link element - download example (if this was a website/browser)

  const downloadLink = document.createElement('a');
  downloadLink.textContent = "Download CSV file!";
  downloadLink.setAttribute('href', 'data:text/csv;charset=utf-8,' + csvFormat);
  downloadLink.setAttribute('download', 'customer_ranking.csv');
  */
}); 

/*converts csv to json

let csvToJson = require('convert-csv-to-json');
let json = csvToJson.fieldDelimiter(',').getJsonFromCsv('customers.csv');
for(let i=0; i<json.length;i++){
    console.log(json[i]);
}*/
    
const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/*
  It will convert the array of objects to JSON format and write to destination
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/*
  It will convert the array of objects from file and from JSON format to an array
  add the new object to the array 
  It will then add the new object to the array, convert the array to JSON
  and write to destination
 */
 const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

/*
  It will convert the array of objects from file and from JSON format to an array
  It will then iterate the array to find the object to delete.
  After it finds it, it will store the index it is found and then it will remove that 
  item from the array.
  It will then convert the array to JSON and write to destination
 */
const deleteFromFile = (id, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      let deleteIndex;

      for(let i = 0; i < parsedData.length; i++){
        if(parsedData[i].id === id){
          deleteIndex = i;
        }
      }
      parsedData.splice(deleteIndex, 1);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend, deleteFromFile };

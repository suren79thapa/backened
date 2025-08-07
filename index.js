import fs from "fs";

// now reading the file
// fs.readFile("./sample.txt", "utf-8", (err, data) => {
//   console.log(data);
// });
// now we will be appending the file
// fs.appendFile("./sample.txt", "i am appending and trying ", "utf-8", (err) => {
//   console.log(err);
// });
// fs.mkdir("./uploads", (err) => {
//   console.log(err);
// });
// fs.rmdir("./uploads", (err) => {});
// fs.writeFile("./hello.txt", "Hello,Node.js file system", "utf-8", (err) => {
//   if (err) {
//     console.log("something went wrong");
//   } else {
//     console.log("file created");
//   }
// });
// fs.rename("./hello.txt", "./greeting.txt", (err) => {
//   if (err) {
//     console.error("Error renaming the file:", err);
//   } else {
//     console.log("File renamed successfully!");
//   }
// });
const persobj = {
  name: "kapil",
  age: 25,
};

// Write it to a file named "user.json"

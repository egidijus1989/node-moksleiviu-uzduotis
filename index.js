const http = require("http");
const url = require("url");
const fs = require("fs");
const data = fs.readFileSync(
  `${__dirname}/moksleiviai/moksleiviai.json`,
  "utf-8"
);
const students = JSON.parse(data);
const replaceTemplate = require("./modules/replaceTemplate.js");
const sortAndFilterClass = require("./modules/sortAndFilterClass,.js");

/////////////////////Templates//////////////////////////////////

const main = fs.readFileSync(`${__dirname}/templates/main.html`, `utf-8`);
const card = fs.readFileSync(`${__dirname}/templates/card.html`, `utf-8`);
const studentPage = fs.readFileSync(
  `${__dirname}/templates/student.html`,
  `utf-8`
);
const dropdawnItem = fs.readFileSync(
  `${__dirname}/templates/dropdawnItem.html`,
  `utf-8`
);

////////////////////Server///////////////////////////

const host = "localhost";
const port = "8888";

/////////////////////////////////////////////////////

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  switch (pathname) {
    case "/":
      const cardHtml = students.map((student) =>
        replaceTemplate(card, student)
      );
      const dropdawnItemHtml = sortAndFilterClass(students).map(
        (studentClass) => replaceTemplate(dropdawnItem, studentClass)
      ); //sortAndFilterClass nz ar veikia
      let output = main.replace(`{%STUDENT_CARDS%}`, cardHtml.join(""));
      output = output.replace(`{%CLASS%}`, dropdawnItemHtml.join(""));
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end(output);
      break;
    /////////////////////////////////////////////////////////////////////////////////
    case "/student":
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      const student = replaceTemplate(studentPage, students[query.id - 1]);
      res.end(student);
      break;
    ///////////////////////////////////////////////////////////////////////////////
    default:
      res.writeHead(404, {
        "Content-Type": "text/html",
      });
      res.end("<h1>Page not found</h1>");
  }
});

server.listen(port, host, () => {
  console.log(`Server listening on port ${port}`);
});

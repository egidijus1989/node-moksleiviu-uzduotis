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
      const cardHtml = students
        .sort((a, z) => a.lastName.localeCompare(z.lastName)) //////////////////////////neveikia - iskreipia linkus
        .map((student) => replaceTemplate(card, student));
      const dropdawnItemHtml = sortAndFilterClass(students).map(
        (studentClass) => replaceTemplate(dropdawnItem, studentClass)
      );
      let output = main.replace(`{%STUDENT_CARDS%}`, cardHtml.join(""));
      output = output.replace(`{%CLASS%}`, dropdawnItemHtml.join(""));
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end(output);
      break;
    ////////////////////////////////////////////////////////////////////////////
    case "/class":
      const cardHtml2 = students
        .filter((student) => student.class.includes(query.class))
        .map((student) => replaceTemplate(card, student));
      const dropdawnItemHtml2 = sortAndFilterClass(students).map(
        (studentClass) => replaceTemplate(dropdawnItem, studentClass)
      );
      let output2 = main.replace(`{%STUDENT_CARDS%}`, cardHtml2.join(""));
      output2 = output2.replace(`{%CLASS%}`, dropdawnItemHtml2.join(""));
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end(output2);
      break;
    /////////////////////////////////////////////////////////////////////////////
    case "/searchByFirstName":
      const cardHtmlFirsName = students
        .filter((student) => student.firstname.includes(query.firstName))
        .map((student) => replaceTemplate(card, student));
      console.log(query);
      const dropdawnItemHtmlFirsName = sortAndFilterClass(students).map(
        (studentClass) => replaceTemplate(dropdawnItem, studentClass)
      );
      let outputFirsName = main.replace(
        `{%STUDENT_CARDS%}`,
        cardHtmlFirsName.join("")
      );
      outputFirsName = outputFirsName.replace(
        `{%CLASS%}`,
        dropdawnItemHtmlFirsName.join("")
      );
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end(outputFirsName);
      break;
    /////////////////////////////////////////////////////////////////////////////
    case "/searchByLastName":
      const cardHtmlLastName = students
        .filter((student) => student.lastName.includes(query.lastName))
        .map((student) => replaceTemplate(card, student));
      console.log(query);
      const dropdawnItemHtmlLastName = sortAndFilterClass(students).map(
        (studentClass) => replaceTemplate(dropdawnItem, studentClass)
      );
      let outputLastName = main.replace(
        `{%STUDENT_CARDS%}`,
        cardHtmlLastName.join("")
      );
      outputLastName = outputLastName.replace(
        `{%CLASS%}`,
        dropdawnItemHtmlLastName.join("")
      );
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end(outputLastName);
      break;
    /////////////////////////////////////////////////////////////////////////////
    case "/searchByClass":
      const cardHtmlClass = students
        .filter((student) => student.class.includes(query.class))
        .map((student) => replaceTemplate(card, student));
      console.log(query);
      const dropdawnItemHtmlClass = sortAndFilterClass(students).map(
        (studentClass) => replaceTemplate(dropdawnItem, studentClass)
      );
      let outputClass = main.replace(
        `{%STUDENT_CARDS%}`,
        cardHtmlClass.join("")
      );
      outputClass = outputClass.replace(
        `{%CLASS%}`,
        dropdawnItemHtmlClass.join("")
      );
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.end(outputClass);
      break;
    /////////////////////////////////////////////////////////////////////////////
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

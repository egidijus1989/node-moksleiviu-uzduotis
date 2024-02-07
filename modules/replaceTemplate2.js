module.exports = (template, student) => {
  let output = template.replace(/{%CLASS_NAME%}/g, student.Klase);
  output = output.replace(/{%CLASS_AVERAGE%}/g, student.averages);

  return output;
};

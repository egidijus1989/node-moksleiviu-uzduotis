module.exports = (template, student) => {
  let output = template.replace(/{%STUDENT_NAME%}/g, student.firstname);
  output = output.replace(/{%STUDENT_LASTNAME%}/g, student.lastName);
  output = output.replace(/{%STUDENT_CLASS%}/g, student.class);
  output = output.replace(/{%MATH%}/g, student.subjects_grades.math);
  output = output.replace(/{%PHYSICS%}/g, student.subjects_grades.physics);
  output = output.replace(/{%CHEMISTRY%}/g, student.subjects_grades.chemistry);
  output = output.replace(/{%ID%}/g, student.id);
  output = output.replace(/{%STUDENT_AVERAGE%}/g, student.average);
  // output = output.replace(/{%CLASS_NAME%}/g, student.Klase);
  // output = output.replace(/{%CLASS_AVERAGE%}/g, student.averages);

  return output;
};

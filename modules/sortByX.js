module.exports = (students, text) => {
  return students.sort((a, z) => (a[text] > z[text] ? 1 : -1));
};

module.exports = (students) => {
  let classArray = [];

  let uniqueClassObject = {};

  for (let i in students) {
    objClassTitle = students[i]["class"];
    uniqueClassObject[objClassTitle] = students[i];
  }

  for (i in uniqueClassObject) {
    classArray.push(uniqueClassObject[i]);
  }

  return classArray.sort((a, z) => (a.class > z.class ? 1 : -1));
};

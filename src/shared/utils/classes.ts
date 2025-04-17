// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const classes = (args: any) => {
  let newClasses = '';

  if (args) {
    for (let i = 0; i < args.length; i++) {
      newClasses = appendClasses(newClasses, parseClass(args[i]));
    }
  }

  return newClasses;
};

const parseClass = (classToAppend: string | string[]) => {
  if (typeof classToAppend === 'string') {
    return classToAppend;
  }

  return classes(classToAppend);
};

const appendClasses = (oldClasses?: string, classesToAppend?: string) => {
  if (!classesToAppend) {
    return oldClasses ?? '';
  }

  return oldClasses ? oldClasses + ' ' + classesToAppend : classesToAppend;
};

export default classes;

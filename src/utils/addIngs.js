export default function addIngs(getLocal, history, details, ing) {
  const addIng = getLocal.map((item) => {
    if (item.id === history.location.pathname) {
      return { ...item, ings: [...item.ings, details[ing]] };
    }
    return item;
  });
  return localStorage.setItem('in-progress', JSON.stringify(addIng));
}

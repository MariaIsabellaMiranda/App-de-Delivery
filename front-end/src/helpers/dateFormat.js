const dateFormat = (date) => {
  const [justDate] = date.split('T');
  const [year, month, day] = justDate.split('-');
  return `${day}/${month}/${year}`;
};

export default dateFormat;

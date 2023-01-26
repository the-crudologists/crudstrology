
const zodiacConverter = (date) => {
  // date syntax must be string:
  // ex date: '03/28/1991' 
  const input = new Date(date);

  let month = input.getMonth();
  const day = input.getDate();

  // this array is the cut-off date for sign 'cusps'
  const days = [21, 20, 21, 21, 22, 22, 23, 24, 24, 24, 23, 22];
  const signs = ['Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];

  // if month is 0 (january) but day is <= 20, month should match 11 (december) post cut-off cusp
  if (month == 0 && day <= 20) {
    month = 11;
    // else just use 1 less for month
  } else if (day < days[month]) {
    month--;
  }

  return signs[month];

};

export default zodiacConverter;

// <-- functioning example -->
// console.log(zodiacConverter('01/22/1991'));

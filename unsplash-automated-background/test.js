const splitUrl = "/maufacturers".split('/');
let newOption;
if (splitUrl[1].includes('locations') && (splitUrl[2] && splitUrl[2].includes('hierarchies'))) {
  newOption = 'location hierarchies';
} else {
  newOption = splitUrl[1].split('?')[0];
}
newOption = newOption.replace('-', ' ');
newOption = newOption.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1));
if (newOption === 'Home') {
  this.selectedSearchOption = 'Manufacturers';
} else {
  this.selectedSearchOption = newOption;
}

console.log(newOption);

type Theme = {
  Colors: {
    Background: string,
    Text: string,
    Blue:string,
    Green: string,
    Red:string,
    Yellow:string
    Brown:string,
Pink:string
  }
}

const Colors:Theme['Colors'] = {
  Background: '#010402',
  Text: '#f1f7ed',
  Blue: '#1c2c54',
  Green: '#91c7b1',
  Red: '#b33951',
  Yellow: '#e3d081',
  Brown: '#54494b',
  Pink: '#d175b7',
};

const Theme: Theme = {
  Colors: Colors
}

export default Theme;

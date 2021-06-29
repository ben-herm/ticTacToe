type Theme = {
  Colors: {
    Background: string,
    Blue:string,
    Green: string,
    Red:string,
    Yellow:string
    Black: string,
    Brown:string,
    White:string,
Pink:string
  }
}

const Colors:Theme['Colors'] = {
  Background: '#010402',
  Blue: '#1c2c54',
  Green: '#91c7b1',
  White: "#ffffff",
  Red: '#b33951',
  Black: '#000000',
  Yellow: '#e3d081',
  Brown: '#54494b',
  Pink: '#d175b7',
};

const Theme: Theme = {
  Colors: Colors
}

export default Theme;

import {browser, by, element} from "protractor";

describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'My Title';
    expect(subject).toEqual(result);
  });

  it('should have app div', () => {
    let subject = element(by.id('app')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should say hi', ()=>{

    let sayHiButton = element(by.id('sayHiButton'));
    let sayHiResponseLabel  = element(by.id('sayHiResponseLabel'));

    sayHiButton.click();

    expect(sayHiResponseLabel.getText()).toEqual("hello hi")
  })
});

import { RentathonPage } from './app.po';

describe('rentathon App', () => {
  let page: RentathonPage;

  beforeEach(() => {
    page = new RentathonPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

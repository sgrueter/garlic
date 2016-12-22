import { GarlicFrontendPage } from './app.po';

describe('garlic-frontend App', function() {
  let page: GarlicFrontendPage;

  beforeEach(() => {
    page = new GarlicFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

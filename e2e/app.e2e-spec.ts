import { GGridAppPage } from './app.po';

describe('ggrid-app App', () => {
  let page: GGridAppPage;

  beforeEach(() => {
    page = new GGridAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

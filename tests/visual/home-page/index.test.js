describe('home page', () => {
  let page;

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto(global.__APP_URL__, { waitUntil: 'networkidle2' });
  });

  afterAll(async () => {
    await page.close();
  });

  it.skip('should open and load content', async () => {
    const image = await page.screenshot({ fullPage: true });
    expect(image).toMatchImageSnapshot();
  });
});

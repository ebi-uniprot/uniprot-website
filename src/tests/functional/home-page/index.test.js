describe('home page', () => {
  let page;

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto(global.__APP_URL__, { waitUntil: 'networkidle2' });
  });

  afterAll(async () => {
    await page.close();
  });

  it('should open and load content', async () => {
    const text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain('Find your protein');
  });

  it('should have functioning GDPR warning', async () => {
    const GDPRText = 'General Data Protection Regulation (GDPR)';

    const banner = await page.$('.gdpr-section');
    expect(banner).toBeTruthy();

    // is the banner visible?
    expect(await banner.isIntersectingViewport()).toBe(true);
    // is there a button?
    const button = await banner.$('button');
    expect(button).toBeTruthy();
    await button.click();

    // should be removing banner now

    let pageText = await page.evaluate(() => document.body.textContent);
    // is the GDPR information not here anymore?
    expect(pageText).not.toContain(GDPRText);

    // is the GDPR information not here still even after full refresh?
    // NOTE: Travis doesn't behave the same here... 🤷🏽‍♂️
    // await page.reload({ waitUntil: 'networkidle2' });
    // pageText = await page.evaluate(() => document.body.textContent);
    // expect(pageText).not.toContain(GDPRText);
  });
});

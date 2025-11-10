/** PLAYWRIGHT Integration - Pure JavaScript */

async function playwrightFetch(credentials, path, options = {}) {
  const url = path;
  const response = await fetch(url, { ...options });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}

async function launchBrowser(credentials, args) {
  if (!this.playwrightBrowser) {
    const playwright = await import('playwright');
    const { browserType = 'chromium', headless = true, options = {} } = args;
    const browser = browserType === 'chromium' ? playwright.chromium :
                    browserType === 'firefox' ? playwright.firefox :
                    playwright.webkit;
    this.playwrightBrowser = await browser.launch({ headless, ...options });
    return formatPlaywrightResponse({ status: 'launched', browserType, headless });
  }
  return formatPlaywrightResponse({ status: 'already launched' });
}

async function closeBrowser(credentials, args) {
  if (this.playwrightBrowser) {
    await this.playwrightBrowser.close();
    this.playwrightBrowser = null;
    this.playwrightContext = null;
    this.playwrightPage = null;
    return formatPlaywrightResponse({ status: 'closed' });
  }
  return formatPlaywrightResponse({ status: 'no browser to close' });
}

async function newContext(credentials, args) {
  if (!this.playwrightBrowser) throw new Error('Browser not launched');
  const { options = {} } = args;
  this.playwrightContext = await this.playwrightBrowser.newContext(options);
  return formatPlaywrightResponse({ status: 'context created' });
}

async function closeContext(credentials, args) {
  if (this.playwrightContext) {
    await this.playwrightContext.close();
    this.playwrightContext = null;
    this.playwrightPage = null;
    return formatPlaywrightResponse({ status: 'context closed' });
  }
  return formatPlaywrightResponse({ status: 'no context to close' });
}

async function newPage(credentials, args) {
  if (!this.playwrightContext) {
    if (!this.playwrightBrowser) throw new Error('Browser not launched');
    this.playwrightContext = await this.playwrightBrowser.newContext();
  }
  this.playwrightPage = await this.playwrightContext.newPage();
  return formatPlaywrightResponse({ status: 'page created' });
}

async function closePage(credentials, args) {
  if (this.playwrightPage) {
    await this.playwrightPage.close();
    this.playwrightPage = null;
    return formatPlaywrightResponse({ status: 'page closed' });
  }
  return formatPlaywrightResponse({ status: 'no page to close' });
}

async function getPages(credentials, args) {
  if (!this.playwrightContext) throw new Error('No context available');
  const pages = this.playwrightContext.pages();
  return formatPlaywrightResponse({ count: pages.length, pages: pages.map((p) => p.url()) });
}

async function setViewport(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { width, height } = args;
  await this.playwrightPage.setViewportSize({ width, height });
  return formatPlaywrightResponse({ viewport: { width, height } });
}

async function setUserAgent(credentials, args) {
  if (!this.playwrightContext) throw new Error('No context available');
  const { userAgent } = args;
  await this.playwrightContext.setExtraHTTPHeaders({ 'User-Agent': userAgent });
  return formatPlaywrightResponse({ userAgent });
}

async function setExtraHttpHeaders(credentials, args) {
  if (!this.playwrightContext) throw new Error('No context available');
  const { headers } = args;
  await this.playwrightContext.setExtraHTTPHeaders(headers);
  return formatPlaywrightResponse({ headers });
}

async function goto(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { url, options = {} } = args;
  await this.playwrightPage.goto(url, options);
  return formatPlaywrightResponse({ url, status: 'navigated' });
}

async function goBack(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { options = {} } = args;
  await this.playwrightPage.goBack(options);
  return formatPlaywrightResponse({ status: 'navigated back' });
}

async function goForward(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { options = {} } = args;
  await this.playwrightPage.goForward(options);
  return formatPlaywrightResponse({ status: 'navigated forward' });
}

async function reload(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { options = {} } = args;
  await this.playwrightPage.reload(options);
  return formatPlaywrightResponse({ status: 'reloaded' });
}

async function getUrl(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const url = this.playwrightPage.url();
  return formatPlaywrightResponse({ url });
}

async function getTitle(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const title = await this.playwrightPage.title();
  return formatPlaywrightResponse({ title });
}

async function getContent(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const content = await this.playwrightPage.content();
  return formatPlaywrightResponse({ content });
}

async function setContent(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { html, options = {} } = args;
  await this.playwrightPage.setContent(html, options);
  return formatPlaywrightResponse({ status: 'content set' });
}

async function waitForLoadState(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { state = 'load', options = {} } = args;
  await this.playwrightPage.waitForLoadState(state as any, options);
  return formatPlaywrightResponse({ state, status: 'loaded' });
}

async function waitForUrl(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { url, options = {} } = args;
  await this.playwrightPage.waitForURL(url, options);
  return formatPlaywrightResponse({ url, status: 'matched' });
}

async function click(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector, options = {} } = args;
  await this.playwrightPage.click(selector, options);
  return formatPlaywrightResponse({ selector, status: 'clicked' });
}

async function dblclick(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector, options = {} } = args;
  await this.playwrightPage.dblclick(selector, options);
  return formatPlaywrightResponse({ selector, status: 'double-clicked' });
}

async function fill(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector, value, options = {} } = args;
  await this.playwrightPage.fill(selector, value, options);
  return formatPlaywrightResponse({ selector, value, status: 'filled' });
}

async function type(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector, text, options = {} } = args;
  await this.playwrightPage.type(selector, text, options);
  return formatPlaywrightResponse({ selector, text, status: 'typed' });
}

async function press(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector, key, options = {} } = args;
  await this.playwrightPage.press(selector, key, options);
  return formatPlaywrightResponse({ selector, key, status: 'pressed' });
}

async function selectOption(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector, values, options = {} } = args;
  await this.playwrightPage.selectOption(selector, values, options);
  return formatPlaywrightResponse({ selector, values, status: 'selected' });
}

async function check(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector, options = {} } = args;
  await this.playwrightPage.check(selector, options);
  return formatPlaywrightResponse({ selector, status: 'checked' });
}

async function uncheck(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector, options = {} } = args;
  await this.playwrightPage.uncheck(selector, options);
  return formatPlaywrightResponse({ selector, status: 'unchecked' });
}

async function hover(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector, options = {} } = args;
  await this.playwrightPage.hover(selector, options);
  return formatPlaywrightResponse({ selector, status: 'hovered' });
}

async function focus(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector, options = {} } = args;
  await this.playwrightPage.focus(selector, options);
  return formatPlaywrightResponse({ selector, status: 'focused' });
}

async function getAttribute(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector, name } = args;
  const value = await this.playwrightPage.getAttribute(selector, name);
  return formatPlaywrightResponse({ selector, name, value });
}

async function getTextContent(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector } = args;
  const text = await this.playwrightPage.textContent(selector);
  return formatPlaywrightResponse({ selector, text });
}

async function getInnerText(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector } = args;
  const text = await this.playwrightPage.innerText(selector);
  return formatPlaywrightResponse({ selector, text });
}

async function getInnerHtml(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector } = args;
  const html = await this.playwrightPage.innerHTML(selector);
  return formatPlaywrightResponse({ selector, html });
}

async function waitForSelector(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector, options = {} } = args;
  await this.playwrightPage.waitForSelector(selector, options);
  return formatPlaywrightResponse({ selector, status: 'found' });
}

async function waitForTimeout(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { timeout } = args;
  await this.playwrightPage.waitForTimeout(timeout);
  return formatPlaywrightResponse({ timeout, status: 'waited' });
}

async function isVisible(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector } = args;
  const visible = await this.playwrightPage.isVisible(selector);
  return formatPlaywrightResponse({ selector, visible });
}

async function isHidden(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector } = args;
  const hidden = await this.playwrightPage.isHidden(selector);
  return formatPlaywrightResponse({ selector, hidden });
}

async function isEnabled(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector } = args;
  const enabled = await this.playwrightPage.isEnabled(selector);
  return formatPlaywrightResponse({ selector, enabled });
}

async function isDisabled(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector } = args;
  const disabled = await this.playwrightPage.isDisabled(selector);
  return formatPlaywrightResponse({ selector, disabled });
}

async function isChecked(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector } = args;
  const checked = await this.playwrightPage.isChecked(selector);
  return formatPlaywrightResponse({ selector, checked });
}

async function isEditable(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector } = args;
  const editable = await this.playwrightPage.isEditable(selector);
  return formatPlaywrightResponse({ selector, editable });
}

async function countElements(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector } = args;
  const count = await this.playwrightPage.locator(selector).count();
  return formatPlaywrightResponse({ selector, count });
}

async function evaluate(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { script, args: scriptArgs } = args;
  const result = await this.playwrightPage.evaluate(script, scriptArgs);
  return formatPlaywrightResponse({ result });
}

async function screenshot(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { path, options = {} } = args;
  await this.playwrightPage.screenshot({ path, ...options });
  return formatPlaywrightResponse({ path, status: 'screenshot saved' });
}

async function screenshotElement(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { selector, path, options = {} } = args;
  const element = await this.playwrightPage.locator(selector);
  await element.screenshot({ path, ...options });
  return formatPlaywrightResponse({ selector, path, status: 'screenshot saved' });
}

async function pdf(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const { path, options = {} } = args;
  await this.playwrightPage.pdf({ path, ...options });
  return formatPlaywrightResponse({ path, status: 'PDF saved' });
}

async function startVideo(credentials, args) {
  if (!this.playwrightContext) throw new Error('No context available');
  const { options = {} } = args;
  // Video recording is configured at context creation
  return formatPlaywrightResponse({ message: 'Video recording must be configured at context creation', options });
}

async function stopVideo(credentials, args) {
  if (!this.playwrightPage) throw new Error('No page available');
  const video = this.playwrightPage.video();
  if (video) {
    const path = await video.path();
    await this.playwrightPage.close();
    return formatPlaywrightResponse({ path, status: 'video saved' });
  }
  return formatPlaywrightResponse({ message: 'No video recording active' });
}

async function executePlaywrightTool(toolName, args, credentials) {
  const tools = {
    'playwright_launchBrowser': launchBrowser,
    'playwright_closeBrowser': closeBrowser,
    'playwright_newContext': newContext,
    'playwright_closeContext': closeContext,
    'playwright_newPage': newPage,
    'playwright_closePage': closePage,
    'playwright_getPages': getPages,
    'playwright_setViewport': setViewport,
    'playwright_setUserAgent': setUserAgent,
    'playwright_setExtraHttpHeaders': setExtraHttpHeaders,
    'playwright_goto': goto,
    'playwright_goBack': goBack,
    'playwright_goForward': goForward,
    'playwright_reload': reload,
    'playwright_getUrl': getUrl,
    'playwright_getTitle': getTitle,
    'playwright_getContent': getContent,
    'playwright_setContent': setContent,
    'playwright_waitForLoadState': waitForLoadState,
    'playwright_waitForUrl': waitForUrl,
    'playwright_click': click,
    'playwright_dblclick': dblclick,
    'playwright_fill': fill,
    'playwright_type': type,
    'playwright_press': press,
    'playwright_selectOption': selectOption,
    'playwright_check': check,
    'playwright_uncheck': uncheck,
    'playwright_hover': hover,
    'playwright_focus': focus,
    'playwright_getAttribute': getAttribute,
    'playwright_getTextContent': getTextContent,
    'playwright_getInnerText': getInnerText,
    'playwright_getInnerHtml': getInnerHtml,
    'playwright_waitForSelector': waitForSelector,
    'playwright_waitForTimeout': waitForTimeout,
    'playwright_isVisible': isVisible,
    'playwright_isHidden': isHidden,
    'playwright_isEnabled': isEnabled,
    'playwright_isDisabled': isDisabled,
    'playwright_isChecked': isChecked,
    'playwright_isEditable': isEditable,
    'playwright_countElements': countElements,
    'playwright_evaluate': evaluate,
    'playwright_screenshot': screenshot,
    'playwright_screenshotElement': screenshotElement,
    'playwright_pdf': pdf,
    'playwright_startVideo': startVideo,
    'playwright_stopVideo': stopVideo,
  };
  const handler = tools[toolName];
  if (!handler) throw new Error(`Unknown tool: ${toolName}`);
  return handler(credentials, args);
}

module.exports = { executePlaywrightTool };
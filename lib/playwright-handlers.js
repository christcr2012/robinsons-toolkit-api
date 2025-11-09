"use strict";
/**
 * Playwright Handler Functions (50 handlers)
 * Browser automation and testing
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.playwrightLaunchBrowser = playwrightLaunchBrowser;
exports.playwrightCloseBrowser = playwrightCloseBrowser;
exports.playwrightNewContext = playwrightNewContext;
exports.playwrightCloseContext = playwrightCloseContext;
exports.playwrightNewPage = playwrightNewPage;
exports.playwrightClosePage = playwrightClosePage;
exports.playwrightGetPages = playwrightGetPages;
exports.playwrightSetViewport = playwrightSetViewport;
exports.playwrightSetUserAgent = playwrightSetUserAgent;
exports.playwrightSetExtraHttpHeaders = playwrightSetExtraHttpHeaders;
exports.playwrightGoto = playwrightGoto;
exports.playwrightGoBack = playwrightGoBack;
exports.playwrightGoForward = playwrightGoForward;
exports.playwrightReload = playwrightReload;
exports.playwrightGetUrl = playwrightGetUrl;
exports.playwrightGetTitle = playwrightGetTitle;
exports.playwrightGetContent = playwrightGetContent;
exports.playwrightSetContent = playwrightSetContent;
exports.playwrightWaitForLoadState = playwrightWaitForLoadState;
exports.playwrightWaitForUrl = playwrightWaitForUrl;
exports.playwrightClick = playwrightClick;
exports.playwrightDblclick = playwrightDblclick;
exports.playwrightFill = playwrightFill;
exports.playwrightType = playwrightType;
exports.playwrightPress = playwrightPress;
exports.playwrightSelectOption = playwrightSelectOption;
exports.playwrightCheck = playwrightCheck;
exports.playwrightUncheck = playwrightUncheck;
exports.playwrightHover = playwrightHover;
exports.playwrightFocus = playwrightFocus;
exports.playwrightGetAttribute = playwrightGetAttribute;
exports.playwrightGetTextContent = playwrightGetTextContent;
exports.playwrightGetInnerText = playwrightGetInnerText;
exports.playwrightGetInnerHtml = playwrightGetInnerHtml;
exports.playwrightWaitForSelector = playwrightWaitForSelector;
exports.playwrightWaitForTimeout = playwrightWaitForTimeout;
exports.playwrightIsVisible = playwrightIsVisible;
exports.playwrightIsHidden = playwrightIsHidden;
exports.playwrightIsEnabled = playwrightIsEnabled;
exports.playwrightIsDisabled = playwrightIsDisabled;
exports.playwrightIsChecked = playwrightIsChecked;
exports.playwrightIsEditable = playwrightIsEditable;
exports.playwrightCountElements = playwrightCountElements;
exports.playwrightEvaluate = playwrightEvaluate;
exports.playwrightScreenshot = playwrightScreenshot;
exports.playwrightScreenshotElement = playwrightScreenshotElement;
exports.playwrightPdf = playwrightPdf;
exports.playwrightStartVideo = playwrightStartVideo;
exports.playwrightStopVideo = playwrightStopVideo;
// Helper function to format Playwright responses
function formatPlaywrightResponse(result) {
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
}
// ============================================================
// BROWSER MANAGEMENT HANDLERS (10 handlers)
// ============================================================
async function playwrightLaunchBrowser(args) {
    if (!this.playwrightBrowser) {
        const playwright = await Promise.resolve().then(() => __importStar(require('playwright')));
        const { browserType = 'chromium', headless = true, options = {} } = args;
        const browser = browserType === 'chromium' ? playwright.chromium :
            browserType === 'firefox' ? playwright.firefox :
                playwright.webkit;
        this.playwrightBrowser = await browser.launch({ headless, ...options });
        return formatPlaywrightResponse({ status: 'launched', browserType, headless });
    }
    return formatPlaywrightResponse({ status: 'already launched' });
}
async function playwrightCloseBrowser(args) {
    if (this.playwrightBrowser) {
        await this.playwrightBrowser.close();
        this.playwrightBrowser = null;
        this.playwrightContext = null;
        this.playwrightPage = null;
        return formatPlaywrightResponse({ status: 'closed' });
    }
    return formatPlaywrightResponse({ status: 'no browser to close' });
}
async function playwrightNewContext(args) {
    if (!this.playwrightBrowser)
        throw new Error('Browser not launched');
    const { options = {} } = args;
    this.playwrightContext = await this.playwrightBrowser.newContext(options);
    return formatPlaywrightResponse({ status: 'context created' });
}
async function playwrightCloseContext(args) {
    if (this.playwrightContext) {
        await this.playwrightContext.close();
        this.playwrightContext = null;
        this.playwrightPage = null;
        return formatPlaywrightResponse({ status: 'context closed' });
    }
    return formatPlaywrightResponse({ status: 'no context to close' });
}
async function playwrightNewPage(args) {
    if (!this.playwrightContext) {
        if (!this.playwrightBrowser)
            throw new Error('Browser not launched');
        this.playwrightContext = await this.playwrightBrowser.newContext();
    }
    this.playwrightPage = await this.playwrightContext.newPage();
    return formatPlaywrightResponse({ status: 'page created' });
}
async function playwrightClosePage(args) {
    if (this.playwrightPage) {
        await this.playwrightPage.close();
        this.playwrightPage = null;
        return formatPlaywrightResponse({ status: 'page closed' });
    }
    return formatPlaywrightResponse({ status: 'no page to close' });
}
async function playwrightGetPages(args) {
    if (!this.playwrightContext)
        throw new Error('No context available');
    const pages = this.playwrightContext.pages();
    return formatPlaywrightResponse({ count: pages.length, pages: pages.map((p) => p.url()) });
}
async function playwrightSetViewport(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { width, height } = args;
    await this.playwrightPage.setViewportSize({ width, height });
    return formatPlaywrightResponse({ viewport: { width, height } });
}
async function playwrightSetUserAgent(args) {
    if (!this.playwrightContext)
        throw new Error('No context available');
    const { userAgent } = args;
    await this.playwrightContext.setExtraHTTPHeaders({ 'User-Agent': userAgent });
    return formatPlaywrightResponse({ userAgent });
}
async function playwrightSetExtraHttpHeaders(args) {
    if (!this.playwrightContext)
        throw new Error('No context available');
    const { headers } = args;
    await this.playwrightContext.setExtraHTTPHeaders(headers);
    return formatPlaywrightResponse({ headers });
}
// ============================================================
// PAGE NAVIGATION HANDLERS (10 handlers)
// ============================================================
async function playwrightGoto(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { url, options = {} } = args;
    await this.playwrightPage.goto(url, options);
    return formatPlaywrightResponse({ url, status: 'navigated' });
}
async function playwrightGoBack(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { options = {} } = args;
    await this.playwrightPage.goBack(options);
    return formatPlaywrightResponse({ status: 'navigated back' });
}
async function playwrightGoForward(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { options = {} } = args;
    await this.playwrightPage.goForward(options);
    return formatPlaywrightResponse({ status: 'navigated forward' });
}
async function playwrightReload(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { options = {} } = args;
    await this.playwrightPage.reload(options);
    return formatPlaywrightResponse({ status: 'reloaded' });
}
async function playwrightGetUrl(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const url = this.playwrightPage.url();
    return formatPlaywrightResponse({ url });
}
async function playwrightGetTitle(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const title = await this.playwrightPage.title();
    return formatPlaywrightResponse({ title });
}
async function playwrightGetContent(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const content = await this.playwrightPage.content();
    return formatPlaywrightResponse({ content });
}
async function playwrightSetContent(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { html, options = {} } = args;
    await this.playwrightPage.setContent(html, options);
    return formatPlaywrightResponse({ status: 'content set' });
}
async function playwrightWaitForLoadState(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { state = 'load', options = {} } = args;
    await this.playwrightPage.waitForLoadState(state, options);
    return formatPlaywrightResponse({ state, status: 'loaded' });
}
async function playwrightWaitForUrl(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { url, options = {} } = args;
    await this.playwrightPage.waitForURL(url, options);
    return formatPlaywrightResponse({ url, status: 'matched' });
}
// ============================================================
// ELEMENT INTERACTION HANDLERS (15 handlers)
// ============================================================
async function playwrightClick(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector, options = {} } = args;
    await this.playwrightPage.click(selector, options);
    return formatPlaywrightResponse({ selector, status: 'clicked' });
}
async function playwrightDblclick(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector, options = {} } = args;
    await this.playwrightPage.dblclick(selector, options);
    return formatPlaywrightResponse({ selector, status: 'double-clicked' });
}
async function playwrightFill(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector, value, options = {} } = args;
    await this.playwrightPage.fill(selector, value, options);
    return formatPlaywrightResponse({ selector, value, status: 'filled' });
}
async function playwrightType(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector, text, options = {} } = args;
    await this.playwrightPage.type(selector, text, options);
    return formatPlaywrightResponse({ selector, text, status: 'typed' });
}
async function playwrightPress(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector, key, options = {} } = args;
    await this.playwrightPage.press(selector, key, options);
    return formatPlaywrightResponse({ selector, key, status: 'pressed' });
}
async function playwrightSelectOption(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector, values, options = {} } = args;
    await this.playwrightPage.selectOption(selector, values, options);
    return formatPlaywrightResponse({ selector, values, status: 'selected' });
}
async function playwrightCheck(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector, options = {} } = args;
    await this.playwrightPage.check(selector, options);
    return formatPlaywrightResponse({ selector, status: 'checked' });
}
async function playwrightUncheck(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector, options = {} } = args;
    await this.playwrightPage.uncheck(selector, options);
    return formatPlaywrightResponse({ selector, status: 'unchecked' });
}
async function playwrightHover(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector, options = {} } = args;
    await this.playwrightPage.hover(selector, options);
    return formatPlaywrightResponse({ selector, status: 'hovered' });
}
async function playwrightFocus(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector, options = {} } = args;
    await this.playwrightPage.focus(selector, options);
    return formatPlaywrightResponse({ selector, status: 'focused' });
}
async function playwrightGetAttribute(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector, name } = args;
    const value = await this.playwrightPage.getAttribute(selector, name);
    return formatPlaywrightResponse({ selector, name, value });
}
async function playwrightGetTextContent(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector } = args;
    const text = await this.playwrightPage.textContent(selector);
    return formatPlaywrightResponse({ selector, text });
}
async function playwrightGetInnerText(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector } = args;
    const text = await this.playwrightPage.innerText(selector);
    return formatPlaywrightResponse({ selector, text });
}
async function playwrightGetInnerHtml(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector } = args;
    const html = await this.playwrightPage.innerHTML(selector);
    return formatPlaywrightResponse({ selector, html });
}
// ============================================================
// ASSERTIONS & WAITS HANDLERS (10 handlers)
// ============================================================
async function playwrightWaitForSelector(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector, options = {} } = args;
    await this.playwrightPage.waitForSelector(selector, options);
    return formatPlaywrightResponse({ selector, status: 'found' });
}
async function playwrightWaitForTimeout(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { timeout } = args;
    await this.playwrightPage.waitForTimeout(timeout);
    return formatPlaywrightResponse({ timeout, status: 'waited' });
}
async function playwrightIsVisible(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector } = args;
    const visible = await this.playwrightPage.isVisible(selector);
    return formatPlaywrightResponse({ selector, visible });
}
async function playwrightIsHidden(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector } = args;
    const hidden = await this.playwrightPage.isHidden(selector);
    return formatPlaywrightResponse({ selector, hidden });
}
async function playwrightIsEnabled(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector } = args;
    const enabled = await this.playwrightPage.isEnabled(selector);
    return formatPlaywrightResponse({ selector, enabled });
}
async function playwrightIsDisabled(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector } = args;
    const disabled = await this.playwrightPage.isDisabled(selector);
    return formatPlaywrightResponse({ selector, disabled });
}
async function playwrightIsChecked(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector } = args;
    const checked = await this.playwrightPage.isChecked(selector);
    return formatPlaywrightResponse({ selector, checked });
}
async function playwrightIsEditable(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector } = args;
    const editable = await this.playwrightPage.isEditable(selector);
    return formatPlaywrightResponse({ selector, editable });
}
async function playwrightCountElements(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector } = args;
    const count = await this.playwrightPage.locator(selector).count();
    return formatPlaywrightResponse({ selector, count });
}
async function playwrightEvaluate(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { script, args: scriptArgs } = args;
    const result = await this.playwrightPage.evaluate(script, scriptArgs);
    return formatPlaywrightResponse({ result });
}
// ============================================================
// SCREENSHOTS & VIDEOS HANDLERS (5 handlers)
// ============================================================
async function playwrightScreenshot(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { path, options = {} } = args;
    await this.playwrightPage.screenshot({ path, ...options });
    return formatPlaywrightResponse({ path, status: 'screenshot saved' });
}
async function playwrightScreenshotElement(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { selector, path, options = {} } = args;
    const element = await this.playwrightPage.locator(selector);
    await element.screenshot({ path, ...options });
    return formatPlaywrightResponse({ selector, path, status: 'screenshot saved' });
}
async function playwrightPdf(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const { path, options = {} } = args;
    await this.playwrightPage.pdf({ path, ...options });
    return formatPlaywrightResponse({ path, status: 'PDF saved' });
}
async function playwrightStartVideo(args) {
    if (!this.playwrightContext)
        throw new Error('No context available');
    const { options = {} } = args;
    // Video recording is configured at context creation
    return formatPlaywrightResponse({ message: 'Video recording must be configured at context creation', options });
}
async function playwrightStopVideo(args) {
    if (!this.playwrightPage)
        throw new Error('No page available');
    const video = this.playwrightPage.video();
    if (video) {
        const path = await video.path();
        await this.playwrightPage.close();
        return formatPlaywrightResponse({ path, status: 'video saved' });
    }
    return formatPlaywrightResponse({ message: 'No video recording active' });
}

import puppeteer from 'puppeteer';
import Crypto from 'crypto-js';

const getBrowserToken = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://pt.aliexpress.com/');

    const cookies = await page.cookies();
    // await browser.close();

    return {
      cookies,
      token :cookies.find(c => c.name == '_m_h5_tk')?.value?.split('_')[0] || ''
    }
}

const getSearchParams = async (productId = '') => {
  const timestamp = Date.now().toString();  
  const browser = await getBrowserToken();
    
  const appKey = '12574478'; 
  const dados = {
    productId,
    _lang: 'pt_BR',
    _currency: 'BRL',
    country: 'BR',
    province: '',
    city: '',
    channel: '',
    pdp_ext_f: '',
    pdpNPI: '4@dis!BRL!42.98!4.99!!!56.88!6.61!@2101fb1917173593435802583e0ba5!12000036052146457!rec!BR!!AB',
    sourceType: '',
    clientType: 'pc',
    ext: '{"foreverRandomToken":"5ebd1a2917a8496787d5c4824b278de4","site":"bra","webAffiParameters":"{\\"aeuCID\\":\\"564efce837dd4decb253fdc3056954c5-1703370204443-08943-_pz9sEiR\\",\\"affiliateKey\\":\\"_pz9sEiR\\",\\"channel\\":\\"AFFILIATE\\",\\"cv\\":\\"2\\",\\"isCookieCache\\":\\"N\\",\\"ms\\":\\"0\\",\\"pid\\":\\"2391147471\\",\\"tagtime\\":1703370204443}","crawler":false,"x-m-biz-bx-region":"","signedIn":false}'
  };

  const dataString = JSON.stringify(dados);
  const sign = Crypto.MD5(`${browser.token}&${timestamp}&${appKey}&${dataString}`).toString();
  const params = {
    jsv: '2.5.1',
    appKey,
    t: timestamp,
    sign,
    api: 'mtop.aliexpress.pdp.pc.query',
    type: 'originaljsonp',
    v: '1.0',
    timeout: '15000',
    dataType: 'originaljsonp',
    callback: 'mtopjsonp1',
    data: dataString
  };

  return {
    cookies: browser.cookies,
    params
  };
}

export default getSearchParams;
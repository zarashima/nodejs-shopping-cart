const PercyScript = require('@percy/script');

PercyScript.run(async (page, percySnapshot) => {
    await page.goto('https://another-nodejs-shopping-cart.herokuapp.com');
    await page.waitFor('.navbar-header');
    await percySnapshot('homepage');
})
const yf = require('yahoo-finance2');

const YahooFinanceClass = yf.YahooFinance || yf.default?.YahooFinance || yf.default;

let yahooFinance;

try {

  yahooFinance = new YahooFinanceClass();
} catch (e) {
  // Si falla el 'new', usamos el objeto directamente (v2 legacy)
  yahooFinance = yf.default || yf;
}

module.exports = {
  async getLivePrice(ticker) {
    try {
      // Llamada a la API
      const quote = await yahooFinance.quote(ticker);
      
      if (!quote || !quote.regularMarketPrice) {
        return null;
      }

      return {
        ticker: ticker,
        price: quote.regularMarketPrice,
        currency: quote.currency,
        name: quote.shortName || quote.longName
      };
    } catch (error) {
      console.error(`❌ Error en Yahoo Finance para ${ticker}:`, error.message);
      return null;
    }
  }
};
const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

export async function fetchStock(symbol) {
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  console.log('Finnhub API response for', symbol, ':', data);

  if (data && data.c) {
    return {
      symbol: symbol,
      price: data.c,                     // Current price
      changePercent: ((data.d / (data.pc || 1)) * 100),  // d = change, pc = previous close
    };
  } else {
    throw new Error('Failed to fetch stock data');
  }
}

# 📈 Stock Price Dashboard

A simple, responsive stock price dashboard built with **React.js**, **Tailwind CSS**, **Vite**, and **Finnhub API**.
The dashboard displays stock data in a table with a real-time chart, along with search, sorting, and loading/error handling features.

---

## 🚀 Live Demo

👉 [View Deployed App](https://stock-dashboard-lduf5hxkw-aishwarya-muraharis-projects.vercel.app/)

---

## ✨ Features

- 🔄 Fetches real-time stock data (price and change %) from **Finnhub API**
- 📋 Displays data in a **responsive table** (styled with Tailwind CSS)
- 📈 Shows **Line Chart** of stock prices (using Chart.js)
- 🔍 **Search** stocks by symbol
- 🔀 **Sort** stocks by price ascending/descending
- ⏳ **Loading Spinner** during data fetch
- 🚨 **Error handling** for API failures
- 📱 Fully **mobile responsive**

---

## 📦 Tech Stack

- [React.js](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/)
- [Finnhub API](https://finnhub.io/)

---

## 🛠️ Installation and Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/aishwaryamurahari/stock-dashboard.git
cd stock-price-dashboard
```
## 🔐 Environment Variables

This project requires the following environment variable:

- `VITE_FINNHUB_API_KEY`: Your Finnhub API key

Create a `.env` file at the root and add the above variable before running locally.


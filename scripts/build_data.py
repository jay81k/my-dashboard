"""
Build dashboard data for static GitHub Pages deployment.
Run from repo root: python scripts/build_data.py [--out-dir data]
Outputs: data/snapshot.json, data/events.json, data/meta.json, data/charts/*.png
"""
from __future__ import print_function
import argparse
import json
import os
import re
import time

import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
from io import BytesIO
from scipy.stats import rankdata

try:
    import investpy
except ImportError:
    investpy = None

# --- Config: no Liquid Stocks ---
KEY_EVENTS = [
    "Fed", "Federal Reserve", "Interest Rate", "FOMC",
    "ISM Manufacturing", "ISM Non-Manufacturing", "ISM Services", "ISM",
    "CPI", "Consumer Price Index", "Nonfarm Payrolls", "NFP", "Employment",
    "PPI", "Producer Price Index", "PCE", "Core PCE", "Personal Consumption",
    "Retail Sales", "GDP", "Gross Domestic Product", "Unemployment", "Jobless Claims", "Initial Claims",
    "Housing Starts", "Building Permits", "Durable Goods", "Factory Orders",
    "Consumer Confidence", "Michigan Consumer", "Trade Balance", "Trade Deficit",
    "Beige Book", "Fed Minutes", "JOLTS", "Job Openings"
]

STOCK_GROUPS = {
    "Indices": ["QQQE", "MGK", "QQQ", "RSP", "MDY", "IWM", "TLT", "SPY", "DIA"],
    "S&P Style ETFs": ["IJS", "IJR", "IJT", "IJJ", "IJH", "IJK", "IVE", "IVV", "IVW"],
    "Sel Sectors": ["XLK", "XLI", "XLC", "XLF", "XLU", "XLY", "XLRE", "XLP", "XLB", "XLE", "XLV"],
    "EW Sectors": ["RSPT", "RSPC", "RSPN", "RSPF", "RSP", "RSPD", "RSPU", "RSPR", "RSPH", "RSPM", "RSPS", "RSPG"],
    "Industries": [
        "TAN", "KCE", "IBUY", "QQQE", "JETS", "IBB", "SMH", "CIBR", "UTES", "ROBO", "IGV", "WCLD", "ITA", "PAVE", "BLOK", "AIQ", "IYZ", "PEJ", "FDN", "KBE",
        "UNG", "BOAT", "KWEB", "KRE", "XRT", "IHI", "DRIV", "MSOS", "SOCL", "XLU", "ARKF", "SLX", "ARKK", "XTN", "XME", "KIE", "GLD", "GXC", "SCHH",
        "GDX", "IPAY", "IWM", "XOP", "VNQ", "EATZ", "FXI", "DBA", "ICLN", "SILJ", "REZ", "LIT", "SLV", "XHB", "XHE", "PBJ", "USO", "DBC", "FCG", "XBI",
        "ARKG", "CPER", "XES", "OIH", "PPH", "FNGS", "URA", "WGMI", "REMX"
    ],
    "Crypto": ["IBIT", "ETHA", "SOLQ", "PURR"],
    "Countries": [
        "EZA", "ARGT", "EWA", "THD", "EIDO", "EWC", "GREK", "EWP", "EWG", "EWL", "EUFN", "EWY", "IEUR", "EFA", "ACWI",
        "IEV", "EWQ", "EWI", "EWJ", "EWW", "ECH", "EWD", "ASHR", "EWS", "KSA", "INDA", "EEM", "EWZ", "TUR", "EWH", "EWT", "MCHI"
    ]
}

LEVERAGED_ETFS = {
    "QQQ": {"long": ["TQQQ"], "short": ["SQQQ"]},
    "MDY": {"long": ["MIDU"], "short": []},
    "IWM": {"long": ["TNA"], "short": ["TZA"]},
    "TLT": {"long": ["TMF"], "short": ["TMV"]},
    "SPY": {"long": ["SPXL", "UPRO"], "short": ["SPXS", "SH"]},
    "ETHA": {"long": ["ETHU"], "short": []},
    "XLK": {"long": ["TECL"], "short": ["TECS"]},
    "XLI": {"long": ["DUSL"], "short": []},
    "XLC": {"long": ["LTL"], "short": []},
    "XLF": {"long": ["FAS"], "short": ["FAZ"]},
    "XLU": {"long": ["UTSL"], "short": []},
    "XLY": {"long": ["WANT"], "short": ["SCC"]},
    "XLRE": {"long": ["DRN"], "short": ["DRV"]},
    "XLP": {"long": ["UGE"], "short": ["SZK"]},
    "XLB": {"long": ["UYM"], "short": ["SMN"]},
    "XLE": {"long": ["ERX"], "short": ["ERY"]},
    "XLV": {"long": ["CURE"], "short": []},
    "SMH": {"long": ["SOXL"], "short": ["SOXS"]},
    "ARKK": {"long": ["TARK"], "short": ["SARK"]},
    "XTN": {"long": ["TPOR"], "short": []},
    "KWEB": {"long": ["CWEB"], "short": []},
    "XRT": {"long": ["RETL"], "short": []},
    "KRE": {"long": ["DPST"], "short": []},
    "DRIV": {"long": ["EVAV"], "short": []},
    "XBI": {"long": ["LABU"], "short": ["LABD"]},
    "ROBO": {"long": ["UBOT"], "short": []},
    "XHB": {"long": ["NAIL"], "short": []},
    "FNGS": {"long": ["FNGB"], "short": ["FNGD"]},
    "WCLD": {"long": ["CLDL"], "short": []},
    "XOP": {"long": ["GUSH"], "short": ["DRIP"]},
    "FDN": {"long": ["WEBL"], "short": ["WEBS"]},
    "FXI": {"long": ["YINN"], "short": ["YANG"]},
    "PEJ": {"long": ["OOTO"], "short": []},
    "USO": {"long": ["UCO"], "short": ["SCO"]},
    "PPH": {"long": ["PILL"], "short": []},
    "ITA": {"long": ["DFEN"], "short": []},
    "SLV": {"long": ["AGQ"], "short": ["ZSL"]},
    "GLD": {"long": ["UGL"], "short": ["GLL"]},
    "UNG": {"long": ["BOIL"], "short": ["KOLD"]},
    "GDX": {"long": ["NUGT", "GDXU"], "short": ["JDST", "GDXD"]},
    "IBIT": {"long": ["BITO", "BITX"], "short": ["BITI"]},
    "SOLQ": {"long": [], "short": []},
    "PURR": {"long": [], "short": []},
    "MSOS": {"long": ["MSOX"], "short": []},
    "REMX": {"long": [], "short": []},
    "EWY": {"long": ["KORU"], "short": []},
    "IEV": {"long": ["EURL"], "short": []},
    "EWJ": {"long": ["EZJ"], "short": []},
    "EWW": {"long": ["MEXX"], "short": []},
    "ASHR": {"long": ["CHAU"], "short": []},
    "INDA": {"long": ["INDL"], "short": []},
    "EEM": {"long": ["EDC"], "short": ["EDZ"]},
    "EWZ": {"long": ["BRZU"], "short": []}
}

SECTOR_COLORS = {
    "Information Technology": "#3f51b5", "Industrials": "#333", "Emerging Markets": "#00bcd4",
    "Consumer Discretionary": "#4caf50", "Health Care": "#e91e63", "Financials": "#ff5722",
    "Energy": "#795548", "Communication Services": "#9c27b0", "Real Estate": "#673ab7",
    "Commodities": "#8b6914", "Materials": "#ff9800", "Utilities": "#009688",
    "Consumer Staples": "#8bc34a", "Broad Market": "#9e9e9e",
}

Industries_COLORS = {
    "SMH": "#3f51b5", "ARKK": "#3f51b5", "XTN": "#333", "KWEB": "#00bcd4", "XRT": "#4caf50", "KRE": "#ff5722",
    "ARKF": "#3f51b5", "ARKG": "#e91e63", "BOAT": "#333", "DRIV": "#4caf50", "KBE": "#ff5722", "XES": "#795548",
    "XBI": "#e91e63", "OIH": "#795548", "SOCL": "#9c27b0", "ROBO": "#333", "AIQ": "#3f51b5", "XHB": "#4caf50",
    "FNGS": "#9e9e9e", "BLOK": "#3f51b5", "LIT": "#ff9800", "WCLD": "#3f51b5", "XOP": "#795548", "FDN": "#4caf50",
    "TAN": "#795548", "IBB": "#e91e63", "PAVE": "#333", "PEJ": "#4caf50", "KCE": "#ff5722", "XHE": "#e91e63",
    "IBUY": "#4caf50", "MSOS": "#4caf50", "FCG": "#795548", "JETS": "#4caf50", "IPAY": "#ff5722", "SLX": "#ff9800",
    "IGV": "#3f51b5", "CIBR": "#3f51b5", "EATZ": "#4caf50", "PPH": "#e91e63", "IHI": "#e91e63", "UTES": "#009688",
    "ICLN": "#795548", "XME": "#ff9800", "IYZ": "#9c27b0", "URA": "#795548", "ITA": "#333", "VNQ": "#673ab7",
    "SCHH": "#673ab7", "KIE": "#ff5722", "REZ": "#673ab7", "CPER": "#8b6914", "PBJ": "#8bc34a", "SLV": "#8b6914",
    "GLD": "#8b6914", "SILJ": "#ff9800", "GDX": "#ff9800", "FXI": "#00bcd4", "GXC": "#00bcd4", "USO": "#8b6914",
    "DBA": "#8b6914", "UNG": "#8b6914", "DBC": "#8b6914", "WGMI": "#3f51b5", "REMX": "#ff9800",
}


def get_ticker_to_sector_mapping():
    color_to_sector = {c: s for s, c in SECTOR_COLORS.items()}
    return {t: color_to_sector.get(c, "Broad Market") for t, c in Industries_COLORS.items()}


TICKER_TO_SECTOR = get_ticker_to_sector_mapping()


def get_leveraged_etfs(ticker):
    if ticker in LEVERAGED_ETFS:
        return LEVERAGED_ETFS[ticker].get("long", []), LEVERAGED_ETFS[ticker].get("short", [])
    return [], []


def get_upcoming_key_events(days_ahead=7):
    if investpy is None:
        return []
    today = datetime.today()
    end_date = today + timedelta(days=days_ahead)
    from_date = today.strftime('%d/%m/%Y')
    to_date = end_date.strftime('%d/%m/%Y')
    try:
        calendar = investpy.news.economic_calendar(
            time_zone=None, time_filter='time_only', countries=['united states'],
            importances=['high'], categories=None, from_date=from_date, to_date=to_date
        )
        if calendar.empty:
            return []
        pattern = '|'.join(KEY_EVENTS)
        filtered = calendar[
            (calendar['event'].str.contains(pattern, case=False, na=False)) &
            (calendar['importance'].str.lower() == 'high')
        ]
        if filtered.empty:
            return []
        filtered = filtered.sort_values(['date', 'time'])
        return filtered[['date', 'time', 'event']].to_dict('records')
    except Exception as e:
        print("Economic calendar error:", e)
        return []


def calculate_adr(hist_data, period=20):
    try:
        capped = min(period, 252)
        adr_value = (hist_data['High'] - hist_data['Low']).rolling(window=capped).mean().iloc[-1]
        return adr_value
    except Exception:
        return None


def calculate_rrs(stock_data, spy_data, atr_length=14, length_rolling=50, length_sma=20, atr_multiplier=1.0):
    try:
        merged = pd.merge(
            stock_data[['High', 'Low', 'Close']], spy_data[['High', 'Low', 'Close']],
            left_index=True, right_index=True, suffixes=('_stock', '_spy'), how='inner'
        )
        if len(merged) < atr_length + 1:
            return None
        for prefix in ['stock', 'spy']:
            h, l, c = merged[f'High_{prefix}'], merged[f'Low_{prefix}'], merged[f'Close_{prefix}']
            tr = pd.concat([h - l, (h - c.shift()).abs(), (l - c.shift()).abs()], axis=1).max(axis=1)
            merged[f'atr_{prefix}'] = tr.ewm(alpha=1/atr_length, adjust=False).mean()
        sc = merged['Close_stock'] - merged['Close_stock'].shift(1)
        spy_c = merged['Close_spy'] - merged['Close_spy'].shift(1)
        spy_pi = spy_c / merged['atr_spy']
        expected = spy_pi * merged['atr_stock'] * atr_multiplier
        rrs = (sc - expected) / merged['atr_stock']
        rolling_rrs = rrs.rolling(window=length_rolling, min_periods=1).mean()
        rrs_sma = rolling_rrs.rolling(window=length_sma, min_periods=1).mean()
        return pd.DataFrame({'RRS': rrs, 'rollingRRS': rolling_rrs, 'RRS_SMA': rrs_sma}, index=merged.index)
    except Exception:
        return None


def calculate_sma(hist_data, period=50):
    try:
        return hist_data['Close'].rolling(window=period).mean().iloc[-1]
    except Exception:
        return None


def calculate_ema(hist_data, period=10):
    try:
        return hist_data['Close'].ewm(span=period, adjust=False).mean().iloc[-1]
    except Exception:
        return None


def calculate_abc_rating(hist_data):
    try:
        ema10 = calculate_ema(hist_data, 10)
        ema20 = calculate_ema(hist_data, 20)
        sma50 = calculate_sma(hist_data, 50)
        if ema10 is None or ema20 is None or sma50 is None:
            return None
        if ema10 > ema20 and ema20 > sma50:
            return "A"
        if (ema10 > ema20 and ema20 < sma50) or (ema10 < ema20 and ema20 > sma50):
            return "B"
        if ema10 < ema20 and ema20 < sma50:
            return "C"
    except Exception:
        pass
    return None


def create_rs_chart_png(rrs_data, ticker, charts_dir):
    try:
        recent = rrs_data.tail(20)
        if len(recent) == 0:
            return None
        plt.style.use('dark_background')
        fig, ax = plt.subplots(figsize=(8, 2))
        fig.patch.set_facecolor('#1a1a1a')
        ax.set_facecolor('#1a1a1a')
        rolling_rrs = recent['rollingRRS'].values
        rrs_sma = recent['RRS_SMA'].values
        max_idx = rolling_rrs.argmax()
        bar_colors = ['#4ade80' if i == max_idx else '#b0b0b0' for i in range(len(rolling_rrs))]
        ax.bar(range(len(rolling_rrs)), rolling_rrs, color=bar_colors, width=0.8, edgecolor='none')
        ax.plot(range(len(rrs_sma)), rrs_sma, color='yellow', lw=2)
        ax.axhline(y=0, color='#808080', linestyle='--', linewidth=1)
        mn = min(rolling_rrs.min(), rrs_sma.min() if len(rrs_sma) else 0)
        mx = max(rolling_rrs.max(), rrs_sma.max() if len(rrs_sma) else 0)
        pad = 0.1 if mn == mx else (mx - mn) * 0.2
        ax.set_ylim(mn - pad, mx + pad)
        ax.set_xticks([])
        ax.set_yticks([])
        for s in ax.spines.values():
            s.set_visible(False)
        fig.tight_layout(pad=0)
        safe = re.sub(r'[^a-zA-Z0-9]', '_', ticker)
        path = os.path.join(charts_dir, f"{safe}.png")
        fig.savefig(path, format='png', dpi=80, bbox_inches='tight', facecolor='#1a1a1a')
        plt.close(fig)
        return f"data/charts/{safe}.png"
    except Exception as e:
        print("Chart error", ticker, e)
        return None


def get_stock_data(ticker_symbol, charts_dir, spy_history=None):
    try:
        stock = yf.Ticker(ticker_symbol)
        hist = stock.history(period="1y")
        hist = hist.dropna(subset=["Close", "Open", "High", "Low"])
        if len(hist) < 50:
            return None

        current_close = hist["Close"].iloc[-1]
        prev_close    = hist["Close"].iloc[-2]
        current_open  = hist["Open"].iloc[-1]

        daily_change      = (current_close / prev_close - 1) * 100
        five_day_change   = (current_close / hist["Close"].iloc[-6]  - 1) * 100 if len(hist) >= 6  else None
        twenty_day_change = (current_close / hist["Close"].iloc[-21] - 1) * 100 if len(hist) >= 21 else None
        fifty_day_change  = (current_close / hist["Close"].iloc[-51] - 1) * 100 if len(hist) >= 51 else None

        # YTD: first close of current calendar year
        year_start = hist[hist.index.year == hist.index[-1].year]
        ytd_change = (current_close / year_start["Close"].iloc[0] - 1) * 100 if len(year_start) >= 1 else None

        # Relative strength vs SPY: 21-day (1M) and 63-day (3M)
        rs_1m = None
        rs_3m = None
        if spy_history is not None:
            spy_close = spy_history["Close"]
            if len(spy_close) >= 22 and len(hist) >= 22:
                rs_1m = twenty_day_change - (spy_close.iloc[-1] / spy_close.iloc[-22] - 1) * 100
            if len(spy_close) >= 63 and len(hist) >= 63:
                spy_3m   = (spy_close.iloc[-1] / spy_close.iloc[-63] - 1) * 100
                stock_3m = (current_close / hist["Close"].iloc[-63] - 1) * 100
                rs_3m = stock_3m - spy_3m

        # Closing range
        today_high = hist["High"].iloc[-1]
        today_low  = hist["Low"].iloc[-1]
        cr = ((current_close - today_low) / (today_high - today_low) * 100) if (today_high - today_low) > 0 else None

        adr = calculate_adr(hist)
        adr_pct = (adr / current_close) * 100 if adr and current_close else None
        abc_rating = calculate_abc_rating(hist)

        rs_sts = None
        rrs_data = None
        try:
            if spy_history is not None and len(spy_history) > 0:
                rrs_data = calculate_rrs(hist, spy_history, atr_length=14, length_rolling=50, length_sma=20, atr_multiplier=1.0)
                if rrs_data is not None and len(rrs_data) >= 21:
                    recent_21 = rrs_data["rollingRRS"].iloc[-21:]
                    ranks = rankdata(recent_21, method="average")
                    rs_sts = ((ranks[-1] - 1) / (len(recent_21) - 1)) * 100
        except Exception as e:
            print("RRS error", ticker_symbol, e)

        rs_chart_path = create_rs_chart_png(rrs_data, ticker_symbol, charts_dir) if rrs_data is not None and len(rrs_data) > 0 else None
        long_etfs, short_etfs = get_leveraged_etfs(ticker_symbol)

        return {
            "ticker":    ticker_symbol,
            "daily":     round(daily_change, 2)     if daily_change     is not None else None,
            "5d":        round(five_day_change, 2)  if five_day_change  is not None else None,
            "20d":       round(twenty_day_change, 2)if twenty_day_change is not None else None,
            "50d":       round(fifty_day_change, 2) if fifty_day_change is not None else None,
            "ytd":       round(ytd_change, 2)       if ytd_change       is not None else None,
            "vs_spy":    round(rs_1m, 2)            if rs_1m            is not None else None,
            "vs_spy_3m": round(rs_3m, 2)            if rs_3m            is not None else None,
            "cr":        round(cr, 1)               if cr               is not None else None,
            "adr_pct":   round(adr_pct, 2)          if adr_pct          is not None else None,
            "rs":        round(rs_sts, 0)           if rs_sts           is not None else None,
            "rs_chart":  rs_chart_path,
            "long":      long_etfs,
            "short":     short_etfs,
            "abc":       abc_rating,
        }
    except Exception as e:
        print("Error", ticker_symbol, e)
        return None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--out-dir", default="data", help="Output directory (default: data)")
    args = parser.parse_args()
    out_dir = args.out_dir
    charts_dir = os.path.join(out_dir, "charts")
    os.makedirs(charts_dir, exist_ok=True)

    print("Fetching economic events...")
    events = get_upcoming_key_events()

    print("Fetching SPY 1y history...")
    spy_history = yf.Ticker("SPY").history(period="1y")
    spy_history = spy_history.dropna(subset=["Close", "Open", "High", "Low"])

    print("Fetching stock data...")
    groups_data = {}
    all_ticker_data = {}
    for group_name, tickers in STOCK_GROUPS.items():
        rows = []
        for i, ticker in enumerate(tickers):
            print(f"  [{group_name}] {i+1}/{len(tickers)} {ticker}")
            row = get_stock_data(ticker, charts_dir, spy_history=spy_history)
            if row:
                rows.append(row)
                all_ticker_data[ticker] = row
            time.sleep(0.15)
        groups_data[group_name] = rows

    print("Computing column ranges...")
    column_ranges = {}
    for group_name, rows in groups_data.items():
        def vrange(rows, key, default_min, default_max):
            vals = [r[key] for r in rows if r.get(key) is not None]
            return [min(vals) if vals else default_min, max(vals) if vals else default_max]
        column_ranges[group_name] = {
            "daily":     vrange(rows, "daily",    -10, 10),
            "5d":        vrange(rows, "5d",        -20, 20),
            "20d":       vrange(rows, "20d",       -30, 30),
            "50d":       vrange(rows, "50d",       -40, 40),
            "ytd":       vrange(rows, "ytd",       -50, 50),
            "vs_spy":    vrange(rows, "vs_spy",    -20, 20),
            "vs_spy_3m": vrange(rows, "vs_spy_3m", -30, 30),
        }

    snapshot = {
        "built_at": datetime.utcnow().isoformat() + "Z",
        "groups": groups_data,
        "column_ranges": column_ranges,
    }
    meta = {
        "SECTOR_COLORS": SECTOR_COLORS,
        "TICKER_TO_SECTOR": TICKER_TO_SECTOR,
        "Industries_COLORS": Industries_COLORS,
        "SECTOR_ORDER": list(SECTOR_COLORS.keys()),
        "default_symbol": STOCK_GROUPS["Indices"][0] if STOCK_GROUPS["Indices"] else "SPY",
    }

    def sanitize(obj):
        if hasattr(obj, "item"):  # numpy scalar
            obj = obj.item()
        if isinstance(obj, float):
            return None if (obj != obj or obj == float("inf") or obj == float("-inf")) else obj
        if isinstance(obj, dict):
            return {k: sanitize(v) for k, v in obj.items()}
        if isinstance(obj, list):
            return [sanitize(v) for v in obj]
        return obj

    snapshot_path = os.path.join(out_dir, "snapshot.json")
    events_path = os.path.join(out_dir, "events.json")
    meta_path = os.path.join(out_dir, "meta.json")

    with open(snapshot_path, "w", encoding="utf-8") as f:
        json.dump(sanitize(snapshot), f, ensure_ascii=False, indent=2, allow_nan=False)
    with open(events_path, "w", encoding="utf-8") as f:
        json.dump(sanitize(events), f, ensure_ascii=False, indent=2, allow_nan=False)
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(sanitize(meta), f, ensure_ascii=False, indent=2, allow_nan=False)

    print("Wrote", snapshot_path, events_path, meta_path, "and charts in", charts_dir)


if __name__ == "__main__":
    main()

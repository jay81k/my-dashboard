
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const SNAPSHOT = {"built_at":"2026-03-01T05:43:05.501348Z","groups":{"Indices":[{"ticker":"QQQE","daily":0.03,"intra":1.18,"5d":0.72,"20d":-1.35,"atr_pct":1.4,"dist_sma50_atr":0.27,"rs":95.0,"long":[],"short":[],"abc":"B"},{"ticker":"MGK","daily":-0.91,"intra":0.34,"5d":-0.85,"20d":-5.41,"atr_pct":1.7,"dist_sma50_atr":-2.47,"rs":80.0,"long":[],"short":[],"abc":"C"},{"ticker":"QQQ","daily":-0.32,"intra":0.71,"5d":-0.25,"20d":-3.52,"atr_pct":1.6,"dist_sma50_atr":-0.85,"rs":95.0,"long":["TQQQ"],"short":["SQQQ"],"abc":"C"},{"ticker":"IBIT","daily":-2.8,"intra":-0.83,"5d":-3.2,"20d":-21.87,"atr_pct":5.2,"dist_sma50_atr":-3.79,"rs":75.0,"long":["BITX","BITU"],"short":["SBIT","BITI"],"abc":"C"},{"ticker":"RSP","daily":0.12,"intra":0.79,"5d":0.43,"20d":3.25,"atr_pct":1.1,"dist_sma50_atr":3.05,"rs":50.0,"long":[],"short":[],"abc":"A"},{"ticker":"MDY","daily":-0.81,"intra":0.31,"5d":-0.88,"20d":3.11,"atr_pct":1.5,"dist_sma50_atr":1.99,"rs":25.0,"long":["MIDU"],"short":[],"abc":"A"},{"ticker":"IWM","daily":-1.72,"intra":-0.26,"5d":-1.21,"20d":-0.74,"atr_pct":1.9,"dist_sma50_atr":0.37,"rs":5.0,"long":["TNA"],"short":["TZA"],"abc":"A"},{"ticker":"TLT","daily":0.61,"intra":0.14,"5d":1.58,"20d":4.05,"atr_pct":0.6,"dist_sma50_atr":5.48,"rs":100.0,"long":["TMF"],"short":["TMV"],"abc":"A"},{"ticker":"SPY","daily":-0.48,"intra":0.42,"5d":-0.5,"20d":-1.16,"atr_pct":1.2,"dist_sma50_atr":-0.21,"rs":45.0,"long":["SPXL","UPRO"],"short":["SPXS","SH"],"abc":"B"},{"ticker":"ETHA","daily":-5.04,"intra":-1.49,"5d":-2.48,"20d":-31.22,"atr_pct":7.2,"dist_sma50_atr":-3.78,"rs":70.0,"long":["ETHU"],"short":[],"abc":"C"},{"ticker":"DIA","daily":-1.05,"intra":0.01,"5d":-1.29,"20d":0.01,"atr_pct":1.2,"dist_sma50_atr":-0.11,"rs":0.0,"long":[],"short":[],"abc":"B"}],"S&P Style ETFs":[{"ticker":"IJS","daily":-1.33,"intra":-0.2,"5d":-2.34,"20d":1.06,"atr_pct":1.8,"dist_sma50_atr":0.97,"rs":5.0,"long":[],"short":[],"abc":"A"},{"ticker":"IJR","daily":-1.29,"intra":-0.19,"5d":-1.47,"20d":1.44,"atr_pct":1.7,"dist_sma50_atr":1.17,"rs":5.0,"long":[],"short":[],"abc":"A"},{"ticker":"IJT","daily":-1.15,"intra":0.09,"5d":-0.61,"20d":1.92,"atr_pct":1.6,"dist_sma50_atr":1.49,"rs":10.0,"long":[],"short":[],"abc":"A"},{"ticker":"IJJ","daily":-1.14,"intra":-0.11,"5d":-1.79,"20d":1.9,"atr_pct":1.5,"dist_sma50_atr":1.09,"rs":15.0,"long":[],"short":[],"abc":"A"},{"ticker":"IJH","daily":-0.8,"intra":0.24,"5d":-0.86,"20d":3.16,"atr_pct":1.5,"dist_sma50_atr":1.96,"rs":25.0,"long":[],"short":[],"abc":"A"},{"ticker":"IJK","daily":-0.56,"intra":0.76,"5d":0.04,"20d":4.42,"atr_pct":1.6,"dist_sma50_atr":2.72,"rs":75.0,"long":[],"short":[],"abc":"A"},{"ticker":"IVE","daily":0.07,"intra":0.5,"5d":0.41,"20d":2.5,"atr_pct":0.9,"dist_sma50_atr":2.49,"rs":30.0,"long":[],"short":[],"abc":"A"},{"ticker":"IVV","daily":-0.44,"intra":0.47,"5d":-0.45,"20d":-1.11,"atr_pct":1.2,"dist_sma50_atr":-0.17,"rs":100.0,"long":[],"short":[],"abc":"B"},{"ticker":"IVW","daily":-0.94,"intra":0.43,"5d":-1.29,"20d":-4.31,"atr_pct":1.7,"dist_sma50_atr":-1.46,"rs":75.0,"long":[],"short":[],"abc":"C"}],"Sel Sectors":[{"ticker":"XLK","daily":-1.6,"intra":0.33,"5d":-1.5,"20d":-5.52,"atr_pct":2.3,"dist_sma50_atr":-1.43,"rs":65.0,"long":["TECL"],"short":["TECS"],"abc":"C"},{"ticker":"XLI","daily":0.25,"intra":1.01,"5d":-0.05,"20d":6.8,"atr_pct":1.5,"dist_sma50_atr":4.74,"rs":55.0,"long":["DUSL"],"short":[],"abc":"A"},{"ticker":"XLC","daily":1.14,"intra":1.52,"5d":1.07,"20d":-1.45,"atr_pct":1.3,"dist_sma50_atr":0.86,"rs":70.0,"long":["LTL"],"short":[],"abc":"B"},{"ticker":"XLF","daily":-2.04,"intra":-0.87,"5d":-2.02,"20d":-3.96,"atr_pct":1.8,"dist_sma50_atr":-2.47,"rs":0.0,"long":["FAS"],"short":["FAZ"],"abc":"C"},{"ticker":"XLU","daily":1.17,"intra":1.12,"5d":3.02,"20d":10.15,"atr_pct":1.5,"dist_sma50_atr":5.89,"rs":85.0,"long":["UTSL"],"short":[],"abc":"A"},{"ticker":"XLY","daily":-0.16,"intra":0.73,"5d":-0.5,"20d":-3.57,"atr_pct":1.6,"dist_sma50_atr":-1.68,"rs":0.0,"long":["WANT"],"short":["SCC"],"abc":"C"},{"ticker":"XLRE","daily":0.48,"intra":0.67,"5d":0.64,"20d":5.97,"atr_pct":1.2,"dist_sma50_atr":4.52,"rs":85.0,"long":["DRN"],"short":["DRV"],"abc":"A"},{"ticker":"XLP","daily":1.29,"intra":1.16,"5d":2.41,"20d":9.59,"atr_pct":1.4,"dist_sma50_atr":6.11,"rs":55.0,"long":["UGE"],"short":["SZK"],"abc":"A"},{"ticker":"XLB","daily":0.77,"intra":1.04,"5d":0.85,"20d":6.82,"atr_pct":1.7,"dist_sma50_atr":4.91,"rs":55.0,"long":["UYM"],"short":["SMN"],"abc":"A"},{"ticker":"XLE","daily":1.58,"intra":0.5,"5d":1.9,"20d":10.71,"atr_pct":2.0,"dist_sma50_atr":6.63,"rs":100.0,"long":["ERX"],"short":["ERY"],"abc":"A"},{"ticker":"XLV","daily":1.77,"intra":2.21,"5d":2.16,"20d":4.15,"atr_pct":1.3,"dist_sma50_atr":1.96,"rs":65.0,"long":["CURE"],"short":[],"abc":"A"}],"EW Sectors":[{"ticker":"RSPT","daily":-0.38,"intra":1.31,"5d":0.32,"20d":-1.69,"atr_pct":2.3,"dist_sma50_atr":0.38,"rs":50.0,"long":[],"short":[],"abc":"A"},{"ticker":"RSPC","daily":1.6,"intra":2.26,"5d":2.13,"20d":1.63,"atr_pct":1.2,"dist_sma50_atr":0.8,"rs":55.0,"long":[],"short":[],"abc":"B"},{"ticker":"RSPN","daily":0.06,"intra":0.71,"5d":-0.16,"20d":5.49,"atr_pct":1.4,"dist_sma50_atr":3.94,"rs":35.0,"long":[],"short":[],"abc":"A"},{"ticker":"RSPF","daily":-1.81,"intra":-0.85,"5d":-1.29,"20d":-3.65,"atr_pct":1.6,"dist_sma50_atr":-2.29,"rs":0.0,"long":[],"short":[],"abc":"C"},{"ticker":"RSP","daily":0.12,"intra":0.79,"5d":0.43,"20d":3.25,"atr_pct":1.1,"dist_sma50_atr":3.05,"rs":50.0,"long":[],"short":[],"abc":"A"},{"ticker":"RSPD","daily":-0.56,"intra":0.46,"5d":-0.54,"20d":0.94,"atr_pct":1.5,"dist_sma50_atr":0.34,"rs":0.0,"long":[],"short":[],"abc":"A"},{"ticker":"RSPU","daily":1.16,"intra":0.72,"5d":2.69,"20d":10.54,"atr_pct":1.3,"dist_sma50_atr":7.39,"rs":85.0,"long":[],"short":[],"abc":"A"},{"ticker":"RSPR","daily":-0.43,"intra":0.61,"5d":0.22,"20d":4.03,"atr_pct":1.1,"dist_sma50_atr":3.31,"rs":55.0,"long":[],"short":[],"abc":"A"},{"ticker":"RSPH","daily":1.03,"intra":1.62,"5d":1.25,"20d":3.26,"atr_pct":1.3,"dist_sma50_atr":1.75,"rs":70.0,"long":[],"short":[],"abc":"A"},{"ticker":"RSPM","daily":0.82,"intra":1.28,"5d":0.3,"20d":7.39,"atr_pct":1.6,"dist_sma50_atr":5.08,"rs":45.0,"long":[],"short":[],"abc":"A"},{"ticker":"RSPS","daily":1.13,"intra":0.91,"5d":1.68,"20d":8.78,"atr_pct":1.4,"dist_sma50_atr":5.45,"rs":50.0,"long":[],"short":[],"abc":"A"},{"ticker":"RSPG","daily":1.52,"intra":0.56,"5d":1.36,"20d":12.24,"atr_pct":2.0,"dist_sma50_atr":6.97,"rs":100.0,"long":[],"short":[],"abc":"A"}],"Industries":[{"ticker":"TAN","daily":-4.48,"intra":-2.9,"5d":-7.98,"20d":-1.35,"atr_pct":3.7,"dist_sma50_atr":0.47,"rs":25.0,"long":[],"short":[],"abc":"A"},{"ticker":"KCE","daily":-2.58,"intra":-1.0,"5d":-0.83,"20d":-7.23,"atr_pct":2.2,"dist_sma50_atr":-2.2,"rs":15.0,"long":[],"short":[],"abc":"C"},{"ticker":"IBUY","daily":0.08,"intra":0.85,"5d":1.25,"20d":-9.4,"atr_pct":1.9,"dist_sma50_atr":-4.07,"rs":35.0,"long":[],"short":[],"abc":"C"},{"ticker":"QQQE","daily":0.03,"intra":1.18,"5d":0.72,"20d":-1.35,"atr_pct":1.4,"dist_sma50_atr":0.27,"rs":95.0,"long":[],"short":[],"abc":"B"},{"ticker":"JETS","daily":-3.98,"intra":-1.76,"5d":-3.46,"20d":0.11,"atr_pct":3.0,"dist_sma50_atr":-0.58,"rs":0.0,"long":[],"short":[],"abc":"B"},{"ticker":"IBB","daily":0.86,"intra":1.29,"5d":0.56,"20d":0.64,"atr_pct":1.9,"dist_sma50_atr":0.84,"rs":85.0,"long":[],"short":[],"abc":"A"},{"ticker":"SMH","daily":-1.37,"intra":0.77,"5d":-2.09,"20d":-2.67,"atr_pct":2.9,"dist_sma50_atr":1.35,"rs":70.0,"long":["SOXL"],"short":["SOXS"],"abc":"A"},{"ticker":"CIBR","daily":-1.5,"intra":0.82,"5d":-1.55,"20d":-9.56,"atr_pct":2.8,"dist_sma50_atr":-3.38,"rs":35.0,"long":[],"short":[],"abc":"C"},{"ticker":"UTES","daily":0.02,"intra":0.61,"5d":2.6,"20d":9.13,"atr_pct":1.8,"dist_sma50_atr":4.05,"rs":95.0,"long":[],"short":[],"abc":"A"},{"ticker":"ROBO","daily":-0.8,"intra":0.4,"5d":-0.24,"20d":6.51,"atr_pct":1.7,"dist_sma50_atr":3.93,"rs":85.0,"long":["UBOT"],"short":[],"abc":"A"},{"ticker":"IGV","daily":-1.25,"intra":1.58,"5d":0.98,"20d":-11.6,"atr_pct":3.4,"dist_sma50_atr":-4.15,"rs":65.0,"long":[],"short":[],"abc":"C"},{"ticker":"WCLD","daily":-2.01,"intra":1.06,"5d":0.0,"20d":-10.67,"atr_pct":4.2,"dist_sma50_atr":-3.19,"rs":40.0,"long":["CLDL"],"short":[],"abc":"C"},{"ticker":"ITA","daily":0.37,"intra":1.28,"5d":0.03,"20d":4.7,"atr_pct":2.0,"dist_sma50_atr":2.82,"rs":55.0,"long":["DFEN"],"short":[],"abc":"A"},{"ticker":"PAVE","daily":-0.43,"intra":0.62,"5d":-0.99,"20d":7.6,"atr_pct":1.8,"dist_sma50_atr":3.75,"rs":45.0,"long":[],"short":[],"abc":"A"},{"ticker":"BLOK","daily":-2.82,"intra":-0.83,"5d":0.41,"20d":-13.24,"atr_pct":3.9,"dist_sma50_atr":-2.18,"rs":90.0,"long":[],"short":[],"abc":"C"},{"ticker":"AIQ","daily":-0.51,"intra":1.0,"5d":0.76,"20d":-5.22,"atr_pct":2.2,"dist_sma50_atr":-0.75,"rs":95.0,"long":[],"short":[],"abc":"C"},{"ticker":"IYZ","daily":2.03,"intra":2.47,"5d":1.84,"20d":12.48,"atr_pct":1.5,"dist_sma50_atr":7.75,"rs":95.0,"long":[],"short":[],"abc":"A"},{"ticker":"PEJ","daily":-0.68,"intra":0.51,"5d":0.33,"20d":1.83,"atr_pct":1.6,"dist_sma50_atr":0.5,"rs":5.0,"long":["OOTO"],"short":[],"abc":"B"},{"ticker":"FDN","daily":0.61,"intra":1.45,"5d":2.17,"20d":-8.26,"atr_pct":2.2,"dist_sma50_atr":-2.48,"rs":75.0,"long":["WEBL"],"short":["WEBS"],"abc":"C"},{"ticker":"KBE","daily":-4.95,"intra":-3.14,"5d":-6.82,"20d":-4.68,"atr_pct":2.6,"dist_sma50_atr":-1.49,"rs":0.0,"long":[],"short":[],"abc":"B"},{"ticker":"UNG","daily":1.23,"intra":0.09,"5d":-4.08,"20d":-23.51,"atr_pct":5.7,"dist_sma50_atr":-1.28,"rs":95.0,"long":["BOIL"],"short":["KOLD"],"abc":"C"},{"ticker":"BOAT","daily":1.04,"intra":1.04,"5d":4.38,"20d":16.32,"atr_pct":1.6,"dist_sma50_atr":12.52,"rs":100.0,"long":[],"short":[],"abc":"A"},{"ticker":"KWEB","daily":-1.27,"intra":-0.45,"5d":-5.02,"20d":-14.41,"atr_pct":2.2,"dist_sma50_atr":-4.61,"rs":10.0,"long":["CWEB"],"short":[],"abc":"C"},{"ticker":"KRE","daily":-5.14,"intra":-3.09,"5d":-7.13,"20d":-3.27,"atr_pct":2.8,"dist_sma50_atr":-1.0,"rs":0.0,"long":["DPST"],"short":[],"abc":"B"},{"ticker":"IBIT","daily":-2.8,"intra":-0.83,"5d":-3.2,"20d":-21.87,"atr_pct":5.2,"dist_sma50_atr":-3.79,"rs":75.0,"long":["BITX","BITU"],"short":["SBIT","BITI"],"abc":"C"},{"ticker":"XRT","daily":-0.79,"intra":0.14,"5d":-1.89,"20d":0.73,"atr_pct":2.1,"dist_sma50_atr":-0.55,"rs":10.0,"long":["RETL"],"short":[],"abc":"C"},{"ticker":"IHI","daily":-0.2,"intra":0.64,"5d":1.42,"20d":1.18,"atr_pct":1.3,"dist_sma50_atr":-0.91,"rs":80.0,"long":[],"short":[],"abc":"C"},{"ticker":"DRIV","daily":-1.56,"intra":-0.13,"5d":0.37,"20d":-1.73,"atr_pct":1.9,"dist_sma50_atr":1.26,"rs":45.0,"long":["EVAV"],"short":[],"abc":"A"},{"ticker":"MSOS","daily":-3.0,"intra":-1.27,"5d":2.92,"20d":-5.13,"atr_pct":7.5,"dist_sma50_atr":-1.77,"rs":5.0,"long":["MSOX"],"short":[],"abc":"C"},{"ticker":"SOCL","daily":-0.24,"intra":0.53,"5d":-2.01,"20d":-14.7,"atr_pct":1.7,"dist_sma50_atr":-5.23,"rs":65.0,"long":[],"short":[],"abc":"C"},{"ticker":"XLU","daily":1.17,"intra":1.12,"5d":3.02,"20d":10.15,"atr_pct":1.5,"dist_sma50_atr":5.89,"rs":85.0,"long":["UTSL"],"short":[],"abc":"A"},{"ticker":"ARKF","daily":-1.29,"intra":0.05,"5d":1.35,"20d":-13.25,"atr_pct":3.4,"dist_sma50_atr":-3.59,"rs":90.0,"long":[],"short":[],"abc":"C"},{"ticker":"SLX","daily":0.3,"intra":0.53,"5d":1.87,"20d":4.22,"atr_pct":1.8,"dist_sma50_atr":4.81,"rs":15.0,"long":[],"short":[],"abc":"A"},{"ticker":"ARKK","daily":-2.28,"intra":0.22,"5d":1.99,"20d":-6.09,"atr_pct":3.3,"dist_sma50_atr":-1.51,"rs":95.0,"long":["TARK"],"short":["SARK"],"abc":"C"},{"ticker":"XTN","daily":-0.96,"intra":0.62,"5d":-1.62,"20d":4.86,"atr_pct":2.3,"dist_sma50_atr":1.75,"rs":10.0,"long":["TPOR"],"short":[],"abc":"A"},{"ticker":"XME","daily":-0.57,"intra":0.21,"5d":1.61,"20d":-5.85,"atr_pct":3.6,"dist_sma50_atr":0.5,"rs":15.0,"long":[],"short":[],"abc":"B"},{"ticker":"KIE","daily":0.16,"intra":0.48,"5d":0.76,"20d":-0.46,"atr_pct":1.6,"dist_sma50_atr":-0.87,"rs":15.0,"long":[],"short":[],"abc":"C"},{"ticker":"GLD","daily":1.31,"intra":0.62,"5d":3.23,"20d":-2.45,"atr_pct":2.9,"dist_sma50_atr":3.47,"rs":35.0,"long":["UGL"],"short":["GLL"],"abc":"A"},{"ticker":"GXC","daily":-0.28,"intra":-0.17,"5d":-2.61,"20d":-5.83,"atr_pct":1.3,"dist_sma50_atr":-1.68,"rs":35.0,"long":[],"short":[],"abc":"C"},{"ticker":"SCHH","daily":0.22,"intra":0.44,"5d":0.92,"20d":7.72,"atr_pct":1.2,"dist_sma50_atr":5.48,"rs":75.0,"long":[],"short":[],"abc":"A"},{"ticker":"GDX","daily":1.71,"intra":0.56,"5d":9.02,"20d":7.28,"atr_pct":3.9,"dist_sma50_atr":4.61,"rs":85.0,"long":["NUGT","GDXU"],"short":["JDST","GDXD"],"abc":"A"},{"ticker":"IPAY","daily":-0.51,"intra":-0.2,"5d":-1.65,"20d":-8.41,"atr_pct":2.2,"dist_sma50_atr":-4.0,"rs":15.0,"long":[],"short":[],"abc":"C"},{"ticker":"IWM","daily":-1.72,"intra":-0.26,"5d":-1.21,"20d":-0.74,"atr_pct":1.9,"dist_sma50_atr":0.37,"rs":5.0,"long":["TNA"],"short":["TZA"],"abc":"A"},{"ticker":"XOP","daily":2.62,"intra":1.72,"5d":1.22,"20d":10.61,"atr_pct":2.6,"dist_sma50_atr":5.0,"rs":100.0,"long":["GUSH"],"short":["DRIP"],"abc":"A"},{"ticker":"VNQ","daily":0.18,"intra":0.51,"5d":0.85,"20d":5.49,"atr_pct":1.2,"dist_sma50_atr":4.35,"rs":85.0,"long":[],"short":[],"abc":"A"},{"ticker":"EATZ","daily":-0.38,"intra":0.03,"5d":2.38,"20d":2.2,"atr_pct":1.2,"dist_sma50_atr":1.8,"rs":45.0,"long":[],"short":[],"abc":"A"},{"ticker":"FXI","daily":-0.29,"intra":-0.08,"5d":-3.94,"20d":-8.58,"atr_pct":1.6,"dist_sma50_atr":-2.75,"rs":25.0,"long":["YINN"],"short":["YANG"],"abc":"C"},{"ticker":"DBA","daily":-0.12,"intra":-0.31,"5d":-0.04,"20d":0.58,"atr_pct":0.6,"dist_sma50_atr":1.91,"rs":90.0,"long":[],"short":[],"abc":"A"},{"ticker":"ICLN","daily":-2.41,"intra":-1.51,"5d":-3.65,"20d":-1.57,"atr_pct":2.8,"dist_sma50_atr":0.79,"rs":40.0,"long":[],"short":[],"abc":"A"},{"ticker":"SILJ","daily":2.23,"intra":1.03,"5d":11.51,"20d":7.7,"atr_pct":5.0,"dist_sma50_atr":4.56,"rs":80.0,"long":[],"short":[],"abc":"A"},{"ticker":"REZ","daily":-0.38,"intra":-0.21,"5d":0.76,"20d":7.35,"atr_pct":1.2,"dist_sma50_atr":4.27,"rs":80.0,"long":[],"short":[],"abc":"A"},{"ticker":"LIT","daily":-0.49,"intra":-0.4,"5d":3.12,"20d":2.42,"atr_pct":2.4,"dist_sma50_atr":2.95,"rs":90.0,"long":[],"short":[],"abc":"A"},{"ticker":"SLV","daily":5.64,"intra":2.09,"5d":10.92,"20d":-19.49,"atr_pct":6.8,"dist_sma50_atr":1.81,"rs":5.0,"long":["AGQ"],"short":["ZSL"],"abc":"A"},{"ticker":"XHB","daily":0.03,"intra":0.73,"5d":-3.0,"20d":4.47,"atr_pct":2.4,"dist_sma50_atr":1.33,"rs":35.0,"long":["NAIL"],"short":[],"abc":"A"},{"ticker":"XHE","daily":-0.89,"intra":0.22,"5d":1.27,"20d":2.55,"atr_pct":1.6,"dist_sma50_atr":0.21,"rs":70.0,"long":[],"short":[],"abc":"B"},{"ticker":"PBJ","daily":0.99,"intra":0.77,"5d":1.47,"20d":7.44,"atr_pct":1.1,"dist_sma50_atr":7.17,"rs":60.0,"long":[],"short":[],"abc":"A"},{"ticker":"USO","daily":2.73,"intra":-0.06,"5d":1.36,"20d":3.55,"atr_pct":2.5,"dist_sma50_atr":4.33,"rs":100.0,"long":["UCO"],"short":["SCO"],"abc":"A"},{"ticker":"DBC","daily":1.37,"intra":0.0,"5d":2.03,"20d":-0.79,"atr_pct":1.4,"dist_sma50_atr":4.53,"rs":100.0,"long":[],"short":[],"abc":"A"},{"ticker":"FCG","daily":3.02,"intra":1.86,"5d":1.16,"20d":9.66,"atr_pct":2.5,"dist_sma50_atr":4.99,"rs":100.0,"long":[],"short":[],"abc":"A"},{"ticker":"XBI","daily":-0.23,"intra":1.03,"5d":2.08,"20d":0.5,"atr_pct":2.5,"dist_sma50_atr":0.74,"rs":55.0,"long":["LABU"],"short":["LABD"],"abc":"A"},{"ticker":"ARKG","daily":-1.9,"intra":0.33,"5d":4.06,"20d":-4.37,"atr_pct":3.8,"dist_sma50_atr":-0.25,"rs":90.0,"long":[],"short":[],"abc":"C"},{"ticker":"CPER","daily":0.41,"intra":-0.7,"5d":1.96,"20d":-4.73,"atr_pct":2.4,"dist_sma50_atr":1.24,"rs":25.0,"long":[],"short":[],"abc":"A"},{"ticker":"XES","daily":0.67,"intra":0.27,"5d":1.34,"20d":13.96,"atr_pct":2.8,"dist_sma50_atr":6.48,"rs":95.0,"long":[],"short":[],"abc":"A"},{"ticker":"OIH","daily":0.37,"intra":-0.25,"5d":1.9,"20d":13.42,"atr_pct":2.7,"dist_sma50_atr":6.58,"rs":100.0,"long":[],"short":[],"abc":"A"},{"ticker":"PPH","daily":2.01,"intra":1.91,"5d":1.2,"20d":5.73,"atr_pct":1.4,"dist_sma50_atr":3.49,"rs":55.0,"long":["PILL"],"short":[],"abc":"A"},{"ticker":"FNGS","daily":0.18,"intra":0.91,"5d":0.06,"20d":-6.39,"atr_pct":2.1,"dist_sma50_atr":-2.51,"rs":100.0,"long":["FNGB"],"short":["FNGD"],"abc":"C"},{"ticker":"URA","daily":-0.97,"intra":-0.02,"5d":-0.04,"20d":-8.41,"atr_pct":4.6,"dist_sma50_atr":1.34,"rs":95.0,"long":[],"short":[],"abc":"A"},{"ticker":"WGMI","daily":-5.43,"intra":-2.47,"5d":2.66,"20d":-18.18,"atr_pct":8.1,"dist_sma50_atr":-0.96,"rs":100.0,"long":[],"short":[],"abc":"C"},{"ticker":"REMX","daily":2.36,"intra":-0.03,"5d":12.2,"20d":6.77,"atr_pct":3.7,"dist_sma50_atr":4.31,"rs":100.0,"long":[],"short":[],"abc":"A"},{"ticker":"XTL","daily":0.0,"intra":0.0,"5d":0.0,"20d":0.0,"atr_pct":null,"dist_sma50_atr":null,"rs":null,"long":[],"short":[],"abc":null},{"ticker":"VCX","daily":0.0,"intra":0.0,"5d":0.0,"20d":0.0,"atr_pct":null,"dist_sma50_atr":null,"rs":null,"long":[],"short":[],"abc":null}],"Countries":[{"ticker":"EZA","daily":1.04,"intra":0.84,"5d":5.63,"20d":2.54,"atr_pct":2.3,"dist_sma50_atr":4.7,"rs":75.0,"long":[],"short":[],"abc":"A"},{"ticker":"ARGT","daily":-1.47,"intra":-1.12,"5d":-6.01,"20d":-11.54,"atr_pct":3.2,"dist_sma50_atr":-1.28,"rs":30.0,"long":[],"short":[],"abc":"C"},{"ticker":"EWA","daily":-0.17,"intra":-0.07,"5d":1.31,"20d":5.88,"atr_pct":1.3,"dist_sma50_atr":6.83,"rs":90.0,"long":[],"short":[],"abc":"A"},{"ticker":"THD","daily":0.32,"intra":0.07,"5d":3.66,"20d":17.36,"atr_pct":1.3,"dist_sma50_atr":12.65,"rs":90.0,"long":[],"short":[],"abc":"A"},{"ticker":"EIDO","daily":-0.39,"intra":-0.39,"5d":-1.33,"20d":1.37,"atr_pct":1.4,"dist_sma50_atr":-2.16,"rs":30.0,"long":[],"short":[],"abc":"C"},{"ticker":"EWC","daily":-0.29,"intra":0.05,"5d":1.43,"20d":2.57,"atr_pct":1.5,"dist_sma50_atr":3.35,"rs":65.0,"long":[],"short":[],"abc":"A"},{"ticker":"GREK","daily":-1.87,"intra":-0.28,"5d":-0.31,"20d":-6.53,"atr_pct":1.9,"dist_sma50_atr":0.05,"rs":0.0,"long":[],"short":[],"abc":"B"},{"ticker":"EWP","daily":-1.51,"intra":-1.26,"5d":0.39,"20d":1.56,"atr_pct":1.5,"dist_sma50_atr":2.25,"rs":0.0,"long":[],"short":[],"abc":"A"},{"ticker":"EWG","daily":-0.49,"intra":-0.2,"5d":0.05,"20d":2.07,"atr_pct":1.0,"dist_sma50_atr":2.24,"rs":15.0,"long":[],"short":[],"abc":"A"},{"ticker":"EWL","daily":0.7,"intra":-0.09,"5d":1.09,"20d":4.6,"atr_pct":1.0,"dist_sma50_atr":5.75,"rs":45.0,"long":[],"short":[],"abc":"A"},{"ticker":"EUFN","daily":-1.49,"intra":-1.13,"5d":-0.55,"20d":-1.98,"atr_pct":1.7,"dist_sma50_atr":0.28,"rs":0.0,"long":[],"short":[],"abc":"A"},{"ticker":"EWY","daily":0.64,"intra":2.16,"5d":6.69,"20d":21.58,"atr_pct":2.8,"dist_sma50_atr":10.66,"rs":100.0,"long":["KORU"],"short":[],"abc":"A"},{"ticker":"IEUR","daily":-0.25,"intra":-0.18,"5d":0.25,"20d":2.14,"atr_pct":1.0,"dist_sma50_atr":4.16,"rs":15.0,"long":[],"short":[],"abc":"A"},{"ticker":"EFA","daily":-0.18,"intra":-0.13,"5d":0.46,"20d":3.63,"atr_pct":1.0,"dist_sma50_atr":5.23,"rs":25.0,"long":[],"short":[],"abc":"A"},{"ticker":"ACWI","daily":-0.39,"intra":0.25,"5d":-0.17,"20d":0.46,"atr_pct":1.1,"dist_sma50_atr":1.69,"rs":50.0,"long":[],"short":[],"abc":"A"},{"ticker":"IEV","daily":-0.44,"intra":-0.28,"5d":0.09,"20d":2.14,"atr_pct":1.0,"dist_sma50_atr":4.04,"rs":15.0,"long":["EURL"],"short":[],"abc":"A"},{"ticker":"EWQ","daily":-0.99,"intra":-0.15,"5d":0.4,"20d":4.47,"atr_pct":1.0,"dist_sma50_atr":4.29,"rs":65.0,"long":[],"short":[],"abc":"A"},{"ticker":"EWI","daily":-1.04,"intra":-0.74,"5d":0.92,"20d":2.07,"atr_pct":1.3,"dist_sma50_atr":2.53,"rs":15.0,"long":[],"short":[],"abc":"A"},{"ticker":"EWJ","daily":-0.12,"intra":-0.32,"5d":0.98,"20d":7.29,"atr_pct":1.3,"dist_sma50_atr":5.76,"rs":35.0,"long":["EZJ"],"short":[],"abc":"A"},{"ticker":"EWW","daily":0.35,"intra":0.8,"5d":-0.36,"20d":3.17,"atr_pct":2.0,"dist_sma50_atr":3.91,"rs":30.0,"long":["MEXX"],"short":[],"abc":"A"},{"ticker":"ECH","daily":-1.89,"intra":-0.59,"5d":-0.18,"20d":-7.21,"atr_pct":2.4,"dist_sma50_atr":0.05,"rs":5.0,"long":[],"short":[],"abc":"B"},{"ticker":"EWD","daily":0.29,"intra":0.2,"5d":1.33,"20d":2.38,"atr_pct":1.3,"dist_sma50_atr":4.47,"rs":30.0,"long":[],"short":[],"abc":"A"},{"ticker":"ASHR","daily":-0.23,"intra":0.03,"5d":-0.03,"20d":0.38,"atr_pct":1.0,"dist_sma50_atr":1.72,"rs":60.0,"long":["CHAU"],"short":[],"abc":"A"},{"ticker":"EWS","daily":-0.1,"intra":-0.45,"5d":-2.24,"20d":-0.21,"atr_pct":1.1,"dist_sma50_atr":1.63,"rs":75.0,"long":[],"short":[],"abc":"A"},{"ticker":"KSA","daily":0.11,"intra":0.36,"5d":-3.78,"20d":-6.77,"atr_pct":1.3,"dist_sma50_atr":-1.76,"rs":45.0,"long":[],"short":[],"abc":"B"},{"ticker":"INDA","daily":-0.59,"intra":0.31,"5d":-2.15,"20d":1.28,"atr_pct":1.1,"dist_sma50_atr":-1.39,"rs":70.0,"long":["INDL"],"short":[],"abc":"C"},{"ticker":"EEM","daily":-0.21,"intra":0.61,"5d":0.38,"20d":3.54,"atr_pct":1.8,"dist_sma50_atr":4.02,"rs":100.0,"long":["EDC"],"short":["EDZ"],"abc":"A"},{"ticker":"EWZ","daily":-0.95,"intra":-0.03,"5d":-1.63,"20d":1.6,"atr_pct":2.1,"dist_sma50_atr":4.53,"rs":45.0,"long":["BRZU"],"short":[],"abc":"A"},{"ticker":"TUR","daily":-1.46,"intra":-0.47,"5d":-2.45,"20d":-2.28,"atr_pct":1.5,"dist_sma50_atr":3.4,"rs":0.0,"long":[],"short":[],"abc":"A"},{"ticker":"EWH","daily":1.42,"intra":0.5,"5d":1.89,"20d":2.07,"atr_pct":1.3,"dist_sma50_atr":5.07,"rs":90.0,"long":[],"short":[],"abc":"A"},{"ticker":"EWT","daily":-0.62,"intra":0.97,"5d":1.73,"20d":8.36,"atr_pct":1.9,"dist_sma50_atr":5.63,"rs":95.0,"long":[],"short":[],"abc":"A"},{"ticker":"MCHI","daily":-0.29,"intra":-0.12,"5d":-3.2,"20d":-8.05,"atr_pct":1.5,"dist_sma50_atr":-2.62,"rs":45.0,"long":[],"short":[],"abc":"C"}]},"column_ranges":{"Indices":{"daily":[-5.04,0.61],"intra":[-1.49,1.18],"5d":[-3.2,1.58],"20d":[-31.22,4.05]},"S&P Style ETFs":{"daily":[-1.33,0.07],"intra":[-0.2,0.76],"5d":[-2.34,0.41],"20d":[-4.31,4.42]},"Sel Sectors":{"daily":[-2.04,1.77],"intra":[-0.87,2.21],"5d":[-2.02,3.02],"20d":[-5.52,10.71]},"EW Sectors":{"daily":[-1.81,1.6],"intra":[-0.85,2.26],"5d":[-1.29,2.69],"20d":[-3.65,12.24]},"Industries":{"daily":[-5.43,5.64],"intra":[-3.14,2.47],"5d":[-7.98,12.2],"20d":[-23.51,16.32]},"Countries":{"daily":[-1.89,1.42],"intra":[-1.26,2.16],"5d":[-6.01,6.69],"20d":[-11.54,21.58]}}};

const EVENTS = [{"date":"02/03/2026","time":"15:00","event":"ISM Manufacturing PMI  (Feb)"},{"date":"02/03/2026","time":"15:00","event":"ISM Manufacturing Prices  (Feb)"},{"date":"04/03/2026","time":"13:15","event":"ADP Nonfarm Employment Change  (Feb)"},{"date":"04/03/2026","time":"15:00","event":"ISM Non-Manufacturing PMI  (Feb)"},{"date":"04/03/2026","time":"15:00","event":"ISM Non-Manufacturing Prices  (Feb)"},{"date":"05/03/2026","time":"13:30","event":"Initial Jobless Claims"},{"date":"06/03/2026","time":"12:30","event":"Core Retail Sales (MoM)  (Jan)"},{"date":"06/03/2026","time":"12:30","event":"Retail Sales (MoM)  (Jan)"},{"date":"06/03/2026","time":"13:30","event":"Nonfarm Payrolls  (Feb)"},{"date":"06/03/2026","time":"13:30","event":"Unemployment Rate  (Feb)"}];

const META = {"SECTOR_COLORS":{"Information Technology":"#3f51b5","Industrials":"#555","Emerging Markets":"#00bcd4","Consumer Discretionary":"#4caf50","Health Care":"#e91e63","Financials":"#ff5722","Energy":"#795548","Communication Services":"#9c27b0","Real Estate":"#673ab7","Commodities":"#8b6914","Materials":"#ff9800","Utilities":"#009688","Consumer Staples":"#8bc34a","Broad Market":"#9e9e9e"},"TICKER_TO_SECTOR":{"SMH":"Information Technology","ARKK":"Information Technology","XTN":"Industrials","KWEB":"Emerging Markets","XRT":"Consumer Discretionary","KRE":"Financials","ARKF":"Information Technology","ARKG":"Health Care","BOAT":"Industrials","DRIV":"Consumer Discretionary","KBE":"Financials","XES":"Energy","XBI":"Health Care","OIH":"Energy","SOCL":"Communication Services","ROBO":"Industrials","AIQ":"Information Technology","XHB":"Consumer Discretionary","FNGS":"Broad Market","BLOK":"Information Technology","LIT":"Materials","WCLD":"Information Technology","XOP":"Energy","FDN":"Consumer Discretionary","TAN":"Energy","IBB":"Health Care","PAVE":"Industrials","PEJ":"Consumer Discretionary","KCE":"Financials","XHE":"Health Care","IBUY":"Consumer Discretionary","MSOS":"Consumer Discretionary","FCG":"Energy","JETS":"Consumer Discretionary","IPAY":"Financials","SLX":"Materials","IGV":"Information Technology","CIBR":"Information Technology","EATZ":"Consumer Discretionary","PPH":"Health Care","IHI":"Health Care","UTES":"Utilities","ICLN":"Energy","XME":"Materials","IYZ":"Communication Services","URA":"Energy","ITA":"Industrials","VNQ":"Real Estate","SCHH":"Real Estate","KIE":"Financials","REZ":"Real Estate","CPER":"Commodities","PBJ":"Consumer Staples","SLV":"Commodities","GLD":"Commodities","SILJ":"Materials","GDX":"Materials","FXI":"Emerging Markets","GXC":"Emerging Markets","USO":"Commodities","DBA":"Commodities","UNG":"Commodities","DBC":"Commodities","WGMI":"Information Technology","REMX":"Materials","XTL":"Communication Services","VCX":"Information Technology"},"Industries_COLORS":{"SMH":"#3f51b5","ARKK":"#3f51b5","XTN":"#555","KWEB":"#00bcd4","XRT":"#4caf50","KRE":"#ff5722","ARKF":"#3f51b5","ARKG":"#e91e63","BOAT":"#555","DRIV":"#4caf50","KBE":"#ff5722","XES":"#795548","XBI":"#e91e63","OIH":"#795548","SOCL":"#9c27b0","ROBO":"#555","AIQ":"#3f51b5","XHB":"#4caf50","FNGS":"#9e9e9e","BLOK":"#3f51b5","LIT":"#ff9800","WCLD":"#3f51b5","XOP":"#795548","FDN":"#4caf50","TAN":"#795548","IBB":"#e91e63","PAVE":"#555","PEJ":"#4caf50","KCE":"#ff5722","XHE":"#e91e63","IBUY":"#4caf50","MSOS":"#4caf50","FCG":"#795548","JETS":"#4caf50","IPAY":"#ff5722","SLX":"#ff9800","IGV":"#3f51b5","CIBR":"#3f51b5","EATZ":"#4caf50","PPH":"#e91e63","IHI":"#e91e63","UTES":"#009688","ICLN":"#795548","XME":"#ff9800","IYZ":"#9c27b0","URA":"#795548","ITA":"#555","VNQ":"#673ab7","SCHH":"#673ab7","KIE":"#ff5722","REZ":"#673ab7","CPER":"#8b6914","PBJ":"#8bc34a","SLV":"#8b6914","GLD":"#8b6914","SILJ":"#ff9800","GDX":"#ff9800","FXI":"#00bcd4","GXC":"#00bcd4","USO":"#8b6914","DBA":"#8b6914","UNG":"#8b6914","DBC":"#8b6914","WGMI":"#3f51b5","REMX":"#ff9800","XTL":"#9c27b0","VCX":"#3f51b5"},"SECTOR_ORDER":["Information Technology","Industrials","Emerging Markets","Consumer Discretionary","Health Care","Financials","Energy","Communication Services","Real Estate","Commodities","Materials","Utilities","Consumer Staples","Broad Market"],"default_symbol":"QQQE"};

const GROUP_ORDER = ['Indices', 'S&P Style ETFs', 'Sel Sectors', 'EW Sectors', 'Industries', 'Countries'];

function vizWidth(value, minVal, maxVal) {
  if (value == null || minVal >= maxVal) return 0;
  if (value >= 0) return maxVal <= 0 ? 0 : Math.min(100, Math.max(0, (value / maxVal) * 100));
  return minVal >= 0 ? 0 : Math.min(100, Math.max(0, (Math.abs(value) / Math.abs(minVal)) * 100));
}

function fmt(v, decimals = 2) {
  if (v == null) return 'N/A';
  return (v >= 0 ? '+' : '') + v.toFixed(decimals) + '%';
}

function PctCell({ value, minVal, maxVal }) {
  if (value == null) return <td style={styles.td}>—</td>;
  const w = vizWidth(value, minVal, maxVal);
  const pos = value >= 0;
  const color = pos ? '#10b981' : '#ef4444';
  return (
    <td style={styles.td}>
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', minWidth: 58, padding: '1px 4px', borderRadius: 3 }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, borderRadius: 3, opacity: 0.18, background: color, width: w + '%', left: pos ? 0 : 'auto', right: pos ? 'auto' : 0 }} />
        <span style={{ position: 'relative', color, fontWeight: 600, fontSize: 11, letterSpacing: '-0.3px' }}>{fmt(value)}</span>
      </div>
    </td>
  );
}

function AbcBadge({ grade }) {
  const colors = { A: '#3b82f6', B: '#10b981', C: '#f59e0b' };
  if (!grade) return <td style={styles.td}><span style={{ color: '#666' }}>—</span></td>;
  return (
    <td style={styles.td}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', background: colors[grade] || '#555', color: '#fff', fontWeight: 700, fontSize: 11 }}>{grade}</span>
    </td>
  );
}

function RsBar({ value }) {
  if (value == null) return <td style={styles.td}>—</td>;
  const pct = Math.round(value);
  const hue = Math.round((pct / 100) * 120);
  const color = `hsl(${hue},70%,50%)`;
  return (
    <td style={styles.td}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{ width: 46, height: 6, background: '#2a2a2a', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ width: pct + '%', height: '100%', background: color, borderRadius: 3 }} />
        </div>
        <span style={{ fontSize: 11, color: '#aaa', minWidth: 28 }}>{pct}%</span>
      </div>
    </td>
  );
}

function TickerLabel({ ticker, groupName }) {
  const bg = groupName === 'Industries' && META.Industries_COLORS[ticker]
    ? META.Industries_COLORS[ticker] : '#374151';
  return (
    <span style={{ display: 'inline-block', padding: '1px 7px', borderRadius: 10, background: bg, color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.3px', fontFamily: 'monospace' }}>{ticker}</span>
  );
}

const SORT_KEYS = { symbol: 'ticker', abc: 'abc', daily: 'daily', intra: 'intra', '5d': '5d', '20d': '20d', atr_pct: 'atr_pct', dist_sma50_atr: 'dist_sma50_atr', rs: 'rs' };

function sortRows(rows, sortBy, direction, groupName) {
  const sorted = [...rows];
  sorted.sort((a, b) => {
    if (sortBy === 'ticker') {
      return a.ticker.localeCompare(b.ticker) * direction;
    } else if (sortBy === 'abc') {
      return (a.abc || 'Z').localeCompare(b.abc || 'Z') * direction;
    } else {
      return ((a[sortBy] ?? -Infinity) - (b[sortBy] ?? -Infinity)) * direction;
    }
  });
  return sorted;
}

const COLS = [
  { key: 'symbol', label: 'Ticker' },
  { key: 'abc', label: 'Grade' },
  { key: 'daily', label: 'Daily' },
  { key: 'intra', label: 'Intra' },
  { key: '5d', label: '5D' },
  { key: '20d', label: '20D' },
  { key: 'atr_pct', label: 'ATR%' },
  { key: 'dist_sma50_atr', label: 'ATRx' },
  { key: 'rs', label: 'VARS' },
  { key: 'letf', label: 'LETF' },
];

const styles = {
  th: { padding: '5px 7px', textAlign: 'left', background: '#1e2433', color: '#8b95a8', fontSize: 10, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', borderBottom: '1px solid #252d3d', cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' },
  thActive: { color: '#c8d0e0', background: '#252d3d' },
  td: { padding: '4px 7px', borderBottom: '1px solid #1a1f2e', verticalAlign: 'middle', fontSize: 12, color: '#c8d0e0', whiteSpace: 'nowrap' },
};

function GroupTable({ groupName, rows, ranges, activeSymbol, onSelect, sortState, onSort }) {
  const { sortBy, direction } = sortState;
  const displayRows = useMemo(() => {
    if (!sortBy) return rows;
    return sortRows(rows, SORT_KEYS[sortBy] || sortBy, direction, groupName);
  }, [rows, sortBy, direction, groupName]);

  const getSortIcon = (key) => {
    if (sortState.sortBy !== key) return ' ·';
    return sortState.direction === 1 ? ' ↑' : ' ↓';
  };

  return (
    <div style={{ marginBottom: 0 }}>
      <div style={{ background: '#1a2035', borderBottom: '2px solid #252d3d', padding: '5px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, position: 'sticky', top: 64, zIndex: 2 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#a0aec0', letterSpacing: '1px', textTransform: 'uppercase' }}>{groupName}</span>
        {groupName === 'Industries' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {META.SECTOR_ORDER.map(s => (
              <span key={s} style={{ fontSize: 9, padding: '1px 5px', borderRadius: 8, background: META.SECTOR_COLORS[s], color: '#fff', fontWeight: 600 }}>{s}</span>
            ))}
          </div>
        )}
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: 68 }} /><col style={{ width: 46 }} /><col style={{ width: 76 }} /><col style={{ width: 76 }} />
          <col style={{ width: 76 }} /><col style={{ width: 76 }} /><col style={{ width: 50 }} /><col style={{ width: 50 }} />
          <col style={{ width: 82 }} /><col style={{ width: 'auto' }} />
        </colgroup>
        <thead>
          <tr>
            {COLS.map(col => (
              <th key={col.key} style={{ ...styles.th, ...(sortState.sortBy === col.key ? styles.thActive : {}) }} onClick={() => col.key !== 'letf' && onSort(col.key)}>
                {col.label}{col.key !== 'letf' ? getSortIcon(col.key) : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayRows.map(r => {
            const isActive = r.ticker === activeSymbol;
            const rng = ranges;
            return (
              <tr key={r.ticker} onClick={() => onSelect(r.ticker)}
                style={{ cursor: 'pointer', background: isActive ? '#1e3a5f' : 'transparent', transition: 'background 0.1s' }}
                onMouseEnter={e => !isActive && (e.currentTarget.style.background = '#1c2235')}
                onMouseLeave={e => !isActive && (e.currentTarget.style.background = 'transparent')}>
                <td style={styles.td}><TickerLabel ticker={r.ticker} groupName={groupName} /></td>
                <AbcBadge grade={r.abc} />
                <PctCell value={r.daily} minVal={rng.daily[0]} maxVal={rng.daily[1]} />
                <PctCell value={r.intra} minVal={rng.intra[0]} maxVal={rng.intra[1]} />
                <PctCell value={r['5d']} minVal={rng['5d'][0]} maxVal={rng['5d'][1]} />
                <PctCell value={r['20d']} minVal={rng['20d'][0]} maxVal={rng['20d'][1]} />
                <td style={{ ...styles.td, color: '#8b95a8' }}>{r.atr_pct != null ? r.atr_pct.toFixed(1) + '%' : '—'}</td>
                <td style={{ ...styles.td, color: r.dist_sma50_atr > 0 ? '#10b981' : r.dist_sma50_atr < 0 ? '#ef4444' : '#8b95a8' }}>
                  {r.dist_sma50_atr != null ? (r.dist_sma50_atr > 0 ? '+' : '') + r.dist_sma50_atr.toFixed(2) : '—'}
                </td>
                <RsBar value={r.rs} />
                <td style={{ ...styles.td, fontSize: 10 }}>
                  {r.long?.map(e => <span key={e} onClick={ev => { ev.stopPropagation(); onSelect(e); }} style={{ color: '#4ade80', cursor: 'pointer', marginRight: 3, fontWeight: 600 }}>{e}</span>)}
                  {r.short?.map(e => <span key={e} onClick={ev => { ev.stopPropagation(); onSelect(e); }} style={{ color: '#f87171', cursor: 'pointer', marginRight: 3, fontWeight: 600 }}>{e}</span>)}
                  {(!r.long?.length && !r.short?.length) && <span style={{ color: '#444' }}>—</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function Dashboard() {
  const [activeSymbol, setActiveSymbol] = useState('QQQE');
  const [showEvents, setShowEvents] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [sortStates, setSortStates] = useState(() =>
    Object.fromEntries(GROUP_ORDER.map(g => [g, { sortBy: null, direction: 1, count: 0 }]))
  );
  const listRef = useRef(null);
  const activeRowRef = useRef(null);

  const allRows = useMemo(() => {
    const rows = [];
    for (const g of GROUP_ORDER) {
      const groupRows = SNAPSHOT.groups[g] || [];
      const st = sortStates[g];
      const displayed = st.sortBy ? sortRows(groupRows, SORT_KEYS[st.sortBy] || st.sortBy, st.direction, g) : groupRows;
      displayed.forEach(r => rows.push({ ticker: r.ticker, group: g }));
    }
    return rows;
  }, [sortStates]);

  const activeIndex = useMemo(() => allRows.findIndex(r => r.ticker === activeSymbol), [allRows, activeSymbol]);

  const handleSelect = useCallback((symbol) => {
    setActiveSymbol(symbol);
  }, []);

  const handleSort = useCallback((groupName, key) => {
    setSortStates(prev => {
      const st = { ...prev[groupName] };
      if (st.sortBy === key) {
        st.count++;
        if (st.count >= 3) return { ...prev, [groupName]: { sortBy: null, direction: 1, count: 0 } };
        st.direction *= -1;
      } else {
        st.sortBy = key; st.direction = 1; st.count = 1;
      }
      return { ...prev, [groupName]: st };
    });
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const delta = e.key === 'ArrowDown' ? 1 : -1;
        const newIdx = Math.max(0, Math.min(allRows.length - 1, activeIndex + delta));
        if (allRows[newIdx]) setActiveSymbol(allRows[newIdx].ticker);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeIndex, allRows]);

  // Auto-scroll active row into view
  useEffect(() => {
    if (activeRowRef.current) {
      activeRowRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [activeSymbol]);

  const tvSrc = `https://s.tradingview.com/widgetembed/?frameElementId=tv_chart&symbol=${encodeURIComponent(activeSymbol)}&interval=D&theme=dark&style=1&hide_side_toolbar=0&allow_symbol_change=1&withdateranges=1&studies=STD%3BMA%2520Ribbon&timezone=America%2FToronto&toolbar_bg=%231a1a2e&backgroundColor=%230d1117`;

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0d1117', color: '#c8d0e0', fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace", overflow: 'hidden' }}>
      {/* Left Panel */}
      <div ref={listRef} style={{ width: 680, minWidth: 680, display: 'flex', flexDirection: 'column', borderRight: '1px solid #1e2433', overflow: 'hidden' }}>
        {/* Top bar */}
        <div style={{ background: '#0d1117', borderBottom: '1px solid #1e2433', padding: '0 8px', display: 'flex', gap: 6, position: 'sticky', top: 0, zIndex: 10 }}>
          {/* Events */}
          <div style={{ position: 'relative', flex: 1 }}>
            <button onClick={() => { setShowEvents(p => !p); setShowGuide(false); }}
              style={{ width: '100%', background: 'none', border: 'none', borderRight: '1px solid #1e2433', color: '#8b95a8', padding: '8px 10px', textAlign: 'left', cursor: 'pointer', fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', fontFamily: 'inherit' }}>
              📅 MACRO EVENTS {showEvents ? '▲' : '▼'}
            </button>
            {showEvents && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#131929', border: '1px solid #1e2433', zIndex: 100, maxHeight: 320, overflowY: 'auto', borderRadius: '0 0 6px 6px' }}>
                {EVENTS.map((ev, i) => (
                  <div key={i} style={{ padding: '8px 12px', borderBottom: '1px solid #1e2433', fontSize: 11 }}>
                    <span style={{ color: '#7c8cf8', fontWeight: 700 }}>{ev.date} {ev.time}</span>
                    <span style={{ color: '#8b95a8', marginLeft: 8 }}>{ev.event.trim()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Column Guide */}
          <div style={{ position: 'relative', flex: 1 }}>
            <button onClick={() => { setShowGuide(p => !p); setShowEvents(false); }}
              style={{ width: '100%', background: 'none', border: 'none', color: '#8b95a8', padding: '8px 10px', textAlign: 'left', cursor: 'pointer', fontSize: 10, fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', fontFamily: 'inherit' }}>
              📋 COLUMN GUIDE {showGuide ? '▲' : '▼'}
            </button>
            {showGuide && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#131929', border: '1px solid #1e2433', zIndex: 100, borderRadius: '0 0 6px 6px', padding: 12, fontSize: 11 }}>
                {[['Grade','A = EMA10>EMA20>SMA50 uptrend · B = mixed · C = downtrend'],['ATRx','Distance from SMA50 in ATR units. Positive = above SMA50.'],['VARS','Volatility-Adjusted Relative Strength vs SPY (0–100 percentile, rolling 21d)'],['ATR%','Average True Range as % of price — measures volatility'],['LETF','Green = leveraged long · Red = leveraged short']].map(([k,v]) => (
                  <div key={k} style={{ marginBottom: 6 }}>
                    <span style={{ color: '#7c8cf8', fontWeight: 700 }}>{k}</span>
                    <span style={{ color: '#8b95a8', marginLeft: 8 }}>{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scrollable tables */}
        <div style={{ flex: 1, overflowY: 'auto' }} onClick={() => { setShowEvents(false); setShowGuide(false); }}>
          {GROUP_ORDER.map(groupName => {
            const rows = SNAPSHOT.groups[groupName] || [];
            const ranges = SNAPSHOT.column_ranges[groupName] || { daily: [-10, 10], intra: [-10, 10], '5d': [-20, 20], '20d': [-30, 30] };
            return (
              <GroupTable
                key={groupName}
                groupName={groupName}
                rows={rows}
                ranges={ranges}
                activeSymbol={activeSymbol}
                onSelect={handleSelect}
                sortState={sortStates[groupName]}
                onSort={(key) => handleSort(groupName, key)}
              />
            );
          })}
          <div style={{ padding: '8px 10px', fontSize: 10, color: '#4a5568', borderTop: '1px solid #1e2433', background: '#0d1117' }}>
            ↑ ↓ arrow keys to navigate · Data from 2026-03-01 · Yahoo Finance via GitHub Actions
          </div>
        </div>
      </div>

      {/* Right Panel: Chart */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0d1117', minWidth: 0 }}>
        <div style={{ padding: '6px 12px', borderBottom: '1px solid #1e2433', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0', letterSpacing: '0.5px' }}>{activeSymbol}</span>
          <span style={{ fontSize: 10, color: '#4a5568' }}>TradingView · Daily · MA Ribbon</span>
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <iframe
            key={activeSymbol}
            src={tvSrc}
            style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            allowTransparency="true"
            allowFullScreen
            title="TradingView Chart"
          />
        </div>
      </div>
    </div>
  );
}

export function computeTrend(dataPoints, dataKey) {
    if (!dataPoints || dataPoints.length < 2) return 0;
    const last = dataPoints[dataPoints.length - 1][dataKey];
    const prev = dataPoints[dataPoints.length - 2][dataKey];
    if (!prev) return 0;
    return Math.round(((last - prev) / prev) * 1000) / 10;
}

export function getYDomain(dataPoints, dataKey, paddingRatio = 0.15) {
    const values = dataPoints
        .map((d) => d[dataKey])
        .filter((v) => typeof v === "number");
    if (!values.length) return [0, 1];
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || Math.abs(max) * 0.1 || 1;
    const pad = range * paddingRatio;
    return [Math.floor(min - pad), Math.ceil(max + pad)];
}

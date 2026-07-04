export default function ChartLegendSvg({color, size}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width={size}
            height={size} rx={size/3} fill={color} />
        </svg>
    );
}

import { cn } from "@/presentation/lib/utils";

interface Props {
  fill?: string;
  className?: string;
  testId?: string;
}

export const DocuCofiLogo = ({ className, fill, testId }: Props) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="21.2 15.4 128.5 128.5"
      preserveAspectRatio="xMidYMid meet"
      className={cn("w-10 h-10", className)}
      data-testid={testId || "docucofi-logo-svg"}
    >
      <g
        transform="translate(0.000000,177.000000) scale(0.050000,-0.050000)"
        fill={fill || "currentColor"}
        stroke="none"
      >
        <path d="M1582 3159 c-125 -90 -202 -223 -202 -348 0 -112 23 -159 179 -361 148 -193 168 -299 88 -455 -38 -74 -8 -69 96 17 233 193 245 391 37 639 -164 197 -205 345 -132 486 47 90 34 94 -66 22z" />
        <path d="M914 2343 l-214 -217 0 -498 0 -499 225 -224 226 -225 415 0 c618 0 601 -17 610 597 l7 428 93 -11 c231 -26 260 -369 36 -425 -69 -18 -79 -149 -11 -149 299 0 416 463 165 654 -81 62 14 55 -906 71 l-280 5 0 -75 0 -75 381 0 381 0 -6 -412 c-7 -511 31 -468 -420 -468 l-336 0 0 189 c0 240 -12 251 -264 251 l-176 0 0 400 0 400 156 0 c196 0 204 8 204 203 l0 155 120 6 121 6 -46 65 c-41 59 -54 64 -156 65 l-111 0 -214 -217z m243 -1333 c1 -60 -5 -110 -13 -110 -9 0 -64 50 -124 110 l-109 110 123 0 122 0 1 -110z" />
      </g>
    </svg>
  );
};

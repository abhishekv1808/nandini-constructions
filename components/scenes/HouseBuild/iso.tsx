/**
 * Tiny isometric toolkit for the HouseBuild SVG. World units: x → right-down, y → left-down,
 * z → up. 1 unit ≈ 1 m. Only the three faces facing the viewer (+x, +y, top) are ever drawn,
 * and pieces are emitted back-to-front so plain DOM order does the occlusion.
 */
import type { SVGProps } from 'react';

const C = Math.cos(Math.PI / 6);
const S = 0.5;
export const UNIT = 20;

export type P3 = readonly [number, number, number];
export type Range = readonly [number, number];

export function iso([x, y, z]: P3): [number, number] {
  return [(x - y) * C * UNIT, ((x + y) * S - z) * UNIT];
}

export function points(...ps: P3[]): string {
  return ps
    .map((p) => {
      const [px, py] = iso(p);
      return `${px.toFixed(1)},${py.toFixed(1)}`;
    })
    .join(' ');
}

export type Shades = { top: string; right: string; left: string };

const EDGE = { stroke: 'rgba(20,23,28,0.18)', strokeWidth: 0.6, strokeLinejoin: 'round' as const };

type PieceProps = Omit<SVGProps<SVGGElement>, 'x' | 'y' | 'z'>;

/** Rectangular prism. Visible faces: top (z1), +x (x1) and +y (y1). */
export function Box({
  x: [x0, x1],
  y: [y0, y1],
  z: [z0, z1],
  shades,
  ...rest
}: { x: Range; y: Range; z: Range; shades: Shades } & PieceProps) {
  return (
    <g data-piece="" {...rest}>
      <polygon
        {...EDGE}
        fill={shades.left}
        points={points([x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1])}
      />
      <polygon
        {...EDGE}
        fill={shades.right}
        points={points([x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1])}
      />
      <polygon
        {...EDGE}
        fill={shades.top}
        points={points([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1])}
      />
    </g>
  );
}

/** Flat rectangle in the plane x = const (a "right" face). */
export function FaceX({
  x,
  y: [y0, y1],
  z: [z0, z1],
  fill,
  edge = true,
}: {
  x: number;
  y: Range;
  z: Range;
  fill: string;
  edge?: boolean;
}) {
  return (
    <polygon
      {...(edge ? EDGE : {})}
      fill={fill}
      points={points([x, y0, z0], [x, y1, z0], [x, y1, z1], [x, y0, z1])}
    />
  );
}

/** Flat rectangle in the plane y = const (a "left" face). */
export function FaceY({
  y,
  x: [x0, x1],
  z: [z0, z1],
  fill,
  edge = true,
}: {
  y: number;
  x: Range;
  z: Range;
  fill: string;
  edge?: boolean;
}) {
  return (
    <polygon
      {...(edge ? EDGE : {})}
      fill={fill}
      points={points([x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1])}
    />
  );
}

/** Flat rectangle on the ground / a slab (z = const). */
export function FaceZ({
  z,
  x: [x0, x1],
  y: [y0, y1],
  fill,
}: {
  z: number;
  x: Range;
  y: Range;
  fill: string;
}) {
  return <polygon fill={fill} points={points([x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z])} />;
}

export function Line({ a, b, ...rest }: { a: P3; b: P3 } & Omit<SVGProps<SVGLineElement>, 'from' | 'to'>) {
  const [x1, y1] = iso(a);
  const [x2, y2] = iso(b);
  return <line x1={x1} y1={y1} x2={x2} y2={y2} {...rest} />;
}

/** Block courses drawn as horizontal lines across a wall panel. */
export function Courses({
  plane,
  at,
  span: [s0, s1],
  z: [z0, z1],
  step = 0.4,
  color,
}: {
  plane: 'x' | 'y';
  at: number;
  span: Range;
  z: Range;
  step?: number;
  color: string;
}) {
  const lines = [];
  for (let z = z0 + step; z < z1 - 0.05; z += step) {
    const from: P3 = plane === 'x' ? [at, s0, z] : [s0, at, z];
    const to: P3 = plane === 'x' ? [at, s1, z] : [s1, at, z];
    lines.push(<Line key={z.toFixed(2)} a={from} b={to} stroke={color} strokeWidth={0.5} />);
  }
  return <>{lines}</>;
}

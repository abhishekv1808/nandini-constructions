import type { ReactNode } from 'react';
import { Box, Courses, FaceX, FaceY, FaceZ, Line, iso, points, type Range } from './iso';

/**
 * Isometric G+1 house assembled in 7 stage layers (`<g data-stage="1…7">`, pieces marked
 * `data-piece`, outlines `data-draw`). Pure markup — no hooks — so it renders on the server, in
 * the hero, in the pinned scene (GSAP animates the pieces) and statically (`upToStage`).
 * Some stages are split into two groups so DOM order still matches depth.
 */

const COL = {
  ground: '#EDE6DA',
  groundEdge: '#D9CFBF',
  soil: '#8C7A63',
  peg: '#D0302A',
  string: '#D0302A',
  concrete: { top: '#DEDBD5', right: '#C3BFB8', left: '#ABA69E' },
  column: { top: '#CFCBC4', right: '#B2ADA5', left: '#9B968E' },
  block: { right: '#C9BCA9', left: '#B3A692', course: 'rgba(90,76,58,0.28)', top: '#D8CDBE' },
  opening: '#3E434B',
  plaster: { right: '#E4DFD6', left: '#D0CABF' },
  coat: '#86C4E6',
  paint: { right: '#F7F2EA', left: '#E6DED1' },
  band: '#29176E',
  bandDark: '#17113D',
  frame: '#FFFFFF',
  glass: '#A9D8F2',
  glassShade: '#7DBFE6',
  door: '#8A5A33',
  leaf: '#6E9A6B',
  leafDark: '#557D53',
  trunk: '#7A5A3C',
  path: '#D7CDBE',
} as const;

const PLINTH: Range = [0, 0.6];
const GF: Range = [0.6, 3.6];
const SLAB1: Range = [3.6, 4.0];
const FF: Range = [4.0, 7.0];
const ROOF: Range = [7.0, 7.4];
const PARAPET: Range = [7.4, 8.0];
const X: Range = [0, 10];
const Y: Range = [0, 8];

const colX = (cx: number): Range => (cx === 0 ? [0, 0.4] : cx === 5 ? [4.8, 5.2] : [9.6, 10]);
const colY = (cy: number): Range => (cy === 0 ? [0, 0.4] : [7.6, 8]);
/** Back-to-front order (x + y ascending). */
const COLUMNS: [number, number][] = [
  [0, 0],
  [5, 0],
  [0, 8],
  [10, 0],
  [5, 8],
  [10, 8],
];

type Opening = { plane: 'x' | 'y'; span: Range; z: Range; kind: 'window' | 'door' };
const OPENINGS: Opening[] = [
  { plane: 'y', span: [1.6, 3.6], z: [1.6, 2.9], kind: 'window' },
  { plane: 'y', span: [6.4, 7.9], z: [0.6, 2.9], kind: 'door' },
  { plane: 'y', span: [1.6, 3.6], z: [5.0, 6.3], kind: 'window' },
  { plane: 'y', span: [6.4, 8.6], z: [5.0, 6.3], kind: 'window' },
  { plane: 'x', span: [1.8, 3.4], z: [1.6, 2.9], kind: 'window' },
  { plane: 'x', span: [4.6, 6.2], z: [1.6, 2.9], kind: 'window' },
  { plane: 'x', span: [1.8, 3.4], z: [5.0, 6.3], kind: 'window' },
  { plane: 'x', span: [4.6, 6.2], z: [5.0, 6.3], kind: 'window' },
];

function Panel({ plane, span, z, fill }: { plane: 'x' | 'y'; span: Range; z: Range; fill: string }) {
  return plane === 'x' ? (
    <FaceX x={10} y={span} z={z} fill={fill} />
  ) : (
    <FaceY y={8} x={span} z={z} fill={fill} />
  );
}

function Holes() {
  return (
    <>
      {OPENINGS.map((o, i) => (
        <g key={i} data-piece="">
          <Panel plane={o.plane} span={o.span} z={o.z} fill={COL.opening} />
        </g>
      ))}
    </>
  );
}

function Joinery() {
  return (
    <>
      {OPENINGS.map((o, i) => {
        const inset = 0.12;
        const inner: Range = [o.span[0] + inset, o.span[1] - inset];
        const innerZ: Range = [o.z[0] + (o.kind === 'door' ? 0 : inset), o.z[1] - inset];
        const mid = (inner[0] + inner[1]) / 2;
        return (
          <g key={i} data-piece="">
            <Panel plane={o.plane} span={o.span} z={o.z} fill={COL.frame} />
            {o.kind === 'door' ? (
              <Panel plane={o.plane} span={inner} z={innerZ} fill={COL.door} />
            ) : (
              <>
                <Panel plane={o.plane} span={[inner[0], mid - 0.04]} z={innerZ} fill={COL.glass} />
                <Panel plane={o.plane} span={[mid + 0.04, inner[1]]} z={innerZ} fill={COL.glassShade} />
              </>
            )}
          </g>
        );
      })}
    </>
  );
}

function WallsWithCourses({ z }: { z: Range }) {
  const ySpans: Range[] = [
    [0.4, 4.8],
    [5.2, 9.6],
  ];
  return (
    <>
      <g data-piece="">
        <FaceX x={10} y={[0.4, 7.6]} z={z} fill={COL.block.right} />
        <Courses plane="x" at={10} span={[0.4, 7.6]} z={z} color={COL.block.course} />
      </g>
      {ySpans.map((span) => (
        <g key={span[0]} data-piece="">
          <FaceY y={8} x={span} z={z} fill={COL.block.left} />
          <Courses plane="y" at={8} span={span} z={z} color={COL.block.course} />
        </g>
      ))}
    </>
  );
}

function Tree({ at, height = 2.6, r = 22 }: { at: [number, number]; height?: number; r?: number }) {
  const [bx, by] = iso([at[0], at[1], 0]);
  const [tx, ty] = iso([at[0], at[1], height]);
  return (
    <g data-piece="">
      <line
        x1={bx}
        y1={by}
        x2={tx}
        y2={ty + r * 0.6}
        stroke={COL.trunk}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <circle cx={tx} cy={ty} r={r} fill={COL.leaf} />
      <circle cx={tx + r * 0.35} cy={ty + r * 0.2} r={r * 0.62} fill={COL.leafDark} opacity={0.55} />
    </g>
  );
}

function Shrub({ at }: { at: [number, number] }) {
  const [x, y] = iso([at[0], at[1], 0.35]);
  return (
    <g data-piece="">
      <ellipse cx={x} cy={y} rx={13} ry={9} fill={COL.leaf} />
    </g>
  );
}

function Stage({ n, upTo, children }: { n: number; upTo: number; children: ReactNode }) {
  return (
    <g data-stage={n} style={n > upTo ? { opacity: 0 } : undefined}>
      {children}
    </g>
  );
}

type HouseSvgProps = {
  /** Render statically up to this stage (1–7). Default: complete house. */
  upToStage?: number;
  className?: string;
  /** Decorative uses (hero background) hide it from assistive tech. */
  decorative?: boolean;
  idPrefix?: string;
};

export function HouseSvg({
  upToStage = 7,
  className,
  decorative = false,
  idPrefix = 'house',
}: HouseSvgProps) {
  const glowId = `${idPrefix}-glow`;
  const titleId = `${idPrefix}-title`;
  const [glowX, glowY] = iso([5, 4, 4]);
  const keyAt = iso([12.5, -1.5, 9]);

  return (
    <svg
      viewBox="-280 -260 590 530"
      className={className}
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-labelledby': titleId })}
    >
      {!decorative && (
        <title id={titleId}>Illustration of a two-storey house being built in seven stages</title>
      )}
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0" stopColor="#BFE6FA" stopOpacity="0.9" />
          <stop offset="1" stopColor="#BFE6FA" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ground — always visible */}
      <polygon
        points={points([-3, -3, 0], [14, -3, 0], [14, 12, 0], [-3, 12, 0])}
        fill={COL.ground}
        stroke={COL.groundEdge}
        strokeWidth={1}
      />

      {/* 7a — handover glow sits behind the house */}
      <Stage n={7} upTo={upToStage}>
        <g data-piece="">
          <ellipse cx={glowX} cy={glowY} rx={230} ry={170} fill={`url(#${glowId})`} />
        </g>
      </Stage>

      {/* 1 — plot marking & excavation */}
      <Stage n={1} upTo={upToStage}>
        <path
          data-draw=""
          pathLength={1}
          d={`M${points([-0.8, -0.8, 0.02], [10.8, -0.8, 0.02], [10.8, 8.8, 0.02], [-0.8, 8.8, 0.02]).replaceAll(' ', ' L')} Z`}
          fill="none"
          stroke={COL.string}
          strokeWidth={1.2}
          strokeDasharray="1"
        />
        {COLUMNS.map(([cx, cy]) => {
          const [x0, x1] = colX(cx);
          const [y0, y1] = colY(cy);
          return (
            <g key={`pit-${cx}-${cy}`} data-piece="">
              <FaceZ z={0.01} x={[x0 - 0.5, x1 + 0.5]} y={[y0 - 0.5, y1 + 0.5]} fill={COL.soil} />
            </g>
          );
        })}
        {(
          [
            [-1.2, -1.2],
            [11.2, -1.2],
            [-1.2, 9.2],
            [11.2, 9.2],
          ] as const
        ).map(([px, py]) => (
          <Box
            key={`peg-${px}-${py}`}
            x={[px - 0.12, px + 0.12]}
            y={[py - 0.12, py + 0.12]}
            z={[0, 0.9]}
            shades={{ top: COL.peg, right: COL.peg, left: '#A8231E' }}
          />
        ))}
      </Stage>

      {/* 2 — footings, then plinth */}
      <Stage n={2} upTo={upToStage}>
        {COLUMNS.map(([cx, cy]) => {
          const [x0, x1] = colX(cx);
          const [y0, y1] = colY(cy);
          return (
            <Box
              key={`footing-${cx}-${cy}`}
              x={[x0 - 0.4, x1 + 0.4]}
              y={[y0 - 0.4, y1 + 0.4]}
              z={[0, 0.25]}
              shades={COL.concrete}
            />
          );
        })}
        <Box x={X} y={Y} z={PLINTH} shades={COL.concrete} />
      </Stage>

      {/* 3 — columns & slabs */}
      <Stage n={3} upTo={upToStage}>
        {COLUMNS.map(([cx, cy]) => (
          <Box key={`gc-${cx}-${cy}`} x={colX(cx)} y={colY(cy)} z={GF} shades={COL.column} />
        ))}
        <Box x={X} y={Y} z={SLAB1} shades={COL.concrete} />
        {COLUMNS.map(([cx, cy]) => (
          <Box key={`fc-${cx}-${cy}`} x={colX(cx)} y={colY(cy)} z={FF} shades={COL.column} />
        ))}
        <Box x={X} y={Y} z={ROOF} shades={COL.concrete} />
      </Stage>

      {/* 4a — block walls (front faces), openings, back parapets */}
      <Stage n={4} upTo={upToStage}>
        <WallsWithCourses z={GF} />
        <WallsWithCourses z={FF} />
        <Holes />
        <Box x={X} y={[0, 0.25]} z={PARAPET} shades={COL.block} />
        <Box x={[0, 0.25]} y={[0.25, 8]} z={PARAPET} shades={COL.block} />
      </Stage>

      {/* 5a — roof waterproofing (under the front parapets) */}
      <Stage n={5} upTo={upToStage}>
        <g data-piece="">
          <FaceZ z={7.41} x={[0.25, 9.75]} y={[0.25, 7.75]} fill={COL.coat} />
        </g>
      </Stage>

      {/* 4b — front parapets */}
      <Stage n={4} upTo={upToStage}>
        <Box x={[0.25, 9.75]} y={[7.75, 8]} z={PARAPET} shades={COL.block} />
        <Box x={[9.75, 10]} y={[0, 8]} z={PARAPET} shades={COL.block} />
      </Stage>

      {/* 5b — plaster */}
      <Stage n={5} upTo={upToStage}>
        <g data-piece="">
          <FaceX x={10} y={Y} z={[PLINTH[1], PARAPET[1]]} fill={COL.plaster.right} />
        </g>
        <g data-piece="">
          <FaceY y={8} x={X} z={[PLINTH[1], PARAPET[1]]} fill={COL.plaster.left} />
        </g>
        <Holes />
      </Stage>

      {/* 6 — paint, bands, windows & doors */}
      <Stage n={6} upTo={upToStage}>
        <g data-piece="">
          <FaceX x={10} y={Y} z={[PLINTH[1], PARAPET[1]]} fill={COL.paint.right} />
          <FaceY y={8} x={X} z={[PLINTH[1], PARAPET[1]]} fill={COL.paint.left} />
        </g>
        <g data-piece="">
          <FaceX x={10} y={Y} z={SLAB1} fill={COL.band} edge={false} />
          <FaceY y={8} x={X} z={SLAB1} fill={COL.band} edge={false} />
          <FaceX x={10} y={Y} z={PARAPET} fill={COL.bandDark} edge={false} />
          <FaceY y={8} x={X} z={PARAPET} fill={COL.bandDark} edge={false} />
          <FaceX x={10} y={Y} z={PLINTH} fill={COL.bandDark} edge={false} />
          <FaceY y={8} x={X} z={PLINTH} fill={COL.bandDark} edge={false} />
        </g>
        <Joinery />
      </Stage>

      {/* 7b — landscaping, gate, keys */}
      <Stage n={7} upTo={upToStage}>
        <g data-piece="">
          <FaceZ z={0.02} x={[6.5, 7.8]} y={[8, 12]} fill={COL.path} />
        </g>
        <Shrub at={[2, 9.6]} />
        <Shrub at={[4, 9.6]} />
        <Shrub at={[11.4, 2]} />
        <Shrub at={[11.4, 5.5]} />
        <Box
          x={[6.1, 6.35]}
          y={[11.6, 11.85]}
          z={[0, 1.6]}
          shades={{ top: '#3A3F47', right: '#2D3138', left: '#23272D' }}
        />
        <Box
          x={[7.95, 8.2]}
          y={[11.6, 11.85]}
          z={[0, 1.6]}
          shades={{ top: '#3A3F47', right: '#2D3138', left: '#23272D' }}
        />
        <Tree at={[12.6, 9.6]} />
        <Tree at={[-1.8, 10.8]} height={2.2} r={18} />
        <g data-piece="" transform={`translate(${keyAt[0]} ${keyAt[1]})`}>
          <circle r={24} fill={COL.band} />
          <circle cx={-6} cy={0} r={6.5} fill="none" stroke="#fff" strokeWidth={3} />
          <path d="M0 0h13M9 0v5M13 0v4" stroke="#fff" strokeWidth={3} strokeLinecap="round" fill="none" />
        </g>
      </Stage>

      {/* Decorative ground tick so the plot reads as a plot */}
      <Line a={[-3, 12, 0]} b={[14, 12, 0]} stroke={COL.groundEdge} strokeWidth={1} />
    </svg>
  );
}

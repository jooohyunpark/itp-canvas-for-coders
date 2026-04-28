import * as React from "react"

import { cn } from "@/lib/utils"

export type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl"
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>
export type GapScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
export type GridItemSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface GridProps extends React.ComponentProps<"div"> {
  gap?: ResponsiveValue<GapScale>
  rowGap?: ResponsiveValue<GapScale>
  colGap?: ResponsiveValue<GapScale>
}

export interface GridItemProps extends React.ComponentProps<"div"> {
  size?: ResponsiveValue<GridItemSize>
  offset?: ResponsiveValue<GridItemSize>
}

const BREAKPOINTS = [
  "base",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
] as const satisfies readonly Breakpoint[]
const DEFAULT_SIZE: GridItemSize = 12
const DEFAULT_ROW_GAP: GapScale = 12
const DEFAULT_COL_GAP: GapScale = 8

const WIDTH_CALC =
  "w-[calc(var(--grid-size,12)/12*(100%+var(--grid-col-gap,0px))-var(--grid-col-gap,0px))]"
const OFFSET_CALC =
  "ml-[calc(var(--grid-offset,0)/12*(100%+var(--grid-col-gap,0px)))]"

const sizeMap: Record<Breakpoint, Record<Exclude<GridItemSize, 0>, string>> = {
  base: {
    1: "[--grid-size:1]",
    2: "[--grid-size:2]",
    3: "[--grid-size:3]",
    4: "[--grid-size:4]",
    5: "[--grid-size:5]",
    6: "[--grid-size:6]",
    7: "[--grid-size:7]",
    8: "[--grid-size:8]",
    9: "[--grid-size:9]",
    10: "[--grid-size:10]",
    11: "[--grid-size:11]",
    12: "[--grid-size:12]",
  },
  sm: {
    1: "sm:[--grid-size:1]",
    2: "sm:[--grid-size:2]",
    3: "sm:[--grid-size:3]",
    4: "sm:[--grid-size:4]",
    5: "sm:[--grid-size:5]",
    6: "sm:[--grid-size:6]",
    7: "sm:[--grid-size:7]",
    8: "sm:[--grid-size:8]",
    9: "sm:[--grid-size:9]",
    10: "sm:[--grid-size:10]",
    11: "sm:[--grid-size:11]",
    12: "sm:[--grid-size:12]",
  },
  md: {
    1: "md:[--grid-size:1]",
    2: "md:[--grid-size:2]",
    3: "md:[--grid-size:3]",
    4: "md:[--grid-size:4]",
    5: "md:[--grid-size:5]",
    6: "md:[--grid-size:6]",
    7: "md:[--grid-size:7]",
    8: "md:[--grid-size:8]",
    9: "md:[--grid-size:9]",
    10: "md:[--grid-size:10]",
    11: "md:[--grid-size:11]",
    12: "md:[--grid-size:12]",
  },
  lg: {
    1: "lg:[--grid-size:1]",
    2: "lg:[--grid-size:2]",
    3: "lg:[--grid-size:3]",
    4: "lg:[--grid-size:4]",
    5: "lg:[--grid-size:5]",
    6: "lg:[--grid-size:6]",
    7: "lg:[--grid-size:7]",
    8: "lg:[--grid-size:8]",
    9: "lg:[--grid-size:9]",
    10: "lg:[--grid-size:10]",
    11: "lg:[--grid-size:11]",
    12: "lg:[--grid-size:12]",
  },
  xl: {
    1: "xl:[--grid-size:1]",
    2: "xl:[--grid-size:2]",
    3: "xl:[--grid-size:3]",
    4: "xl:[--grid-size:4]",
    5: "xl:[--grid-size:5]",
    6: "xl:[--grid-size:6]",
    7: "xl:[--grid-size:7]",
    8: "xl:[--grid-size:8]",
    9: "xl:[--grid-size:9]",
    10: "xl:[--grid-size:10]",
    11: "xl:[--grid-size:11]",
    12: "xl:[--grid-size:12]",
  },
  "2xl": {
    1: "2xl:[--grid-size:1]",
    2: "2xl:[--grid-size:2]",
    3: "2xl:[--grid-size:3]",
    4: "2xl:[--grid-size:4]",
    5: "2xl:[--grid-size:5]",
    6: "2xl:[--grid-size:6]",
    7: "2xl:[--grid-size:7]",
    8: "2xl:[--grid-size:8]",
    9: "2xl:[--grid-size:9]",
    10: "2xl:[--grid-size:10]",
    11: "2xl:[--grid-size:11]",
    12: "2xl:[--grid-size:12]",
  },
}

const hiddenMap: Record<Breakpoint, string> = {
  base: "hidden",
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
  xl: "xl:hidden",
  "2xl": "2xl:hidden",
}

const blockMap: Record<Breakpoint, string> = {
  base: "block",
  sm: "sm:block",
  md: "md:block",
  lg: "lg:block",
  xl: "xl:block",
  "2xl": "2xl:block",
}

const offsetMap: Record<Breakpoint, Record<GridItemSize, string>> = {
  base: {
    0: "[--grid-offset:0]",
    1: "[--grid-offset:1]",
    2: "[--grid-offset:2]",
    3: "[--grid-offset:3]",
    4: "[--grid-offset:4]",
    5: "[--grid-offset:5]",
    6: "[--grid-offset:6]",
    7: "[--grid-offset:7]",
    8: "[--grid-offset:8]",
    9: "[--grid-offset:9]",
    10: "[--grid-offset:10]",
    11: "[--grid-offset:11]",
    12: "[--grid-offset:12]",
  },
  sm: {
    0: "sm:[--grid-offset:0]",
    1: "sm:[--grid-offset:1]",
    2: "sm:[--grid-offset:2]",
    3: "sm:[--grid-offset:3]",
    4: "sm:[--grid-offset:4]",
    5: "sm:[--grid-offset:5]",
    6: "sm:[--grid-offset:6]",
    7: "sm:[--grid-offset:7]",
    8: "sm:[--grid-offset:8]",
    9: "sm:[--grid-offset:9]",
    10: "sm:[--grid-offset:10]",
    11: "sm:[--grid-offset:11]",
    12: "sm:[--grid-offset:12]",
  },
  md: {
    0: "md:[--grid-offset:0]",
    1: "md:[--grid-offset:1]",
    2: "md:[--grid-offset:2]",
    3: "md:[--grid-offset:3]",
    4: "md:[--grid-offset:4]",
    5: "md:[--grid-offset:5]",
    6: "md:[--grid-offset:6]",
    7: "md:[--grid-offset:7]",
    8: "md:[--grid-offset:8]",
    9: "md:[--grid-offset:9]",
    10: "md:[--grid-offset:10]",
    11: "md:[--grid-offset:11]",
    12: "md:[--grid-offset:12]",
  },
  lg: {
    0: "lg:[--grid-offset:0]",
    1: "lg:[--grid-offset:1]",
    2: "lg:[--grid-offset:2]",
    3: "lg:[--grid-offset:3]",
    4: "lg:[--grid-offset:4]",
    5: "lg:[--grid-offset:5]",
    6: "lg:[--grid-offset:6]",
    7: "lg:[--grid-offset:7]",
    8: "lg:[--grid-offset:8]",
    9: "lg:[--grid-offset:9]",
    10: "lg:[--grid-offset:10]",
    11: "lg:[--grid-offset:11]",
    12: "lg:[--grid-offset:12]",
  },
  xl: {
    0: "xl:[--grid-offset:0]",
    1: "xl:[--grid-offset:1]",
    2: "xl:[--grid-offset:2]",
    3: "xl:[--grid-offset:3]",
    4: "xl:[--grid-offset:4]",
    5: "xl:[--grid-offset:5]",
    6: "xl:[--grid-offset:6]",
    7: "xl:[--grid-offset:7]",
    8: "xl:[--grid-offset:8]",
    9: "xl:[--grid-offset:9]",
    10: "xl:[--grid-offset:10]",
    11: "xl:[--grid-offset:11]",
    12: "xl:[--grid-offset:12]",
  },
  "2xl": {
    0: "2xl:[--grid-offset:0]",
    1: "2xl:[--grid-offset:1]",
    2: "2xl:[--grid-offset:2]",
    3: "2xl:[--grid-offset:3]",
    4: "2xl:[--grid-offset:4]",
    5: "2xl:[--grid-offset:5]",
    6: "2xl:[--grid-offset:6]",
    7: "2xl:[--grid-offset:7]",
    8: "2xl:[--grid-offset:8]",
    9: "2xl:[--grid-offset:9]",
    10: "2xl:[--grid-offset:10]",
    11: "2xl:[--grid-offset:11]",
    12: "2xl:[--grid-offset:12]",
  },
}

const rowGapMap: Record<Breakpoint, Record<GapScale, string>> = {
  base: {
    0: "[--grid-row-gap:0px]",
    1: "[--grid-row-gap:calc(var(--spacing)*1)]",
    2: "[--grid-row-gap:calc(var(--spacing)*2)]",
    3: "[--grid-row-gap:calc(var(--spacing)*3)]",
    4: "[--grid-row-gap:calc(var(--spacing)*4)]",
    5: "[--grid-row-gap:calc(var(--spacing)*5)]",
    6: "[--grid-row-gap:calc(var(--spacing)*6)]",
    8: "[--grid-row-gap:calc(var(--spacing)*8)]",
    10: "[--grid-row-gap:calc(var(--spacing)*10)]",
    12: "[--grid-row-gap:calc(var(--spacing)*12)]",
  },
  sm: {
    0: "sm:[--grid-row-gap:0px]",
    1: "sm:[--grid-row-gap:calc(var(--spacing)*1)]",
    2: "sm:[--grid-row-gap:calc(var(--spacing)*2)]",
    3: "sm:[--grid-row-gap:calc(var(--spacing)*3)]",
    4: "sm:[--grid-row-gap:calc(var(--spacing)*4)]",
    5: "sm:[--grid-row-gap:calc(var(--spacing)*5)]",
    6: "sm:[--grid-row-gap:calc(var(--spacing)*6)]",
    8: "sm:[--grid-row-gap:calc(var(--spacing)*8)]",
    10: "sm:[--grid-row-gap:calc(var(--spacing)*10)]",
    12: "sm:[--grid-row-gap:calc(var(--spacing)*12)]",
  },
  md: {
    0: "md:[--grid-row-gap:0px]",
    1: "md:[--grid-row-gap:calc(var(--spacing)*1)]",
    2: "md:[--grid-row-gap:calc(var(--spacing)*2)]",
    3: "md:[--grid-row-gap:calc(var(--spacing)*3)]",
    4: "md:[--grid-row-gap:calc(var(--spacing)*4)]",
    5: "md:[--grid-row-gap:calc(var(--spacing)*5)]",
    6: "md:[--grid-row-gap:calc(var(--spacing)*6)]",
    8: "md:[--grid-row-gap:calc(var(--spacing)*8)]",
    10: "md:[--grid-row-gap:calc(var(--spacing)*10)]",
    12: "md:[--grid-row-gap:calc(var(--spacing)*12)]",
  },
  lg: {
    0: "lg:[--grid-row-gap:0px]",
    1: "lg:[--grid-row-gap:calc(var(--spacing)*1)]",
    2: "lg:[--grid-row-gap:calc(var(--spacing)*2)]",
    3: "lg:[--grid-row-gap:calc(var(--spacing)*3)]",
    4: "lg:[--grid-row-gap:calc(var(--spacing)*4)]",
    5: "lg:[--grid-row-gap:calc(var(--spacing)*5)]",
    6: "lg:[--grid-row-gap:calc(var(--spacing)*6)]",
    8: "lg:[--grid-row-gap:calc(var(--spacing)*8)]",
    10: "lg:[--grid-row-gap:calc(var(--spacing)*10)]",
    12: "lg:[--grid-row-gap:calc(var(--spacing)*12)]",
  },
  xl: {
    0: "xl:[--grid-row-gap:0px]",
    1: "xl:[--grid-row-gap:calc(var(--spacing)*1)]",
    2: "xl:[--grid-row-gap:calc(var(--spacing)*2)]",
    3: "xl:[--grid-row-gap:calc(var(--spacing)*3)]",
    4: "xl:[--grid-row-gap:calc(var(--spacing)*4)]",
    5: "xl:[--grid-row-gap:calc(var(--spacing)*5)]",
    6: "xl:[--grid-row-gap:calc(var(--spacing)*6)]",
    8: "xl:[--grid-row-gap:calc(var(--spacing)*8)]",
    10: "xl:[--grid-row-gap:calc(var(--spacing)*10)]",
    12: "xl:[--grid-row-gap:calc(var(--spacing)*12)]",
  },
  "2xl": {
    0: "2xl:[--grid-row-gap:0px]",
    1: "2xl:[--grid-row-gap:calc(var(--spacing)*1)]",
    2: "2xl:[--grid-row-gap:calc(var(--spacing)*2)]",
    3: "2xl:[--grid-row-gap:calc(var(--spacing)*3)]",
    4: "2xl:[--grid-row-gap:calc(var(--spacing)*4)]",
    5: "2xl:[--grid-row-gap:calc(var(--spacing)*5)]",
    6: "2xl:[--grid-row-gap:calc(var(--spacing)*6)]",
    8: "2xl:[--grid-row-gap:calc(var(--spacing)*8)]",
    10: "2xl:[--grid-row-gap:calc(var(--spacing)*10)]",
    12: "2xl:[--grid-row-gap:calc(var(--spacing)*12)]",
  },
}

const colGapMap: Record<Breakpoint, Record<GapScale, string>> = {
  base: {
    0: "[--grid-col-gap:0px]",
    1: "[--grid-col-gap:calc(var(--spacing)*1)]",
    2: "[--grid-col-gap:calc(var(--spacing)*2)]",
    3: "[--grid-col-gap:calc(var(--spacing)*3)]",
    4: "[--grid-col-gap:calc(var(--spacing)*4)]",
    5: "[--grid-col-gap:calc(var(--spacing)*5)]",
    6: "[--grid-col-gap:calc(var(--spacing)*6)]",
    8: "[--grid-col-gap:calc(var(--spacing)*8)]",
    10: "[--grid-col-gap:calc(var(--spacing)*10)]",
    12: "[--grid-col-gap:calc(var(--spacing)*12)]",
  },
  sm: {
    0: "sm:[--grid-col-gap:0px]",
    1: "sm:[--grid-col-gap:calc(var(--spacing)*1)]",
    2: "sm:[--grid-col-gap:calc(var(--spacing)*2)]",
    3: "sm:[--grid-col-gap:calc(var(--spacing)*3)]",
    4: "sm:[--grid-col-gap:calc(var(--spacing)*4)]",
    5: "sm:[--grid-col-gap:calc(var(--spacing)*5)]",
    6: "sm:[--grid-col-gap:calc(var(--spacing)*6)]",
    8: "sm:[--grid-col-gap:calc(var(--spacing)*8)]",
    10: "sm:[--grid-col-gap:calc(var(--spacing)*10)]",
    12: "sm:[--grid-col-gap:calc(var(--spacing)*12)]",
  },
  md: {
    0: "md:[--grid-col-gap:0px]",
    1: "md:[--grid-col-gap:calc(var(--spacing)*1)]",
    2: "md:[--grid-col-gap:calc(var(--spacing)*2)]",
    3: "md:[--grid-col-gap:calc(var(--spacing)*3)]",
    4: "md:[--grid-col-gap:calc(var(--spacing)*4)]",
    5: "md:[--grid-col-gap:calc(var(--spacing)*5)]",
    6: "md:[--grid-col-gap:calc(var(--spacing)*6)]",
    8: "md:[--grid-col-gap:calc(var(--spacing)*8)]",
    10: "md:[--grid-col-gap:calc(var(--spacing)*10)]",
    12: "md:[--grid-col-gap:calc(var(--spacing)*12)]",
  },
  lg: {
    0: "lg:[--grid-col-gap:0px]",
    1: "lg:[--grid-col-gap:calc(var(--spacing)*1)]",
    2: "lg:[--grid-col-gap:calc(var(--spacing)*2)]",
    3: "lg:[--grid-col-gap:calc(var(--spacing)*3)]",
    4: "lg:[--grid-col-gap:calc(var(--spacing)*4)]",
    5: "lg:[--grid-col-gap:calc(var(--spacing)*5)]",
    6: "lg:[--grid-col-gap:calc(var(--spacing)*6)]",
    8: "lg:[--grid-col-gap:calc(var(--spacing)*8)]",
    10: "lg:[--grid-col-gap:calc(var(--spacing)*10)]",
    12: "lg:[--grid-col-gap:calc(var(--spacing)*12)]",
  },
  xl: {
    0: "xl:[--grid-col-gap:0px]",
    1: "xl:[--grid-col-gap:calc(var(--spacing)*1)]",
    2: "xl:[--grid-col-gap:calc(var(--spacing)*2)]",
    3: "xl:[--grid-col-gap:calc(var(--spacing)*3)]",
    4: "xl:[--grid-col-gap:calc(var(--spacing)*4)]",
    5: "xl:[--grid-col-gap:calc(var(--spacing)*5)]",
    6: "xl:[--grid-col-gap:calc(var(--spacing)*6)]",
    8: "xl:[--grid-col-gap:calc(var(--spacing)*8)]",
    10: "xl:[--grid-col-gap:calc(var(--spacing)*10)]",
    12: "xl:[--grid-col-gap:calc(var(--spacing)*12)]",
  },
  "2xl": {
    0: "2xl:[--grid-col-gap:0px]",
    1: "2xl:[--grid-col-gap:calc(var(--spacing)*1)]",
    2: "2xl:[--grid-col-gap:calc(var(--spacing)*2)]",
    3: "2xl:[--grid-col-gap:calc(var(--spacing)*3)]",
    4: "2xl:[--grid-col-gap:calc(var(--spacing)*4)]",
    5: "2xl:[--grid-col-gap:calc(var(--spacing)*5)]",
    6: "2xl:[--grid-col-gap:calc(var(--spacing)*6)]",
    8: "2xl:[--grid-col-gap:calc(var(--spacing)*8)]",
    10: "2xl:[--grid-col-gap:calc(var(--spacing)*10)]",
    12: "2xl:[--grid-col-gap:calc(var(--spacing)*12)]",
  },
}

function toRecord<T>(
  v: ResponsiveValue<T> | undefined
): Partial<Record<Breakpoint, T>> {
  if (v === undefined) return {}
  if (typeof v === "object" && v !== null)
    return v as Partial<Record<Breakpoint, T>>
  return { base: v as T }
}

function resolveResponsive<T extends string | number>(
  value: ResponsiveValue<T> | undefined,
  map: Record<Breakpoint, Record<T, string>>
): string {
  const r = toRecord(value)
  const out: string[] = []
  let last: T | undefined
  for (const bp of BREAKPOINTS) {
    const v = r[bp]
    if (v !== undefined && v !== last) {
      out.push(map[bp][v])
      last = v
    }
  }
  return out.join(" ")
}

function resolveGapAxis(
  shorthand: ResponsiveValue<GapScale> | undefined,
  axis: ResponsiveValue<GapScale> | undefined,
  fallback: GapScale,
  map: Record<Breakpoint, Record<GapScale, string>>
): string {
  const s = toRecord(shorthand)
  const a = toRecord(axis)
  const out: string[] = []
  let current: GapScale = fallback
  let last: GapScale | undefined
  for (const bp of BREAKPOINTS) {
    current = a[bp] ?? s[bp] ?? current
    if (current !== last) {
      out.push(map[bp][current])
      last = current
    }
  }
  return out.join(" ")
}

function resolveSize(value: ResponsiveValue<GridItemSize> | undefined): string {
  const r = toRecord(value)
  const out: string[] = []
  let last: GridItemSize | undefined
  for (const bp of BREAKPOINTS) {
    const v = bp === "base" ? (r.base ?? DEFAULT_SIZE) : r[bp]
    if (v === undefined || v === last) continue
    if (v === 0) {
      out.push(hiddenMap[bp])
    } else {
      out.push(sizeMap[bp][v])
      if (last === 0) out.push(blockMap[bp])
    }
    last = v
  }
  return out.join(" ")
}

function Grid({ gap, rowGap, colGap, className, ...props }: GridProps) {
  return (
    <div
      data-slot="grid"
      className={cn(
        "flex flex-wrap gap-x-(--grid-col-gap) gap-y-(--grid-row-gap)",
        resolveGapAxis(gap, rowGap, DEFAULT_ROW_GAP, rowGapMap),
        resolveGapAxis(gap, colGap, DEFAULT_COL_GAP, colGapMap),
        className
      )}
      {...props}
    />
  )
}

function GridItem({ size, offset, className, ...props }: GridItemProps) {
  return (
    <div
      data-slot="grid-item"
      className={cn(
        "min-w-0",
        WIDTH_CALC,
        offset !== undefined && OFFSET_CALC,
        resolveSize(size),
        resolveResponsive(offset, offsetMap),
        className
      )}
      {...props}
    />
  )
}

export { Grid, GridItem }

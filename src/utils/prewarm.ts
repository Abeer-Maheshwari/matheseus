import { FORMULA_BOOKLET_CATEGORIES } from '../data/formulaBooklet';
import { renderKatexCached } from '../components/MathRenderer';

let _formulaKatexWarmed = false;
let _warmPromise: Promise<void> | null = null;

function collectFormulaExpressions(): string[] {
  const exprs: string[] = [];
  for (const cat of FORMULA_BOOKLET_CATEGORIES) {
    for (const sec of cat.sections) {
      for (const item of sec.items) {
        if (item.latex) exprs.push(item.latex);
      }
    }
  }
  return exprs;
}

export function isFormulaKatexWarmed(): boolean {
  return _formulaKatexWarmed;
}

/**
 * Synchronously precomputes KaTeX HTML for all formula booklet items into the module cache.
 */
export function prewarmFormulaBookletKatexSync(): void {
  if (_formulaKatexWarmed) return;
  for (const expr of collectFormulaExpressions()) {
    renderKatexCached(expr, true);
  }
  _formulaKatexWarmed = true;
}

/**
 * Precomputes KaTeX HTML in small non-blocking slices so page animations stay smooth.
 */
export function prewarmFormulaBookletKatexAsync(): Promise<void> {
  if (_formulaKatexWarmed) return Promise.resolve();
  if (_warmPromise) return _warmPromise;

  const expressions = collectFormulaExpressions();
  const BATCH_SIZE = 14;
  let index = 0;

  _warmPromise = new Promise<void>((resolve) => {
    const runSlice = () => {
      const end = Math.min(index + BATCH_SIZE, expressions.length);
      for (; index < end; index++) {
        renderKatexCached(expressions[index], true);
      }
      if (index < expressions.length) {
        window.setTimeout(runSlice, 0);
      } else {
        _formulaKatexWarmed = true;
        resolve();
      }
    };
    runSlice();
  });

  return _warmPromise;
}

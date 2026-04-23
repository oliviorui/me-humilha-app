export type YearProgressResult = {
  progress: number;
  percentage: number;
  year: number;
};

export function getYearProgress(): YearProgressResult {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const startOfNextYear = new Date(now.getFullYear() + 1, 0, 1);

  const elapsed = now.getTime() - startOfYear.getTime();
  const total = startOfNextYear.getTime() - startOfYear.getTime();

  const rawProgress = elapsed / total;
  const progress = Math.min(Math.max(rawProgress, 0), 1);
  const percentage = progress * 100;

  return {
    progress,
    percentage,
    year: now.getFullYear(),
  };
}

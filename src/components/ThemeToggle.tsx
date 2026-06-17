/**
 * Dark mode is now the app's single production theme.
 * This component is intentionally kept as a no-op compatibility shim so older
 * imports do not reintroduce a light-mode toggle or break type-checking.
 */
export default function ThemeToggle() {
  return null;
}

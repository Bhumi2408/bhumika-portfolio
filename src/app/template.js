// Re-mounts on every navigation, so each page animates in.
export default function Template({ children }) {
  return <main className="page-enter">{children}</main>;
}

import '@bento-editor/core/styles';
import '@bento-editor/element-heading/styles';
import '@bento-editor/element-list/styles';
import '@bento-editor/element-paragraph/styles';
import '@bento-editor/element-note/styles';
import '@bento-editor/element-callout/styles';
import '@bento-editor/element-link/styles';
import '@bento-editor/element-divider/styles';
import '@bento-editor/element-quote/styles';
import '@bento-editor/element-toggle/styles';
import '@bento-editor/text-format/styles';
import '@bento-editor/text-emoji/styles';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

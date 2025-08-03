export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white p-8">
          {children}
        </div>
      </body>
    </html>
  );
}

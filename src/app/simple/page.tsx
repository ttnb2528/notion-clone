export default function SimplePage() {
  return (
    <html>
      <head>
        <title>Simple Test</title>
      </head>
      <body>
        <h1>Simple Test Page</h1>
        <p>This should work!</p>
        <p>Time: {new Date().toISOString()}</p>
      </body>
    </html>
  );
}

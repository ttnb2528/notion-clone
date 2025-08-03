export default function HealthPage() {
  return (
    <div className="p-5 font-sans">
      <h1 className="text-2xl font-bold">Health Check</h1>
      <p>Server is running!</p>
      <p>Timestamp: {new Date().toISOString()}</p>
      <p>Environment: {process.env.NODE_ENV}</p>
    </div>
  );
}

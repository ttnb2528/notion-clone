export default function DebugPage() {
  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 'Set' : 'Not Set',
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? 'Set' : 'Not Set',
    FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT ? 'Set' : 'Not Set',
    NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY ? 'Set' : 'Not Set',
    LIVEBLOCKS_SECRET_KEY: process.env.LIVEBLOCKS_SECRET_KEY ? 'Set' : 'Not Set',
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Debug</h1>
      
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Environment Variables Status:</h2>
        
        <div className="space-y-2 font-mono text-sm">
          {Object.entries(envVars).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="font-medium">{key}:</span>
              <span className={value === 'Set' || value === 'production' || value === '1' ? 'text-green-600' : 'text-red-600'}>
                {value || 'Not Set'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-yellow-100 p-4 rounded">
        <h3 className="font-semibold">Deployment Timestamp:</h3>
        <p className="text-sm">{new Date().toISOString()}</p>
      </div>
    </div>
  );
}

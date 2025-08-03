"use client";

import { LiveblocksProvider as OriginalLiveblocksProvider } from "@liveblocks/react/suspense";

function LiveblocksProvider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
    throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY is not set.");
  }
  return (
    <OriginalLiveblocksProvider authEndpoint={"/auth-endpoint"} throttle={16}>
      {children}
    </OriginalLiveblocksProvider>
  );
}
export default LiveblocksProvider;

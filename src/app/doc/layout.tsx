import LiveblocksProvider from "@/components/LiveblocksProvider";

function pageLayout({ children }: { children: React.ReactNode }) {
  return <LiveblocksProvider>{children}</LiveblocksProvider>;
}
export default pageLayout;

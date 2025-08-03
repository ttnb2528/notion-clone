import Document from "@/components/Document";

async function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className="flex flex-1 flex-col min-h-screen">
      <Document id={id} />
    </div>
  );
}
export default DocumentPage;

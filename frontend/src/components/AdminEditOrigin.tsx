export default function AdminEditOriginContent({
  content,
}: {
  content: string;
}) {
  return (
    <div>
      <h3 className="text-sm text-muted-foreground mb-5.5">Original (EN)</h3>
      <article
        className="border rounded-md p-4 bg-gray-50 whitespace-pre-wrap"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </div>
  );
}

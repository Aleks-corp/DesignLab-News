import { SetStateAction } from "react";

type TranslateContentProps = {
  editContentHandler: () => void;
  editContent: boolean;
  editedContent: string | undefined;
  setEditedContent: (value: SetStateAction<string>) => void;
  content: string;
};

export default function AdminEditTranslateContent({
  editContentHandler,
  editContent,
  editedContent,
  setEditedContent,
  content,
}: TranslateContentProps) {
  return (
    <div className="h-full">
      <div className="flex gap-3 mb-2 items-center">
        <h3 className="text-sm text-muted-foreground ">Translated (UA)</h3>
        <button
          className="px-4 py-1 rounded-[8px] border-1 "
          type="button"
          onClick={editContentHandler}
        >
          {editContent ? "Save" : "Edit"}
        </button>
      </div>
      {editContent ? (
        <div className="border h-full rounded-md p-4 bg-gray-50 whitespace-pre-wrap">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-full border p-2 rounded-md"
          />
        </div>
      ) : (
        <article
          className="border h-full rounded-md p-4 bg-gray-50 whitespace-pre-wrap"
          dangerouslySetInnerHTML={{
            __html: editedContent || content,
          }}
        />
      )}
    </div>
  );
}

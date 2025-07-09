/* eslint-disable @next/next/no-img-element */
import { SetStateAction } from "react";

export default function AdminEditImagePreview({
  url,
  editedImg,
  setEditedImg,
  editImgHandler,
  editImg,
}: {
  url: string | null;
  editedImg: string | undefined;
  setEditedImg: (value: SetStateAction<string | undefined>) => void;
  editImgHandler: () => void;
  editImg: boolean;
}) {
  return (
    <div className="flex">
      <button
        className="px-4 py-1 rounded-[8px] border-1 mr-8 max-h-8"
        type="button"
        onClick={editImgHandler}
      >
        {editImg ? "Save" : "Edit"}
      </button>
      {!editImg ? (
        <div className="w-80 h-52 overflow-hidden rounded-xl">
          <img
            src={editedImg || url || "/post-template.jpg"}
            alt="Article image preview"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <input
          value={editedImg}
          onChange={(e) => setEditedImg(e.target.value)}
          className="text-lg border-b p-2 w-2/3"
        />
      )}
    </div>
  );
}

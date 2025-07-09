import { useState } from "react";
import AdminList from "@/components/AdminList";
import { IArticles } from "@/types/article.type";
import { UseMutationResult } from "@tanstack/react-query";
import AdminEditOriginContent from "./AdminEditOrigin";
import AdminEditTranslateContent from "./AdminEditTranslate";
import AdminEditImagePreview from "./AdminEditImgPrev";

type EditArticleProp = {
  data: { articles: IArticles[] };
  confirmMutation: UseMutationResult<IArticles, Error, IArticles, unknown>;
  deleteMutation: UseMutationResult<
    { deletedId: string },
    Error,
    string,
    unknown
  >;
};

export default function AdminEditArticle({
  data,
  confirmMutation,
  deleteMutation,
}: EditArticleProp) {
  const [selected, setSelected] = useState<IArticles>(data?.articles[0]);

  const [editTitle, setEditTitle] = useState(false);
  const [editImg, setEditImg] = useState(false);
  const [editContent, setEditContent] = useState(false);
  const [editedTitle, setEditedTitle] = useState(selected?.title);
  const [editedImg, setEditedImg] = useState(selected?.imageUrl);
  const [editedContent, setEditedContent] = useState(selected?.content);

  const editContentHandler = () => {
    if (editContent && selected && editedContent) {
      const index = data.articles.findIndex(
        (a: IArticles) => a._id === selected._id
      );
      data.articles[index].content = editedContent;
      selected.content = editedContent;

      setEditContent(false);
    } else {
      setEditContent(true);
    }
  };
  const editTitleHandler = () => {
    if (editTitle && selected && editedTitle) {
      const index = data.articles.findIndex(
        (a: IArticles) => a._id === selected._id
      );
      data.articles[index].title = editedTitle;
      selected.title = editedTitle;

      setEditTitle(false);
    } else {
      setEditTitle(true);
    }
  };

  const editImgHandler = () => {
    if (editImg && selected && editedImg) {
      const index = data.articles.findIndex(
        (a: IArticles) => a._id === selected._id
      );
      data.articles[index].imageUrl = editedImg;
      selected.imageUrl = editedImg;

      setEditImg(false);
    } else {
      setEditImg(true);
    }
  };

  const selectArticle = (article: IArticles) => {
    if (
      selected &&
      (selected?.title !== editedTitle || selected.content !== editedContent)
    ) {
      alert("У вас є незбережені данні, спочатку збережіть виправлення");
      return;
    }
    setSelected(article);
    setEditedTitle(article.title);
    setEditedContent(article.content);
    setEditedImg(article.imageUrl || "");
    setEditContent(false);
    setEditTitle(false);
    setEditImg(false);
  };

  const handleApprove = () => {
    if (selected) {
      console.log(" selected:", selected.title);
      confirmMutation.mutate(selected);
      const index = data.articles.findIndex(
        (a: IArticles) => a._id === selected._id
      );
      console.log(" index:", index);
      setSelected(data.articles[index + 1]);
      selectArticle(data.articles[index + 1]);
      console.log(" selected:", selected.title);
      data.articles.splice(index, 1);
    }
  };

  const handleReject = () => {
    if (selected) {
      deleteMutation.mutate(selected._id);
      const index = data.articles.findIndex(
        (a: IArticles) => a._id === selected._id
      );
      setSelected(data.articles[index + 1]);
      selectArticle(data.articles[index + 1]);
      data.articles.splice(index, 1);
    }
  };
  return (
    <>
      <AdminList
        articles={data.articles}
        selected={selected}
        selectArticle={selectArticle}
      />

      <main className="p-6 overflow-y-auto flex flex-col gap-4">
        {selected && (
          <>
            <div className="flex gap-2">
              <button
                onClick={handleApprove}
                disabled={confirmMutation.isPending}
                className="self-start bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Підтвердити статтю
              </button>
              <button
                onClick={handleReject}
                disabled={deleteMutation.isPending}
                className="self-start bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Видалити статтю
              </button>
            </div>
            <AdminEditImagePreview
              url={selected.imageUrl || null}
              editedImg={editedImg}
              setEditedImg={setEditedImg}
              editImgHandler={editImgHandler}
              editImg={editImg}
            />
            <p>
              <span className="text-lg font-bold ml-23">Original title - </span>
              {selected.original?.title}
            </p>
            <div className="w-full">
              <button
                className="px-4 py-1 rounded-[8px] border-1 mr-2"
                type="button"
                onClick={editTitleHandler}
              >
                {editTitle ? "Save" : "Edit"}
              </button>
              <span className="text-lg font-bold ">Translated title - </span>
              {editTitle ? (
                <input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="text-lg border-b p-2 w-2/3"
                />
              ) : (
                selected.title
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AdminEditOriginContent
                content={selected.original?.content || "No original content"}
              />
              <AdminEditTranslateContent
                editContent={editContent}
                editContentHandler={editContentHandler}
                editedContent={editedContent}
                setEditedContent={setEditedContent}
                content={selected.content}
              />
            </div>
          </>
        )}
      </main>
    </>
  );
}

import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteX = document.querySelectorAll(".deleteComment");
const videoComments = document.querySelector(".video__comments");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");

  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  span2.style.cursor = "pointer";
  span2.className = "deleteComment";
  span2.addEventListener("click", handleDeleteComment);
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  const textarea = form.querySelector("textarea");
  event.preventDefault();
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = "";
    // add comment w/ js
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};
const handleDeleteComment = async (event) => {
  const comment = event.target.parentElement;
  const commentId = event.target.parentElement.dataset.id;

  const response = await fetch(`/api/comments/${commentId}/comment`, {
    method: "DELETE",
  });

  const { usersComment } = await response.json();
  console.log(usersComment);
  if (response.status === 201) {
    if (usersComment.find((v) => v == commentId)) {
      comment.remove();
    }
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

deleteX.forEach(function (deleteX) {
  deleteX.addEventListener("click", handleDeleteComment);
});

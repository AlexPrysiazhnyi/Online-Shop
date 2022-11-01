const filePicker = document.getElementById("image");

filePicker.addEventListener("change", () => {
  const imagePreviewEl = document.getElementById("image-preview");
  const files = filePicker.files;
  if (!files || files.length === 0) {
    imagePreviewEl.src = "";
    imagePreviewEl.style.display = "none";
    return;
  }
  imagePreviewEl.src = URL.createObjectURL(files[0]);
  imagePreviewEl.style.display = "block";
});

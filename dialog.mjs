export default function initDialog() {
  const dialog = document.getElementById("modal");
  const dialogShowButton = document.getElementById("settingsButton");
  dialogShowButton.addEventListener("click", (e) => {
    dialog.show();
  });
}

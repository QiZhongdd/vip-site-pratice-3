export const scrollToAnchor = (anchorname: number) => {
  if (anchorname >= 0) {
    const anchorElement = document.getElementById("" + anchorname);
    if (anchorElement) {
      anchorElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};

function hoverHundler() {
  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (target.dataset.item) {
      const dataValue = target.dataset.item;
      const hoverElement = [...document.querySelectorAll(`[data-item="${dataValue}"]`)];
      hoverElement.forEach(item => {
        item.classList.add('shadow');
        if (item.dataset.title) {
          item.classList.add('display');
        }
      });
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target;
    if (target.dataset.item) {
      const allDataItem = [...document.querySelectorAll('[data-item]')];
      allDataItem.forEach(item => {
        item.classList.remove('shadow');
        item.classList.remove('display');
      });
    }
  });
}

export default hoverHundler;

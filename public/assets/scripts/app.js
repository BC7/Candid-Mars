const galleryDOM = document.getElementById('gallery-content');
const loadMoreDOM = document.getElementById('load-more-btn');
const now = new Date();
let gallery = [];
let page = 1;

let filterParameters = {
  rover: 'curiosity',
  earth_month: MONTHS.indexOf(now.getMonth()) + 1,
  earth_day: now.getDate(),
  earth_year: now.getFullYear(),
};

const getRecentPhotos = () => {
  let recentXHR = new XMLHttpRequest();

  renderLoading();
  recentXHR.onreadystatechange = () => {
    if (recentXHR.readyState === 4) {
      const response = JSON.parse(recentXHR.responseText);
      if (response.photos.length > 0) {
        galleryDOM.textContent = '';

        //   update default selected filter based on day returned
        filterParameters = {
          rover: response.rover,
          earth_year: response.earth_date.split('-')[0],
          earth_month: response.earth_date.split('-')[1],
          earth_day: response.earth_date.split('-')[2],
        };

        let options = document.getElementsByTagName('option');
        for (let i = 0; i < options.length; i++) {
          if (
            options[i].className.includes('rover-option') &&
            options[i].value == response.rover
          ) {
            options[i].selected = true;
          } else if (
            options[i].className.includes('day-option') &&
            options[i].value == response.earth_date.split('-')[2]
          ) {
            options[i].selected = true;
          } else if (
            options[i].className.includes('month-option') &&
            options[i].value == response.earth_date.split('-')[1]
          ) {
            options[i].selected = true;
          } else if (
            options[i].className.includes('year-option') &&
            options[i].value == response.earth_date.split('-')[0]
          ) {
            options[i].selected = true;
          }
        }
        clearLoading();
        renderGallery(response.photos);
      } else {
        renderError();
      }
    }
  };

  recentXHR.open('GET', `/api/latest/${filterParameters.rover}`);
  recentXHR.send();
};

loadMoreDOM.addEventListener('click', () => {
  const { rover } = filterParameters;
  const earth_date = `${filterParameters.earth_year}-${filterParameters.earth_month}-${filterParameters.earth_day}`;
  nextPageXHR = new XMLHttpRequest();
  page += 1;
  nextPageXHR.onreadystatechange = () => {
    if (nextPageXHR.readyState === 4) {
      const response = JSON.parse(nextPageXHR.responseText);
      if (response.photos.length > 0) {
        gallery = gallery.concat(response.photos);
        clearLoading();
        renderGallery(response.photos);
      } else {
        hideLoadMore();
      }
    }
  };

  nextPageXHR.open('GET', `/api/archives/${rover}/${earth_date}?pg=${page}`);
  nextPageXHR.send();
});
const loadMore = () => {};

const renderGallery = (items) => {
  items.forEach((item) => {
    let photoDOM = document.createElement('img');
    photoDOM.className = 'gallery-item';
    photoDOM.src = item.img_src;

    photoDOM.addEventListener('click', () => {
      renderModal(item);
    });

    galleryDOM.appendChild(photoDOM);
  });
  showLoadMore();
};

initializeFilters();
getRecentPhotos();

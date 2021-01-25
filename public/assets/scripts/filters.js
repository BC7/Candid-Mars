const filterForm = document.getElementById('filter-form');
const roverSelectDOM = document.getElementById('rover-select');
const monthSelectDOM = document.getElementById('month-select');
const daySelectDOM = document.getElementById('day-select');
const yearSelectDOM = document.getElementById('year-select');

filterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let searchXHR = new XMLHttpRequest();
  const { rover } = filterParameters;
  const earth_date = `${filterParameters.earth_year}-${filterParameters.earth_month}-${filterParameters.earth_day}`;
  renderLoading();
  gallery = [];
  page = 1;
  searchXHR.onreadystatechange = () => {
    if (searchXHR.readyState === 4) {
      const response = JSON.parse(searchXHR.responseText);
      galleryDOM.textContent = '';
      if (response.photos.length > 0) {
        clearLoading();
        renderGallery(response.photos);
      } else {
        renderError();
      }
    }
  };

  searchXHR.open('GET', `/api/archives/${rover}/${earth_date}`);
  searchXHR.send();
});

const initializeFilters = () => {
  let selectInpoutDOMs = document.getElementsByTagName('select');
  for (let i = 0; i < selectInpoutDOMs.length; i++) {
    selectInpoutDOMs[i].addEventListener('change', (e) => {
      filterParameters[e.target.name] = e.target.value;
      if (e.target.name == 'earth_month' || e.target.name == 'earth_month')
        renderDays(
          calculateMaxDaysinMonth(
            filterParameters.earth_year,
            filterParameters.earth_month
          )
        );
      console.log(filterParameters);
    });
  }

  //   generate month options
  MONTHS.forEach((month, index) => {
    let monthOptionDOM = document.createElement('option');
    monthOptionDOM.value = index + 1;
    monthOptionDOM.textContent = month;
    monthOptionDOM.className = 'month-option';
    if (index == now.getMonth()) monthOptionDOM.selected = true;
    monthSelectDOM.appendChild(monthOptionDOM);
  });

  //   generate year options
  for (let k = FRST_LANDING_YEAR; k <= now.getFullYear(); k++) {
    let yearOptionDOM = document.createElement('option');
    yearOptionDOM.value = k;
    yearOptionDOM.textContent = k;
    yearOptionDOM.className = 'year-option';
    if (k == now.getFullYear()) yearOptionDOM.selected = true;
    yearSelectDOM.appendChild(yearOptionDOM);
  }

  //   generate day options
  renderDays(calculateMaxDaysinMonth(now.getFullYear(), now.getMonth()));
};

const renderDays = (count) => {
  for (let d = 1; d <= count; d++) {
    let dayOptionDOM = document.createElement('option');
    dayOptionDOM.value = d;
    dayOptionDOM.textContent = d;
    dayOptionDOM.className = 'day-option';
    if (d == now.getDate()) dayOptionDOM.selected = true;
    daySelectDOM.appendChild(dayOptionDOM);
  }
};

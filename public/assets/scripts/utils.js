const errorDOM = document.getElementById('error');
const loadingDOM = document.getElementById('loading');

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const FRST_LANDING_YEAR = 2000;

const calculateMaxDaysinMonth = (year, month) => {
  const lastDay = new Date(year, month, 0).getDate();
  return lastDay;
};

const renderError = () => {
  loadMoreDOM.style.display = 'none';
  loadingDOM.style.display = 'none';
  errorDOM.style.display = 'block';
};

const clearError = () => {
  errorDOM.style.display = 'none';
};

const renderLoading = () => {
  document.getElementById('gallery-content').textContent = '';
  errorDOM.style.display = 'none';
  loadingDOM.style.display = 'block';
};

const clearLoading = () => {
  loadingDOM.style.display = 'none';
};

const showLoadMore = () => {
  loadMoreDOM.style.display = 'block';
};

const hideLoadMore = () => {
  loadMoreDOM.style.display = 'none';
};

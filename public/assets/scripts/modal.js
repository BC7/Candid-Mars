const modalDOM = document.getElementById('details-modal');
const modalCloseDOM = document.getElementsByClassName('modal-close')[0];

modalCloseDOM.addEventListener('click', () => {
  modalDOM.style.display = 'none';
});

window.onclick = function (event) {
  if (event.target == modalDOM) {
    modalDOM.style.display = 'none';
  }
};

const renderModal = (details) => {
  document.getElementById('photo-id').textContent = details.id;
  document.getElementById('photo-preview').src = details.img_src;
  document.getElementById('photo-sol').textContent = details.sol;
  document.getElementById(
    'photo-camera'
  ).textContent = `${details.camera.full_name} (${details.camera.name})`;
  document.getElementById('photo-rover').textContent = details.rover.name;
  document.getElementById('photo-rover-launch').textContent =
    details.rover.launch_date;
  document.getElementById('photo-rover-landing').textContent =
    details.rover.landing_date;
  document.getElementById('photo-rover-status').textContent =
    details.rover.status;

  modalDOM.style.display = 'block';
};

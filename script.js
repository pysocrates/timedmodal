	function setCookie(name, value, days) {
	  const expires = new Date(Date.now() + days * 864e5).toUTCString();
	  document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + expires + ';path=/';
	}

	function getCookie(name) {
	  const cookies = document.cookie.split('; ').reduce((result, c) => {
	    const [key, value] = c.split('=');
	    result[key] = value;
	    return result;
	  }, {});

	  return cookies[name];
	}

	function showModal() {
	  const modal = new bootstrap.Modal(document.getElementById('myModal'), { keyboard: false });
	  modal.show();
	}

	function checkIfModalShouldBeShown() {
	  const visits = getCookie('visits');
	  const modalShown = getCookie('modalShown');

	  if (!visits) {
	    setCookie('visits', 1, 30);
	  } else if (visits == 1 && !modalShown) {
	    setTimeout(() => {
	      showModal();
	      setCookie('modalShown', true, 30);
	    }, 55000);
	  }
	}

	document.addEventListener('DOMContentLoaded', () => {
	  checkIfModalShouldBeShown();

	  document.getElementById('closeModal').addEventListener('click', () => {
	    const modal = bootstrap.Modal.getInstance(document.getElementById('myModal'));
	    modal.hide();
	  });
	});
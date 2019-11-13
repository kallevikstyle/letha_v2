(function() {
	const searchField = document.querySelector('#search-field')
		searchButton = document.querySelector('#search-button');

	searchButton.addEventListener('click', function() {
		window.location.href = `http://kallevikstyle.no/ixd-ca/shop.html?search=${searchField.value}`;
	});
	searchField.addEventListener('keypress', function(e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			window.location.href = `http://kallevikstyle.no/ixd-ca/shop.html?search=${searchField.value}`;
		}
	});
})();
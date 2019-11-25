// Remember link reference to script on category and detail pages!!!!!!!!!

(function() {
	const shopButton = document.querySelector('#shop-button'),
		shopSubmenu = document.querySelector('#shop-submenu');

		shopButton.addEventListener('mouseover', function() {
			document.querySelector('#shop-submenu').classList.toggle('showSubMenu');
		});
})();

// After pseudo class to shop link needed (with down arrow)
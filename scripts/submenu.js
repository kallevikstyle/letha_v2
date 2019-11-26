(function() {
	const shopButton = document.querySelector('#shop-button'),
		shopSubmenu = document.querySelector('#shop-submenu');

	// Show submenu on mouseover
	shopButton.addEventListener('mouseover', function() {
		shopSubmenu.classList.add('showSubMenu');
		// Hide submenu on mouseleave
		shopButton.addEventListener('mouseleave', function() {
			setTimeout(function() {
				shopSubmenu.classList.remove('showSubMenu');
			}, 400);
		});
	});
})();

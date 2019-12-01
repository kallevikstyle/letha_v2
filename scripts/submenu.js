(function() {
	const shopButton = document.querySelector('#shop-button'),
		shopSubmenu = document.querySelector('#shop-submenu'),
		screen = window.matchMedia("(max-width: 799px)");

	// Show submenu on mouseover, or click on smaller screens
	if (!screen.matches) {
		shopButton.addEventListener('mouseover', function() {
			shopSubmenu.classList.add('showSubMenu');
			// Hide submenu on mouseleave
			shopButton.addEventListener('mouseleave', function() {
				setTimeout(function() {
					shopSubmenu.classList.remove('showSubMenu');
				}, 400);
			});
		});
	} else {
		shopButton.addEventListener('click', function(e) {
			e.preventDefault();
			shopSubmenu.classList.toggle('showSubMenu');
		});
	}

})();

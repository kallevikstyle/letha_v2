// Remember link reference to script on category and detail pages!!!!!!!!!

(function() {
	const shopButton = document.querySelector('#shop-button'),
		shopSubmenu = document.querySelector('#shop-submenu');

	// Show submenu on mouseover
	shopButton.addEventListener('mouseover', function() {
		shopSubmenu.classList.add('showSubMenu');

		shopButton.addEventListener('mouseleave', function() {
		//document.querySelector('#shop-submenu').classList.toggle('showSubMenu');
			setTimeout(function() {
				shopSubmenu.classList.remove('showSubMenu');
			}, 400);
			
		});
	});

	

})();

// After pseudo class to shop link needed (with down arrow)
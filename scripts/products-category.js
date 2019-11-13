function showAllProducts(shoes) {
	const searchResultsContainer = document.querySelector('#search-results');

	if (window.location.href.includes("brogues.html")) {
		let searchResult = shoes.filter(function(shoes) {
			return shoes.category === "brogues";
		});

		for (let i = 0; i < searchResult.length; i++) {
			displayProducts(searchResultsContainer, searchResult[i]);
		}
	} else if (window.location.href.includes("boots.html")) {
		let searchResult = shoes.filter(function(shoes) {
			return shoes.category === "boots";
		});

		for (let i = 0; i < searchResult.length; i++) {
			displayProducts(searchResultsContainer, searchResult[i]);
		}
	}
}
//Display search results on page
function displayProducts(parentContainer, product) {
	const productLink = document.createElement('a'),
		productUrl = `../product.html?id=${product.id}`,
		itemContainer = document.createElement('div'),
		productImage = document.createElement('div'),
		productTeaser = document.createElement('div'),
		productTitle = document.createElement('div'),
		productDetails = document.createElement('div')
		productStars = document.createElement('div'),
		productPrice = document.createElement('div');
	let starCount = 1,
		productRating = "";

	// Assign classes to div elements
	itemContainer.className = "item-container";
	productImage.className = "product-thumbnail";
	productTeaser.className = "product-teaser flex";
	productTitle.className = "product-title";
	productDetails.className = "product-details";
	productStars.className = "product-stars";
	productPrice.className = "product-price";

	// Find product's rating
	while (starCount <= 5) {
		if (starCount <= product.rating) {
			productRating += `<i class="fas fa-star"></i>`;
		} else {
			productRating += `<i class="far fa-star"></i>`;
		}
		
		starCount++;
	}

	// Construct the element hierarchy
	productLink.setAttribute("href", productUrl);
	productImage.innerHTML = `
	<img src="${product.imageUrl}" alt="${product.name}">
	`;
	productTitle.innerHTML = `
	<h3>${product.name}</h3>
	<p>${product.shortdescription}</p>
	`;
	productStars.innerHTML = `
	${productRating}
	`;
	productPrice.innerHTML = `
	&dollar;${product.price}
	`;
	productDetails.appendChild(productStars);
	productDetails.appendChild(productPrice);
	productTeaser.appendChild(productTitle);
	productTeaser.appendChild(productDetails);
	itemContainer.appendChild(productImage);
	itemContainer.appendChild(productTeaser);
	productLink.appendChild(itemContainer);
	parentContainer.appendChild(productLink);
}

// Get product data from JSON
(function() {
	fetch('http://kallevikstyle.no/ixd-ca/json/shoes.json')
	.then(result => result.json())
	.then((shoes) => {
		showAllProducts(shoes);
	})
	.catch(err => console.log(err));
})();
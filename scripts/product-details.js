function searchProductId(shoes) {
	let id = 0,
		foundProduct = false;
	if (!window.location.search) {
		//Error message
	} else {
		// Get id from location.search
		id = Number(window.location.search.slice(4));
	}
	// Find product with the correct id
	for (let i = 0; i < shoes.length; i++) {
		if (id === shoes[i].id) {
			foundProduct = true;
			showProductDetails(shoes[i]);
		}
	}
	// If product is not found
	if (!foundProduct) {
		invalidId();
	}
}

// Show product details
function showProductDetails(product) {
	const parentContainer = document.querySelector('#product-description'),
		productImage = document.querySelector('#product-image'),
		productHeader = document.createElement('header'),
		productText = document.createElement('section'),
		productSizesSection = document.createElement('section'),
		productPrice = document.createElement('div'),
		cartButton = document.createElement('div');
	let shoeSizes = "",
		productRating = "",
		starCount = 1;

	// Put product name in breadcrumb
	document.querySelector('#product-name').innerHTML = `${product.name}`;

	// Assign IDs to elements
	productText.id = "product-text";
	productSizesSection.id = "sizes";
	productPrice.id = "product-price";
	cartButton.className = "cta-button";

	// Find product's rating
	while (starCount <= 5) {
		if (starCount <= product.rating) {
			productRating += `<i class="fas fa-star"></i>`;
		} else {
			productRating += `<i class="far fa-star"></i>`;
		}
		
		starCount++;
	}


	// Set up element hierarchy
	productHeader.innerHTML = `
		<h2 id="product-name">${product.name}</h2>
		<div class="product-stars">${productRating}</div>
	`;
	productText.innerHTML = `
		<p>${product.description}</p>
		<h3>Materials</h3>
		<ul id="materials">
			<li>Lorem</li>
			<li>Ipsum</li>
		</ul>
	`;
	// Loop through all available sizes for product
	for (let s = 0; s < product.size.length; s++) {
		shoeSizes += `<option value="${product.size[s]}">${product.size[s]}</option>`;
	}
	productSizesSection.innerHTML = `
		<h3>Select your size</h3>
			<form>
				<select name="sizes">
				${shoeSizes};
				</select>
			</form>
	`;
	productPrice.innerHTML = `<p>&dollar;${product.price}</p>`;
	cartButton.innerHTML = `
		<a href="#">
		ADD TO CART <i class="fas fa-shopping-cart"></i>
		</a>
	`;
	productImage.innerHTML = `
		<img src="${product.imageUrl}" alt="${product.name} from Letha">
	`;
	

	parentContainer.appendChild(productHeader);
	parentContainer.appendChild(productText);
	parentContainer.appendChild(productSizesSection);
	parentContainer.appendChild(productPrice);
	parentContainer.appendChild(cartButton);

}

// Show an error message if ID doesn't exist
function invalidId() {
	const parentContainer = document.querySelector('#product-description'),
		productHeader = document.createElement('header'),
		errorImage = document.querySelector('#product-image');

	errorImage.innerHTML = `
		<img src="https://cdn.pixabay.com/photo/2016/06/03/08/18/oops-1432954_960_720.png" alt="Sorry, this product was not found">
	`;
	productHeader.innerHTML = `
		<h2>We are sorry...</h2>
		<p>We can not find the product you are looking for. You might want to check out our popular products below, or head back to the <a href="../shop.html">shop</a> to search for something else.</p>
	`
	parentContainer.appendChild(productHeader);
}

// Display popular products
function showSuggestedProducts(shoes){
	const searchResultsContainer = document.querySelector('#search-results');
	// Load all products onto page
	for (let i = 0; i < shoes.length; i++) {
		if (shoes[i].popular) {
			displayProducts(searchResultsContainer, shoes[i]);
		}
	}
}
function displayProducts(parentContainer, product) {
	const productLink = document.createElement('a'),
		productUrl = `product.html?id=${product.id}`,
		itemContainer = document.createElement('div'),
		productImage = document.createElement('div'),
		productTeaser = document.createElement('div'),
		productTitle = document.createElement('div'),
		productDetails = document.createElement('div')
		productStars = document.createElement('div'),
		productPrice = document.createElement('div');

	// Assign classes to div elements
	itemContainer.className = "item-container";
	productImage.className = "product-thumbnail";
	productTeaser.className = "product-teaser flex";
	productTitle.className = "product-title";
	productDetails.className = "product-details";
	productStars.className = "product-stars";
	productPrice.className = "product-price";

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
	<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
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
		searchProductId(shoes);
		showSuggestedProducts(shoes);
	})
	.catch(err => console.log(err));
})();
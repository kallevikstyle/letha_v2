function showAllProducts(shoes){
	const searchResultsContainer = document.querySelector('#search-results');

	if (!window.location.search) {
		// Load all products onto page
		for (let i = 0; i < shoes.length; i++) {
			displayProducts(searchResultsContainer, shoes[i]);
		}
	} else if (window.location.search.includes("search")) {
		// Filter by search field
		const searchText = window.location.search.slice(8); 
			searchPattern = new RegExp(searchText, 'i');
		let searchResult = shoes.filter(function(shoes) {
			return searchPattern.test(shoes.name);
		});

		for (let i = 0; i < searchResult.length; i++) {
			displayProducts(searchResultsContainer, searchResult[i]);
		}
	} else if (window.location.search.includes("discount")) {
		// Search for products with discount
		let searchResult = shoes.filter(function(shoes) {
			return (shoes.discount);
		});
		for (let i = 0; i < searchResult.length; i++) {
			displayProducts(searchResultsContainer, searchResult[i]);
		}
	}  else if (window.location.search.includes("popular")) {
		// Search for popular products
		let searchResult = shoes.filter(function(shoes) {
			return (shoes.popular);
		});
		for (let i = 0; i < searchResult.length; i++) {
			displayProducts(searchResultsContainer, searchResult[i]);
		}
	} else if (window.location.search.includes("new")) {
		// Search for new products
		let searchResult = shoes.filter(function(shoes) {
			return (shoes.new);
		});
		for (let i = 0; i < searchResult.length; i++) {
			displayProducts(searchResultsContainer, searchResult[i]);
		}
	}
	// Activate filter search function
	filterSearch(shoes);
	
}

function filterSearch(shoes) {
	// Assign variables to search filters
	const filterCategory = document.querySelector('#filter-category'),
		filterSize = document.querySelector('#filter-size'),
		filterColor = document.querySelector('#filter-color'),
		filterSort = document.querySelector('#filter-sort'),
		fieldSets = document.getElementsByTagName('fieldset');
	let checkBoxes = document.getElementsByClassName('filter'),
		activeFilterValues = [],
		activeFilterNames = [];

	
	// Event listeners to show filter-box on hover
	filterCategory.addEventListener('mouseover', function() {
		hideElements(fieldSets);
		showFilterBox(getElementLeftPosition(filterCategory));
		document.querySelector('#category').style.display = 'block';
	});
	filterSize.addEventListener('mouseover', function() {
		hideElements(fieldSets);
		showFilterBox(getElementLeftPosition(filterSize));
		document.querySelector('#size').style.display = 'block';	
	});
	filterColor.addEventListener('mouseover', function() {
		hideElements(fieldSets);
		showFilterBox(getElementLeftPosition(filterColor));
		document.querySelector('#color').style.display = 'block';
	});

	// Update activeFilters arrays with all filters currently selected
	// - Giving Name and Values arrays the same index
	for (let i = 0; i < checkBoxes.length; i++) {
		checkBoxes[i].addEventListener('change', function() {
			if (!checkBoxes[i].checked) {
				// Remove unselected items from array
				activeFilterNames.splice(activeFilterValues.indexOf(checkBoxes[i].value), 1);
				activeFilterValues.splice(activeFilterValues.indexOf(checkBoxes[i].value), 1);
			} else {
				// Add selected values and filter names to arrays
				activeFilterNames.push(checkBoxes[i].name);
				activeFilterValues.push(checkBoxes[i].value);
				
			}
			// Perform search based on selected filters
			if (activeFilterValues.length < 1) {
				document.querySelector('#search-results').innerHTML = "";
				window.location.search = "";
				showAllProducts(shoes);
			} else {
				findSearchResults(shoes, activeFilterNames, activeFilterValues);
			}
		});
	}
}

// Show and hide filter search box
function showFilterBox(leftPos) {
	let filterBox = document.querySelector('#filter-box');

	filterBox.style.display = 'block';
	filterBox.style.left = leftPos + 'px';
	// Make filter-box disappear when mouse leaves
	filterBox.addEventListener('mouseleave', function() {
		filterBox.style.display = 'none';
	});
}
// This function hides elements
function hideElements(elements) {
	for (let i = 0; i < elements.length; i++) {
		elements[i].style.display = 'none';
	}
}

function getElementLeftPosition(element) {
	// Return the left position of element
	return element.getBoundingClientRect().left;
}

function findSearchResults(shoes, activeFilterNames, activeFilterValues) {
	const searchResultsContainer = document.querySelector('#search-results');
	let shoesResult = new Set();

	// Iterate through all items in shoes.json to search for matches
	for (let i = 0; i < shoes.length; i++) {
		// Iterate through all search filter values
		for (let f = 0; f < activeFilterValues.length; f++) {
			let match = matchFiltersWithProducts(activeFilterNames[f], activeFilterValues[f], shoes[i]);
			// Push the match, if any, to resulting arrray
			if (match) {
				shoesResult.add(match);
			}
		}
	}
	// Convert SET to ARRAY
	shoesResult = Array.from(shoesResult);
	
	// Display products on page
	searchResultsContainer.innerHTML = "";
	for (let item = 0; item < shoesResult.length; item++) {
		displayProducts(searchResultsContainer, shoesResult[item]);
	}
}
// Search for match by filters in shoes.json
function matchFiltersWithProducts(filterName, filterValue, product) {
	// Check which type of filter is used, and match values with shoe properties
	switch (filterName) {
		case "category":
			if (filterValue === product.category) {
				return product;
			} else {
				return;
			}
			break;
		case "size":
			if (product.size.includes(filterValue)) {
				return product;
			} else {
				return;
			}
			break;
		case "color":
			if (filterValue === product.color) {
				return product;
			} else {
				return;
			}
			break;
	}
}
//Display search results on page
function displayProducts(parentContainer, product) {
	const productLink = document.createElement('a'),
		productUrl = `shop/product.html?id=${product.id}`,
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
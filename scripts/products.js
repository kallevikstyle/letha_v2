function showAllProducts(shoes){
	const searchResultsContainer = document.querySelector('#search-results');

	if (!window.location.search) {
		// Load all products onto page
		for (let i = 0; i < shoes.length; i++) {
			displayProducts(searchResultsContainer, shoes[i]);
		}
	} else if (window.location.search.includes("search")) {
		// Filter by search field
		const searchText = window.location.search.slice(8),
			searchPattern = new RegExp(searchText, 'i');
		let searchResult = shoes.filter(function(shoes) {
			return searchPattern.test(shoes.name);
		});
		let searchTextArr = [];
		// Displaying 'showing results for'
		searchTextArr.push(searchText);
		showingResultsFor(searchTextArr);

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
	
	// Display on page which filters are active
	showingResultsFor(activeFilterValues);

	// Display products on page
	searchResultsContainer.innerHTML = "";
	for (let item = 0; item < shoesResult.length; item++) {
		displayProducts(searchResultsContainer, shoesResult[item]);
	}
}

// Function to display to user which filters are being searched for
function showingResultsFor(filters) {
	const parentContainer = document.querySelector('#results-for');
	let html = "<p>Showing results for ";

	// Adding filters to html variable
	for (let i = 0; i < filters.length; i++) {
		if (i === 0 && filters.length === 1) {
			html += "<span>" + filters[i] + "</span>" + ".";
		} else if (i === (filters.length - 1)) {
			html += "and " + "<span>" + filters[i] + "</span>" + ".";
		} else {
			html += "<span>" + filters[i] + "</span>" + ", ";
		}
	}
	html += "</p>";

	// Appending the html to parent div
	parentContainer.innerHTML = html;
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
		productPrice = document.createElement('div'),
		productDiscount = document.createElement('div');
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
	productDiscount.className = "discount";

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
	<img src="${product.thumbnail}" alt="${product.name}">
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

	// Check if there is a discount
	if (product.discount) {
		productDiscount.innerHTML = `&minus;${product.discount}&percnt;`;
		
		itemContainer.appendChild(productDiscount);
	}
}

// Get product data from JSON
(function() {
	// fetch('http://kallevikstyle.no/ixd-ca/json/shoes.json')
	// .then(result => result.json())
	// .then((shoes) => {
	// 	showAllProducts(shoes);
	// })
	// .catch(err => console.log(err));

	// TEMPORARY---------------
	var shoes = [
  {
"name": "Hardy Hiker",
    "description": "For those who enjoy the outdoors, the Hardy Hiker is for you. This trendy boot is made from strong, durable leather and utilises the latest sole technology to ensure a comfortable fit. The boot is only available in brown leather. Whether you wear it while exploring the city or heading into the hills, this boot is the perfect accessory for the rugged, chic look.",
    "shortdescription": "The perfect shoes for those who love the outdoors",
    "imageUrl": "http://kallevikstyle.no/portfolio1/letha/images/products/large/product_hardy-hiker_large.jpeg",
    "thumbnail": "http://kallevikstyle.no/portfolio1/letha/images/products/thumbnails/product_hardy-hiker_280.jpg",
    "id": 1,
    "category": "boots",
    "rating": 5,
    "price": 199,
    "discount": null,
    "size": ["43", "44"],
    "color": "brown",
    "popular": true,
    "new": false
  },
  {
"name": "Bashful Brogue",
    "description": "Our Bashful Brogue is one of our most popular shoes. It is perfect as formal wear or for office use. Its comfortable sole makes it perfect for all day wear. The brogue is made from brown or black leather and is studded using our unique pattern.",
    "shortdescription": "Perfect as formal wear or for office use",
    "imageUrl": "http://kallevikstyle.no/portfolio1/letha/images/products/large/product_bashful-brogue_large.jpeg",
    "thumbnail": "http://kallevikstyle.no/portfolio1/letha/images/products/thumbnails/product_bashful-brogue_280.jpg",
    "id": 2,
    "category": "brogues",
    "rating": 4,
    "price": 179,
    "discount": null,
    "size": ["43", "44"],
    "color": "brown",
    "popular": true,
    "new": false
  },
  {
"name": "Nice and Easy",
    "description": "Perfect for every occasion, Nice and Easy is the perfect all-rounder to ensure you're always looking at the top of your game. It's easy to wear and maintain and will be the perfect accompaniment for after dinner drinks, an interview, or even your next date.",
    "shortdescription": "An all-rounder perfect for any occasion",
    "imageUrl": "http://kallevikstyle.no/portfolio1/letha/images/products/large/product_nice-and-easy_large.jpeg",
    "thumbnail": "http://kallevikstyle.no/portfolio1/letha/images/products/thumbnails/product_nice-and-easy_280.jpg",
    "id": 3,
    "category": "brogues",
    "rating": 5,
    "price": 229,
    "discount": 25,
    "size": ["44"],
    "color": "brown",
    "popular": true,
    "new": false
  },
  {
"name": "Calm and Casual",
    "description": "The calm and casual shoe is perfect for someone who prioritizes both comfort and style. The shoe is light to wear and perfect for relaxing with friends.",
    "shortdescription": "For those who prioritize both comfort and style",
    "imageUrl": "http://kallevikstyle.no/portfolio1/letha/images/products/large/product_calm-and-casual_large.jpeg",
    "thumbnail": "http://kallevikstyle.no/portfolio1/letha/images/products/thumbnails/product_calm-and-casual_280.jpg",
    "id": 4,
    "category": "boots",
    "rating": 3,
    "price": 129,
    "discount": 25,
    "size": ["44"],
    "color": "beige",
    "popular": true,
    "new": true
  },
  {
"name": "Urbana",
    "description": "This boot with its characteristic hard-worn look has a real industrial feel and offers the wearer a stylish and down-to-earth look.",
    "shortdescription": "The casual and stylish boots",
    "imageUrl": "http://kallevikstyle.no/portfolio1/letha/images/products/large/product_urbana_large.jpeg",
    "thumbnail": "http://kallevikstyle.no/portfolio1/letha/images/products/thumbnails/product_urbana_280.jpg",
    "id": 5,
    "category": "boots",
    "rating": 4,
    "price": 159,
    "discount": 50,
    "size": ["43"],
    "color": "brown",
    "popular": false,
    "new": true
  }
];
showAllProducts(shoes);
	// TEMPORARY----------------
})();
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
		productPrice = document.createElement('div'),
		productDiscount = document.createElement('div'),
		discountedPrice = function(price, discount) {
			return price - (price * (discount / 100));
		};
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

		// Display old price and discounted price
		productPrice.innerHTML = `
			<span>&dollar;${product.price}</span>&dollar;${discountedPrice(product.price, product.discount)}
		`;
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
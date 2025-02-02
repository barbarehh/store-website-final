document.addEventListener("DOMContentLoaded", function () {
    const productGrid = document.querySelector(".product-grid");
    const searchInput = document.getElementById("search");
    let allProducts = [];

    productGrid.style.display = "grid";
    productGrid.style.gridTemplateColumns = "repeat(4, 1fr)"; 
    productGrid.style.gap = "20px";
    productGrid.style.justifyContent = "center";
    productGrid.style.maxWidth = "1000px";
    productGrid.style.margin = "0 auto";

    // Get data
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => {
            allProducts = data.slice(0, 8); 
            displayProducts(allProducts);
        })
        .catch(error => console.error("error fetching", error));

    function displayProducts(products) {
        productGrid.innerHTML = ""; 


        // If no product thn "item not found" message
        if (products.length === 0) {
            const notFoundMessage = document.createElement("p");
            notFoundMessage.textContent = "Item not found";
            notFoundMessage.style.fontSize = "20px";
            notFoundMessage.style.color = "#777";
            notFoundMessage.style.textAlign = "center";
            notFoundMessage.style.gridColumn = "span 4"; 
            productGrid.appendChild(notFoundMessage);
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.style.display = "flex";
            productCard.style.flexDirection = "column";
            productCard.style.alignItems = "flex-start"; 
            productCard.style.textAlign = "left";
            productCard.style.width = "100%"; 
            productCard.style.padding = "10px"; 
            
            const img = document.createElement("img");
            img.src = product.image;
            img.alt = product.title;
            img.style.width = "150px";
            img.style.height = "150px";

            const title = document.createElement("h3");
            title.textContent = product.title;
            title.style.fontSize = "14px";
            title.style.margin = "10px 0";


            // star ratings
            const ratingContainer = document.createElement("div");
            ratingContainer.classList.add("rating");
            ratingContainer.style.display = "flex";
            ratingContainer.style.alignItems = "center"; 
            ratingContainer.style.justifyContent = "flex-start";
            ratingContainer.style.marginBottom = "5px";
            ratingContainer.style.width = "100%";

            const ratingValue = Math.round(product.rating.rate * 2) / 2; 
            const fullStars = Math.floor(ratingValue); 
            const halfStar = ratingValue % 1 !== 0; 

            for (let i = 0; i < fullStars; i++) {
                const star = document.createElement("img");
                star.src = "assets/Stars/full-star.png"; 
                star.classList.add("star");
                star.style.width = "18px";
                star.style.height = "18px";
                star.style.marginRight = "2px";
        
                ratingContainer.appendChild(star);
            }

            if (halfStar) {
                const halfStarImg = document.createElement("img");
                halfStarImg.src = "assets/Stars/half-star.png"; 
                halfStarImg.classList.add("star");
                halfStarImg.style.width = "18px";
                halfStarImg.style.height = "18px";
                halfStarImg.style.marginRight = "2px";
                ratingContainer.appendChild(halfStarImg);
            }

            const ratingText = document.createElement("span");
            ratingText.textContent = ` ${product.rating.rate}/5`;
            ratingText.style.fontSize = "14px";
            ratingText.style.color = "#333"; 
            ratingText.style.marginLeft = "5px"; 
            ratingContainer.appendChild(ratingText);

            const price = document.createElement("p");
            price.classList.add("price");
            price.textContent = `$${product.price.toFixed(2)}`;
            price.style.fontWeight = "bold";
            price.style.marginTop = "8px";
            productCard.appendChild(img);
            productCard.appendChild(title);
            productCard.appendChild(ratingContainer);
            productCard.appendChild(price);
            productGrid.appendChild(productCard);
        });
    }

    // search funct
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const searchText = searchInput.value.toLowerCase();
            const filteredProducts = allProducts.filter(product => 
                product.title.toLowerCase().includes(searchText)
            );
            displayProducts(filteredProducts);
        }
    });
});

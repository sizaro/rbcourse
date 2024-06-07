export function categoryTemplate(data)
{
    return`<div class="grid-item">
            <a href="${data.categoryPage}">
            <img src=${data.categoryUrlImage} alt="${data.category}"> ${data.category}
            </a></div>`                       
}

export function productTemplate(data)
{
    return `<div class="grid-fruit" data-id="${data.Id}">
    <div data-id="${data.Id}">
    <a href="${data.Id}">
    <img src=${data.ImageUrl} alt="${data.Name}">
    <P class="name">${data.Name}</P>
    <p class="description">${data.Description}"</p>
    <p class="price">Price: $${data.price}</p>
    </a>
    </div>
    <div class="buttons">
    <button class="addToCart" data-id="${data.Id}">Add To Cart</button>
    </div>
    </div>`
          
}


export function cartTemplate(data)
{
    return `<div class="grid-fruit" data-id="${data.Id}">
    <div data-id="${data.Id}">
    <a href="${data.Id}">
    <img src=${data.ImageUrl} alt="${data.Name}">
    <P class="name">${data.Name}</P>
    <p class="description">${data.Description}"</p>
    <p class="price">Price: $${data.price}</p>
    </a>
    </div>
    <div class="buttons">
    <button class="removeFromCart" data-id="${data.Id}">Remove From Cart</button>
    </div>
    </div>`
          
}



export default class productData{
    constructor(product){
        this.product = product
        this.path = "/json/groceries.json"
    }

    async getData() {
        const data = await fetch(this.path)
        const response = data.json()
        return response
        
    }

    async getDataByCategory() {
        const dataCategory = await this.getData()
        return dataCategory.categories
    }

    async getDataByProduct(Fruits) {
        const dataProduct = await this.getData()
        const productName = ((dataProduct.categories).find((category) => category.category === Fruits))
        return productName.items
    }

    async getDataByProductId(productId) {
        console.log("do you se the productId")
        const dataProduct = await this.getData();
        const allItems = dataProduct.categories.flatMap(category => category.items);
        const productInfo = allItems.find(item => item.Id ===productId );
        console.log("do you see the info",productInfo)
        return productInfo;
    }
    
}
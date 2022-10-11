
var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCategory")
var productDescription = document.getElementById("productDescription")
var productCount = document.getElementById("productCount")
var productContainer;
var submit = document.getElementById("submit")
var productSearch = document.getElementById("search")
var mode = "create"
var indexOfProduct;

if( localStorage.getItem("ourProducts") == null ){
   productContainer = []
}
else {
   productContainer = JSON.parse(localStorage.getItem("ourProducts") ) 
   displayProduct()
}

function addProduct() {
   if (productName.value != "" &&
      productPrice.value != "" &&
      productCategory.value != "" &&
      productDescription.value != "" &&
      productDescription.value != "" 
   ) {
       var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      desc: productDescription.value,
      count:productCount.value 
   }
      if (mode === "create") {
         productContainer.push(product)
         
      } else {
         productContainer[indexOfProduct] = product
         submit.innerHTML = "Add Product"

      }
      localStorage.setItem("ourProducts" , JSON.stringify(productContainer))
         displayProduct()
         clearInp()
   }
  
   console.log(productContainer.length)

}



function displayProduct() {
   var productList = ""
   for (var i = 0; i < productContainer.length; i++) {
      productList += `<tr>
      <td data-label = "Product ID">${i + 1}</td>
      <td data-label = "Product Name">${productContainer[i].name}</td>
      <td data-label = "Product Category">${productContainer[i].category}</td> 
      <td data-label = "Product Price">${productContainer[i].price}</td> 
      <td data-label="Product Description">${productContainer[i].desc}</td>
      <td data-label="Product Count"><div class="count d-flex align-items-center justify-content-end">
            <p>${productContainer[i].count}</p>
            <button onmouseup="plus(${i})"><i class="fa-solid fa-plus"></i></button>
            <button onmouseup="minus(${i})"><i class="fa-solid fa-minus"></i></button>
      </div>
   
      <td data-label="Edit"> <button class="btn btn-warning" onclick="update(${i})">Edit</button></td>
      <td data-label="Delete"><button class="btn btn-danger" onclick="deleteRow(${i})">Delete</button> </td>
      </tr > `
   }
   document.getElementById("t_body").innerHTML = productList
}

// addEventListener("mouseup")

function clearInp() {
   productName.value = ""
   productPrice.value = ""
   productCategory.value = ""
   productDescription.value = ""
   productCount.value = ""
}

function deleteAll() {
   productContainer.splice(0)
   localStorage.setItem("ourProducts" , JSON.stringify(productContainer))
   displayProduct()
}
//deleteRow
function deleteRow(i) {
   
      productContainer.splice(i,1)
      localStorage.setItem("ourProducts" , JSON.stringify(productContainer))
      displayProduct()

}

function minus(i) {
   if (productContainer[i].count > 1) {
      
      productContainer[i].count = productContainer[i].count - 1
      displayProduct()
      localStorage.setItem("ourProducts" , JSON.stringify(productContainer))
   } else if (productContainer[i].count <= 1) {
      deleteRow(i)
      localStorage.setItem("ourProducts" , JSON.stringify(productContainer))
   }

}

function plus(i) {

      
      productContainer[i].count = +productContainer[i].count + 1
      displayProduct()
      console.log(productContainer[i])
      localStorage.setItem("ourProducts" , JSON.stringify(productContainer))


}


function search() {
   var productList = ""
   var value = productSearch.value
   for (var i = 0; i < productContainer.length; i++) {
      if (productContainer[i].name.includes(value)) {
         productList += `<tr>
      <td data-label = "Product ID">${i + 1}</td>
      <td data-label = "Product Name">${productContainer[i].name}</td>
      <td data-label = "Product Category">${productContainer[i].category}</td> 
      <td data-label = "Product Price">${productContainer[i].price}</td> 
      <td data-label="Product Description">${productContainer[i].desc}</td>
      <td data-label="Product Count"><div class="count d-flex align-items-center justify-content-end">
                                    <p>${productContainer[i].count}</p>
                                    <button onmouseup="plus(${i})"><i class="fa-solid fa-plus"></i></button>
                                    <button onmouseup="minus(${i})"><i class="fa-solid fa-minus"></i></button>
                                </div>
   
      <td data-label="Edit"> <button class="btn btn-warning" onclick="update(${i})">Edit</button></td>
      <td data-label="Delete"><button class="btn btn-danger" onclick="deleteRow(${i})">Delete</button> </td>
      </tr > `
      document.getElementById("t_body").innerHTML = productList
      
   } else {
      
      document.getElementById("t_body").innerHTML = "Your Product Not Found"
      }
   }
      
   console.log("work")
}

function update(i) {
   indexOfProduct = i 
   productName.value = productContainer[i].name
   productCount.value = productContainer[i].count
   productPrice.value = productContainer[i].price
   productCategory.value = productContainer[i].category
   productDescription.value = productContainer[i].desc
   mode = "update"
   submit.innerHTML = "update"
}
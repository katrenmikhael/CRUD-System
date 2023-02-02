var pName = document.getElementById("productName");
var pCategory  = document.getElementById("productCtegory");
var pPrice = document.getElementById("productPrice");
var pDesc = document.getElementById("productDesc");
var indexToUpdate;
var productContainer = [];
if(localStorage.getItem('products') != null)
{
    productContainer = JSON.parse(localStorage.getItem("products"));
    show();
}
function addUpdateProduct()
{
   if((document.querySelector('#Add_Update').innerHTML) == "Add Product")
   { 
    var product = {
        name:pName.value,
        category:pCategory.value,
        price:pPrice.value,
        Desc:pDesc.value
    }
    productContainer.push(product);
    
   }
   else
   {
    console.log("update");
    var product = {
        name:pName.value,
        category:pCategory.value,
        price:pPrice.value,
        Desc:pDesc.value
    }
    productContainer.splice(indexToUpdate,1,product);
    document.querySelector('#Add_Update').innerHTML = "Add Product";
   }
   show();
   clear();
   localStorage.setItem("products",JSON.stringify(productContainer));   
}

function clear()
{
    pName.value = null;
    pCategory.value = null;
    pPrice.value = null;
    pDesc.value = null;
}

function show()
{
    var tableRows = ``

for(var i=0; i< productContainer.length; i++)
{
    tableRows +=`
     <tr>
        <td>${i+1}</td>            
        <td>${ productContainer[i].name}</td>
        <td>${ productContainer[i].category}</td>
        <td>${ productContainer[i].price}</td>
        <td>${ productContainer[i].Desc}</td>
        <td><button class="btn btn-sm btn-outline-danger" onclick="deleteRow(${i})">Delete</button></td>
        <td><button class="btn btn-sm btn-outline-primary" onclick="updateRow(${i})">Update</button></td>
     </tr>`
}
document.getElementById("demo").innerHTML = tableRows;
}

function deleteRow(index)
{
    productContainer.splice(index,1);
    localStorage.setItem("products",JSON.stringify(productContainer));
    show();
}

function search(searchInput)
{
   searchResult = ``; 
   for(var i = 0; i < productContainer.length; i++)
   {
        Names = String(productContainer[i].name);
        lowerNames = Names.toLowerCase();
        
        if(lowerNames.includes(searchInput.toLowerCase()))
        {

            searchResult += ` 
            <tr>
                    <td>${i+1}</td>            
                    <td>${ productContainer[i].name.replace(searchInput.toLowerCase(),`<span>${searchInput}</span>`)}</td>
                    <td>${ productContainer[i].category}</td>
                    <td>${ productContainer[i].price}</td>
                    <td>${ productContainer[i].Desc}</td>
                    <td><button class="btn btn-sm btn-outline-danger" onclick="deleteRow(${i})">Delete</button></td>
                    <td><button class="btn btn-sm btn-outline-primary" onclick="updateRow(${i})">Update</button></td>
            </tr>`
        }

   }
   document.getElementById("demo").innerHTML = searchResult;
}

function clearSearch()
{
    document.getElementById('floatingInput').value = null; 
    show();
}

function updateRow(index)
{
    document.getElementById("productName").value = productContainer[index].name;
    document.getElementById("productCtegory").value = productContainer[index].category;
    document.getElementById("productPrice").value = productContainer[index].price;
    document.getElementById("productDesc").value = productContainer[index].Desc;
    document.querySelector('#Add_Update').innerHTML = "Update Product";
    indexToUpdate = index;
}

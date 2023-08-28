let shop = new Store();

let pageItem = 4;
let pageCurrence = 1;



let sp1 = new Product (1,'thanh long',12000,1,'https://cdn.tgdd.vn/Files/2017/05/23/985304/nhung-cong-dung-tuyet-voi-cua-thanh-long-ban-nen-biet-202109171157393465.jpg');
let sp2 = new Product (2,'dưa Hấu',10700,2,'https://cdn.abphotos.link/photos/resized/1024x/2022/10/11/1665481742_zBeR91PDZWlcvAgE_1665489920-phpfmg173.png');
let sp3 = new Product (3,'cam sành',15900,2,'https://static-images.vnncdn.net/files/publish/2023/6/1/cam-sanh-1-1134.jpg');
let sp4 = new Product (4,'cam',69000,2,'https://dacsancamvinh.net/wp-content/uploads/2015/06/cong-dung-qua-cam.jpg');
let sp5 = new Product (5,'chuối',17000,2,'http://trungtamytequangyen.vn/Content/Images/images/thang%2011%202018/18b3.jpg');
let sp6 = new Product (6,'sầu riêng',99000,1,'https://i1-kinhdoanh.vnecdn.net/2023/05/31/sr-1685520220-7985-1685520566.jpg?w=680&h=0&q=100&dpr=1&fit=crop&s=c7Kx9AlINUoSvMBzzbBwMg');
let sp7 = new Product (7,'mãng cầu',38000,2,'https://bizweb.dktcdn.net/thumb/large/100/324/966/products/mangcaunata-38f746ed-59a5-460f-a0ea-7240aafb4e84.jpg?v=1624982777693');
let sp8 = new Product (8,'quýt',55000,2,'https://monkeymedia.vcdn.com.vn/upload/web/storage_web/16-06-2022_11:41:22_sau-sinh-an-quyt-duoc-khong.jpg');
let sp9 = new Product (9,'hồng',65000,2,'https://dacsandalat.com.vn/wp-content/uploads/2014/06/qua-hong.jpg');

shop.addProduct(sp1);  shop.addProduct(sp2);  shop.addProduct(sp3);
shop.addProduct(sp4);  shop.addProduct(sp5);  shop.addProduct(sp6);
shop.addProduct(sp7);  shop.addProduct(sp8);  shop.addProduct(sp9);



// function main (){
//     let sp1 = new Product (1,'thanh long',2000,1);
//     let sp2 = new Product (2,'dưa Hấu',4500,2);
//     let sp3 = new Product (3,'cam sành',3500,2);
//
//     shop.addProduct(sp1);
//     shop.addProduct(sp2);
//     shop.addProduct(sp3);
//
//     let listProductInStore = shop.findAll();
//     for (let i = 0; i < listProductInStore.length; i++) {
//         console.log(listProductInStore[i]);
//
//     }
// }
// main();


function showAll(pages) {
    let listProductInStore = shop.findAll();
    let stringHtml = '';
    if(pages >  Math.ceil(shop.findAll().length/pageItem)) {
        pages--;
    }
    pageCurrence=pages;
    for (let i = (pages-1)*pageItem; i < pages*pageItem; i++) {
        if (listProductInStore[i]){
            stringHtml += `
         <tr>
            <th>${listProductInStore[i].id}</th>
            <th>${listProductInStore[i].name}</th>
            <th>${listProductInStore[i].price}</th>
            <th>${listProductInStore[i].quantity}</th>
            <th><img style="width: 100px;height: 100px;object-fit: cover" src="${listProductInStore[i].images}"></th>
            <th><button style="background-color: green;color: white;" onclick="showFormEdit(${i})">Edit</button></th>
            <th><button onclick="removeProduct(${i})" style="background-color: red; color: white">Delete</button></th>
        </tr>
        `
        }
    }
    phanTrang();
    document.getElementById('list-product').innerHTML = stringHtml;
}
showAll(pageCurrence);

function showFormAdd() {
        document.getElementById('form-add').innerHTML= `
            <h3>Form Add</h3>
          <input type="number" id="Id" placeholder="Id">
        <br>
        <input type="text" id="Name" placeholder="Name">
        <br>
        <input type="text" id="Price" placeholder="Price">
        <br>
        <input type="number" id="Quantity" placeholder="Quantity">
        <br>
        <input type="text" id="Images" placeholder="Images">
        <br>
        <button onclick="save()">Save</button>
        `
    
}


function save() {
    let id = +document.getElementById('Id').value;
    let name = document.getElementById('Name').value;
    let price = +document.getElementById('Price').value;
    let quantity = +document.getElementById('Quantity').value;
    let images = document.getElementById('Images').value;
    let newProduct = new Product (id,name,price,quantity,images);
    shop.addProduct(newProduct);
    showAll(pageCurrence);
    document.getElementById('form-add').innerHTML ='';


}
function removeProduct(index) {
    let check = confirm('Are you sure ?');
    if (check) {shop.remove(index);
        showAll(pageCurrence);}


}
function showFormEdit(index) {

    let productEdit = shop.findAll()[index];
    document.getElementById('form-edit').innerHTML = `
     <h3>Form Edit</h3>
          <input type="number" id="IdEdit" placeholder="Id" value="${productEdit.id}">
        <br>
        <input type="text" id="NameEdit" placeholder="Name" value="${productEdit.name}">
        <br>
        <input type="text" id="PriceEdit" placeholder="Price" value="${productEdit.price}">
        <br>
        <input type="number" id="QuantityEdit" placeholder="Quantity" value="${productEdit.quantity}">
        <br>
        <input type="text" id="ImagesEdit" placeholder="Images" value="${productEdit.images}">
        <br>
        <button onclick="saveEdit(${index})">Save</button>
    `
}

function saveEdit(index) {
    let idEdit = document.getElementById('IdEdit').value;
    let nameEdit = document.getElementById('NameEdit').value;
    let priceEdit = document.getElementById('PriceEdit').value;
    let quantityEdit = document.getElementById('QuantityEdit').value;
    let imagesEdit = document.getElementById('ImagesEdit').value;
    let newEditProduct = new Product (idEdit,nameEdit,priceEdit,quantityEdit,imagesEdit);
    shop.edit(index,newEditProduct);

    showAll(pageCurrence);
    document.getElementById('form-edit').innerHTML = '';
}



function searchProduct() {
    let listProductInStore = shop.findAll();
    let stringSearchProduct = '';
    let search = document.getElementById('searchInput').value;
    search=search.toLowerCase();
    if(search===''){
        showAll(pageCurrence);
    }else {
        for (let i = 0; i < listProductInStore.length; i++) {
            if ( listProductInStore[i].name.toLowerCase().includes(search)) {
                stringSearchProduct +=`
         <tr>
            <th>${listProductInStore[i].id}</th>
            <th>${listProductInStore[i].name}</th>
            <th>${listProductInStore[i].price}</th>
            <th>${listProductInStore[i].quantity}</th>
            <th><img style="width: 100px;height: 100px;object-fit: cover" src="${listProductInStore[i].images}"></th>
            <th><button style="background-color: green;color: white;" onclick="showFormEdit(${i})">Edit</button></th>
            <th><button onclick="removeProduct(${i})" style="background-color: red; color: white">Delete</button></th>
        </tr>
        `
            }
        }
        document.getElementById('list-product').innerHTML = stringSearchProduct;
        document.getElementById('pages').innerHTML = '';
    }
}



function phanTrang() {

    let totalPage = Math.ceil(shop.findAll().length/pageItem) ;
    let stringPages = '';
    for (let i = 1; i <= totalPage; i++) {
       if (pageCurrence === i) {
           stringPages += `
           <li class="page-item"><button disabled>${i}</button></li>
           `
       } else {  stringPages += `
           <li class="page-item"><button onclick="showAll(${i})">${i}</button></li>
           `

       }
    }
    document.getElementById('pages').innerHTML = stringPages;

}
phanTrang();
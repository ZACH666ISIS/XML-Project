const storeScroll = document.getElementById("elements_scroll");
const imgsProductsScroll = document.getElementsByClassName("images-pane");
const imgsDown = document.getElementsByClassName("btn-images-down");
const imgsUp = document.getElementsByClassName("btn-images-up");
const deleteproducts = document.getElementsByClassName("delete-product");
const deleteemployees = document.getElementsByClassName("delete-employee");
const images = document.getElementsByClassName("img");
const stores= document.getElementsByClassName("ourStore");
let selectedProduct = new Array();
let selectedEmployee = new Array();
let products = new Array();
let employees = new Array();
const nextProductsBtn = document.getElementsByClassName("next-product");
const prevProductsBtn = document.getElementsByClassName("prev-product");
const nextEmployeesBtn = document.getElementsByClassName("next-employee");
const prevEmployeesBtn = document.getElementsByClassName("prev-employee");
init();


const btnAddProd = document.getElementsByClassName("btn-addProd");
const btnAddEmp = document.getElementsByClassName("btn-addEmp");


for(let i =0 ;i<stores.length;i++){



  btnAddProd[i].addEventListener('click', function(event){
    var form = document.getElementById("addProd").getElementsByTagName("form")[0];
    form.setAttribute("method", "post");
    form.setAttribute("enctype", "multipart/form-data");
    form.setAttribute("action", "controller/addProduct.php");
    form.querySelector("input[type=file]").setAttribute("multiple","");
    setStoreIdForm(form);
    document.getElementById("addProd").style.display="block";
  });
  btnAddEmp[i].addEventListener('click', function(event){
    var form = document.getElementById("addEmp").getElementsByTagName("form")[0];
    form.setAttribute("method", "post");
    form.setAttribute("enctype", "multipart/form-data");
    form.setAttribute("action", "controller/addEmployee.php");
    setStoreIdForm(form);
    document.getElementById("addEmp").style.display="block";
  });

  products.push(stores[i].getElementsByClassName("product"));
  employees.push(stores[i].getElementsByClassName("employee"));
  selectedProduct.push(0);
  selectedEmployee.push(0);
  nextProductsBtn[i].addEventListener('click', (event) => {
    products[i][selectedProduct[i]].classList.remove("product-selected");
    selectedProduct[i]  = (selectedProduct[i]+1)%products[i].length;
    products[i][selectedProduct[i]].classList.add("product-selected");
  });

  prevProductsBtn[i].addEventListener('click', (event) => {
    products[i][selectedProduct[i]].classList.remove("product-selected");
    if(--selectedProduct[i]<0)
      selectedProduct[i]=products[i].length-1;
    products[i][selectedProduct[i]].classList.add("product-selected");
  });

  nextEmployeesBtn[i].addEventListener('click', (event) => {
    employees[i][selectedEmployee[i]].classList.remove("employee-selected");
    selectedEmployee[i]  = (selectedEmployee[i]+1)%employees[i].length;
    employees[i][selectedEmployee[i]].classList.add("employee-selected");
  });
  
  prevEmployeesBtn[i].addEventListener('click', (event) => {
    employees[i][selectedEmployee[i]].classList.remove("employee-selected");
    if(--selectedEmployee[i]<0)
      selectedEmployee[i]=employees[i].length-1;
    employees[i][selectedEmployee[i]].classList.add("employee-selected");
  });
if(employees[i].length>0){
  employees[i][0].classList.add("employee-selected");
}

if(products[i].length>0) {
  products[i][0].classList.add("product-selected");
}
  

}

function nextProduct(index){
  var products = arr[index];
  products[indexProduct].classList.remove("product-selected");
  indexProduct = (indexProduct+1)%products.length;
  products[indexProduct].classList.add("product-selected");
}
function nextEmployee(index){
  employees[indexEmployee].classList.remove("employee-selected");
  indexEmployee = (indexEmployee+1)%employees.length;
  employees[indexEmployee].classList.add("employee-selected");
}
function prevProduct(index){
  var products = arr[index];
  products[indexProduct].classList.remove("product-selected");
  if(--indexProduct<0)
    indexProduct=products.length-1;
  products[indexProduct].classList.add("product-selected");
}
function prevEmployee(index){
  employees[indexEmployee].classList.remove("employee-selected");
  if(--indexEmployee<0)
    indexEmployee=employees.length-1;  
  employees[indexEmployee].classList.add("employee-selected");
}

function init(){
  document.getElementById("exit-popUp-show").addEventListener('click', function(event){
    document.getElementById("image-popUp").style.display="none";
  });
  document.getElementById("exit-popUp-prod").addEventListener('click', function(event){
    document.getElementById("popUp-delete-product").style.display="none";
  });
  document.getElementById("cancel-del-prod").addEventListener('click', function(event){
    document.getElementById("popUp-delete-product").style.display="none";
  });
  document.getElementById("exit-popUp-employee").addEventListener('click', function(event){
    document.getElementById("popUp-delete-employee").style.display="none";
  });
  document.getElementById("cancel-del-employee").addEventListener('click', function(event){
    document.getElementById("popUp-delete-employee").style.display="none";
  });
  document.getElementById("scroll_right").addEventListener('click', function(event){
    storeScroll.scrollLeft += 350;
  });
  document.getElementById("scroll_left").addEventListener('click', function(event){
    storeScroll.scrollLeft -= 350;
  });


  document.getElementById("exit-popUp-addProd").addEventListener('click', function(event){
    document.getElementById("addProd").style.display="none";
  });
  document.getElementById("exit-popUp-addEmp").addEventListener('click', function(event){
    document.getElementById("addEmp").style.display="none";
  });

  for(let i=0;i<imgsDown.length;i++){
    imgsDown[i].addEventListener('click', function(event){
      imgsProductsScroll[i].scrollTop += 100;
    });
    imgsUp[i].addEventListener('click', function(event){
      imgsProductsScroll[i].scrollTop -= 100;
    });
    deleteproducts[i].addEventListener('click', function(event){
      var popUp =  document.getElementById("popUp-delete-product");
      var val = document.querySelectorAll("#barCode")[i].value;
      document.getElementById("product-id").innerHTML = val;
      form_Delete_Product(val)
      popUp.style.display="block";
    });


  }
  for(let i=0;i<deleteemployees.length;i++){
    deleteemployees[i].addEventListener('click', function(event){
      var popUp =  document.getElementById("popUp-delete-employee");
      var val = document.querySelectorAll("#idEmployee")[i].value;
      document.getElementById("employee-id").innerHTML = val;
      form_Delete_Employee(val);
      popUp.style.display="block";
    });

  }
  for(let i=0;i<images.length;i++){

    images[i].addEventListener('click', function(event){      
      document.getElementById("img-popUp-src").src =  images[i].src ;
      document.getElementById("image-popUp").style.display="block";
    });
  }

  
}

function form_Delete_Employee(val){
  var form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "controller/removeEmployee.php");
  var FN = document.createElement("input");
  FN.setAttribute("type", "hidden");
  FN.setAttribute("name", "idEmp");
  FN.setAttribute("value", val);
  var idStore = document.createElement("input");
  idStore.setAttribute("type", "hidden");
  idStore.setAttribute("name", "idStore");
  idStore.setAttribute("value", getStoreId());
  form.appendChild(document.getElementById("send-delEmp"));
  form.appendChild(idStore);
  form.appendChild(FN);
  document.getElementById("responseEmp").appendChild(form);

}

function form_Delete_Product(val){
  var form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "controller/removeProduct.php");
  var FN = document.createElement("input");
  FN.setAttribute("type", "hidden");
  FN.setAttribute("name", "idProd");
  FN.setAttribute("value", val);
  var idStore = document.createElement("input");
  idStore.setAttribute("type", "hidden");
  idStore.setAttribute("name", "idStore");
  idStore.setAttribute("value", getStoreId());
  form.appendChild(document.getElementById("send-delProd"));
  form.appendChild(idStore);
  form.appendChild(FN);
  document.getElementById("responseProd").appendChild(form);

}

function setStoreIdForm(form){
  var input = form.querySelector('input[type=hidden]');
  if( input == null){
    var idStore = document.createElement("input");
    idStore.setAttribute("type", "hidden");
    idStore.setAttribute("name", "idStore");
    idStore.setAttribute("value", getStoreId());
    form.appendChild(idStore);
  }
  else{
    input.setAttribute("value", getStoreId());
  }
}

function getStoreId(){
  try{
    return document.getElementById("elements_scroll").getElementsByClassName("selected")[0].getElementsByTagName("input")[0].value;
  }
  catch(e){}
}

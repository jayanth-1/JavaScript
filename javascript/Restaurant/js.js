var tableSelected;
var one={
    id:"one",
 orders:[
]
};
var two={
    id:"two",
    orders:[
   ]
   };
   var three={
       id:"three",
    orders:[
   ]
   };
function tableDisplay(event,passedTable) {
    var tablec={};
    if(passedTable==='one')
    {
        tablec=one;
    }else if(passedTable==='two')
    {
        tablec=two;
    }else if(passedTable==='three'){
        tablec=three;
    }
    console.log(tablec);
    setTotal(tablec);
    var tablearea = document.getElementById('myTable');
    var inn= tablearea.firstChild;
    if(inn)
    tablearea.removeChild(inn);
    var table = document.createElement('table');
    table.id="myTable1"
    table.setAttribute('class','table table-striped table-bordered table-responsive');
    var tr = document.createElement('tr');
    var td1 = document.createElement('th');
    var td2 = document.createElement('th');
    var td3 = document.createElement('th');
    var td4 = document.createElement('th');
    var td5 = document.createElement('th');
    var text1 = document.createTextNode('S.No');
    var text2 = document.createTextNode('Item');
    var text3 = document.createTextNode('Price');
    var text4 = document.createTextNode('Quantity');

    var text5 = document.createTextNode('');
    td1.appendChild(text1);
    td2.appendChild(text2);
    td3.appendChild(text3);
    td4.appendChild(text4);
    td5.appendChild(text5);

    for (var i = 0; i < tablec.orders.length; i++){
     tr1 = document.createElement('tr');

     td1 = document.createElement('td');
     td2 = document.createElement('td');
     td3 = document.createElement('td');
     td4 = document.createElement('td');
     td5 = document.createElement('td');

     text1 = document.createTextNode(`${i+1}`);
     text2 = document.createTextNode(tablec.orders[i].item);
     text3 = document.createTextNode(tablec.orders[i].price);
     var input = document.createElement("input");
        input.type = "number";
        input.id=i;
        input.setAttribute("step",'1');
        input.value=(tablec.orders[i].quantity);
        input.addEventListener('change',function(){
            console.log(input.value,this.id);
            var x=document.getElementById(this.id);
           tablec.orders[this.id].quantity=parseInt(x.value);
            setTotal(tablec);

        });

     var btn = document.createElement('input');
btn.type = "button";
btn.setAttribute('class','icon icon-trash');

// btn.className = "btn";
btn.id=i;
var span = document.createElement('span');
span.setAttribute('class','glyphicon glyphicon-name');
btn.appendChild(span);

 btn.value = "delete";
// btn.addEventListener('click', clickFunc(tablec));
btn.onclick = (function(){
    console.log(this.id);
    document.getElementById("myTable1").deleteRow(this.id);
    // console.log(this.id);
    tablec.orders.splice(this.id,1);
    //  document.getElementById("myTable1").deleteRow(this.id);
     setTotal(tablec);

});

td5.appendChild(btn);

     td1.appendChild(text1);
     td2.appendChild(text2);
     td3.appendChild(text3);
     td4.appendChild(input);
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td3);
    tr1.appendChild(td4);
    tr1.appendChild(td5);
    table.appendChild(tr1);
}
tablearea.appendChild(table);
};
function changeMain(tablec)
{
}
function setTotal( tablex)
{   console.log("in totaling",tablex);
    var totalPrice=0;
    var totalQuan=0;
    var id=document.getElementById('total');
    for(let i of tablex.orders)
    {   totalQuan +=i.quantity;
        totalPrice+=i.quantity* i.price;
    }
    id.innerHTML=totalPrice;

    var temp;
   if(tablex.id==="one")
   temp="1";
   else if(tablex.id==="two")
   temp="2";
   else if(tablex.id==="three")
   temp="3";
   var id="droptarget"+temp;
   console.log("id",id);

   var itemRef=document.getElementById(id);
   itemRef.getElementsByTagName("P")[0].innerHTML=totalPrice;
   itemRef.getElementsByTagName("P")[1].innerHTML=totalQuan;
}
function tableFilter() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('tableSearch');
    filter = input.value.toUpperCase();
    ul = document.getElementById("tableUl");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("card-header")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
function menuFilter() {

    var input, filter, ul, li, a, i;
    input = document.getElementById('menuSearch');
    filter = input.value.toUpperCase();
    ul = document.getElementById("menuUl");
    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("card-header")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
function dragStart(event) {
    event.dataTransfer.setData("Text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    //document.getElementById("temp").innerHTML = "The p element was dropped.";
    var dive=document.getElementById(data);
    var price=  dive.getElementsByTagName("P")[1].innerHTML;
    var itemName =  dive.getElementsByTagName("P")[0].innerHTML;
    var obj={
        item:itemName,
        quantity:1,
        price:price
    };
    var tableRef="";
    var tableRef=document.getElementById(event.target.id);
    var tableDrop=tableRef.parentNode.getElementsByClassName("card-header")[0].innerHTML;
    var totalPriceRef=tableRef.getElementsByTagName("P")[0];
    var itemRef=tableRef.getElementsByTagName("P")[1];
    totalPriceRef.innerHTML=parseInt(totalPriceRef.innerHTML)+parseInt(price);
    itemRef.innerHTML=parseInt(itemRef.innerHTML)+1;
    console.log(tableDrop.trim());
    //Change here for your logic
   if(tableDrop.trim().startsWith("Table-2"))
   {
    //Do whatever you want here
    let flag=0;
    for(let x in one.orders)
    {
        if(one.orders[x].item===obj.item)
        {
             flag=1;
             one.orders[x].quantity=one.orders[x].quantity+1;

        }
    }if(flag==0)
    one.orders.push(obj);
    //update the price
   } else if(tableDrop.trim().startsWith("Table-1"))
   {
    let flag=0;
    for(let x in two.orders)
    {
        if(two.orders[x].item===obj.item)
        {
             flag=1;
             two.orders[x].quantity=two.orders[x].quantity+1;

        }
    }if(flag==0)
       two.orders.push(obj);
       console.log("pused into table1",two.orders);
        // push into two
   }else if(tableDrop.trim().startsWith("Table-3"))
   {
       let flag=0;
       for(let x in three.orders)
       {
           if(three.orders[x].item===obj.item)
           {
                flag=1;
                three.orders[x].quantity=three.orders[x].quantity+1;

           }
       }if(flag==0)
       three.orders.push(obj);
    //push into three
   }
}
function popitup() {
   var newwindow=window.open('bill.html','Bill','height=100,width=150');
    if (window.focus) {newwindow.focus()}
    return false;
  }

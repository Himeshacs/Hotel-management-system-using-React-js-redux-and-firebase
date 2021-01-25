const productList = document.querySelector('#product-list');
  
  function RenderProduct(doc){
     let li = document.createElement('li');
     let ProName = document.createElement('span');
     let price = document.createElement('span');

     li.setAttribute('data-id',doc.id);
     ProName.textContent = doc.data().ProName;
     price.textContent = doc.data().price;

     li.appendChild(ProName);
     li.appendChild(price);

     productList.appendChild(li);

  }

  db.collection('product').get().then((snapshot)=>{
    
    snapshot.doc.forEach(doc=>{
       console.log(doc.data());
       RenderProduct(doc);
    })
  })
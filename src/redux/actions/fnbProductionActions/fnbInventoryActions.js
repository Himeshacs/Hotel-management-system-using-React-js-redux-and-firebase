export const  formatDate = (string) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
}


export const updateInvRec = (payload) => {
    console.log(payload)
    let expiryDate;
    if(payload.expDate != null || payload.expDate != ""){
         expiryDate = formatDate(payload.expDate);
    }
    else{
        expiryDate = null;
    }
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        // if(expiryDate != null){
        firestore.collection('fnbInventory').doc(payload.id).update({
            id:payload.id,
            itemName:payload.itemName,
            unitPrice:payload.unitPrice,
            qty:payload.qty,
            total:payload.total,
            expDate:expiryDate,
            lastModified:(new Date()).toDateString(),
            stkStatus:payload.stkStatus            
        });
    // }
    // else{
    //     firestore.collection('fnbInventory').doc(payload.id).update({
    //         id:payload.id,
    //         itemName:payload.itemName,
    //         unitPrice:payload.unitPrice,
    //         qty:payload.qty,
    //         total:payload.total,
    //         lastModified:(new Date()).toDateString(),
    //         stkStatus:payload.stkStatus            
    //     });
    // }
    }

}

export const insertInvRec = (payload) => {
    console.log(payload)
    payload.lastModified = (new Date()).toDateString();
    if(payload.expDate != null || payload.expDate != ""){
        payload.expDate = formatDate(payload.expDate);
   }
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('fnbInventory').doc(payload.id).set({
            ...payload
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }

}

export const deleteInvRec = (InventoryId) => {
    console.log(InventoryId)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('fnbInventory').doc(InventoryId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}
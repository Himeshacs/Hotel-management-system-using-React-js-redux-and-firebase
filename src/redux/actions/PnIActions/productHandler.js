export const updateProduct = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection("productMng").doc(payload.pId).update({
            pId:payload.pId,
            pType:payload.pType,
            department:payload.department,
            priority:payload.priority,
            qty:payload.qty,
            date:payload.date
            //status:payload.status
        }); 
    }

}

export const insertProduct = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('productMng').doc(payload.pId).set({
            pId:payload.pId,
            pType:payload.pType,
            department:payload.department,
            priority:payload.priority,
            qty:payload.qty,
            date:payload.date
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }

}

export const deleteProduct = (productId) => {
    console.log(productId)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('productMng').doc(productId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}
export const updatePurchasesRequest = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection("request").doc(payload.pId).update({
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

export const insertPurchasesRequest = (payload,department,priority) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('request').doc(payload.pId).set({
            pId:payload.pId,
            pType:payload.pType,
            department:department,
            priority:priority,
            qty:payload.qty,
            date:payload.date
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }

}

export const deletePurchasesRequest = (purchasesId) => {
    console.log(purchasesId)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('request').doc(purchasesId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}
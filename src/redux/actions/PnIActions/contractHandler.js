export const updateContractInfo = (payload,department) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('contract').doc(payload.cId).update({
            cId:payload.cId,
            supplierName:payload.supplierName,
            pType:payload.pType,
            date:payload.date,
            department:payload.department,
            description:payload.description
        }); 
    }

}

export const insertContractInfo = (payload,department) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('contract').doc(payload.cId).set({
            cId:payload.cId,
            supplierName:payload.supplierName,
            pType:payload.pType,
            date:payload.date,
            department:department,
            description:payload.description
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }

}

export const deleteContractInfo = (contractId) => {
    console.log(contractId)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('contract').doc(contractId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}
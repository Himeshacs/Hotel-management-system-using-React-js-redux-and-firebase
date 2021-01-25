export const updateProductType = (payload) => {
    console.log(payload)
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        // payload.OPId = payload.id + payload.orderNo;
        firestore.collection("orderProducts").doc(payload.OPId).update({
            OPId:payload.OPId,
            ProName:payload.ProName,
            amount:payload.amount,
            id:payload.id,
            orderNo:payload.orderNo,
            quantity:payload.quantity,
            Volume:payload.volume,
            // tableNO: payload.tableNO,
            // room: payload.room,
            // description: payload.description,
            // status: payload.status
            // DateAndTime:payload.dateAndTime,
            // orId:payload.orId,
        });
    }
}

export const insertProductType = (payload) => {
    console.log(payload)
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        payload.OPId = payload.id + payload.orderNo;
        firestore.collection('orderProducts').doc(payload.OPId).set({
            ...payload
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }

}

export const deleteProductType = (orderId) => {
    console.log(orderId)
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('orderProducts').doc(orderId.OPId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}

export const updateBarInvRec = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('barInventory').doc(payload.id).update({
            id:payload.id,
            itemName:payload.itemName,
            price:payload.price,
            qty:payload.qty,
            expDate:payload.expDate,
            lastModified:payload.lastModified,
            stkStatus:payload.stkStatus
        });
    }

}



export const deleteBarInvRec = (InventoryId) => {
    console.log(InventoryId)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('barInventory').doc(InventoryId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}



export const updateOrderType = (payload) => {
    console.log(payload)
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection("foodOrder").doc(payload.orderNo).update({
            orderNo:payload.orderNo,
            tableNO: payload.tableNO,
            room: payload.room,
            descriptions: payload.descriptions,
            status: payload.status,
            date:payload.date
            // DateAndTime:payload.dateAndTime,
            // ID:payload.Proid,
            // Name:payload.ProName,
            // quantity:payload.quantity,
            // Amount:payload.Amount,
            // orId:payload.orId,
        });
    }
}

export const insertOrderType = (payload) => {
    console.log(payload)
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('foodOrder').doc(payload.orderNo).set({
            orderNo:payload.orderNo,
            tableNO: payload.tableNO,
            room: payload.room,
            descriptions: payload.description,
            status: payload.status,
            date:payload.date,
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }

}

export const deleteOrderType = (orderId) => {
    console.log(orderId)
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('foodOrder').doc(orderId.orderNo).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}




// export const updateOrderType1 = (payload1) => {
//     console.log(payload1)
//     return (dispatch, getState, { getFirestore, getFirebase }) => {
//         const firestore = getFirestore();
//         firestore.collection("orderProducts").doc(payload1.Proid).update({
//             ID: payload1.orId,
//             // TableNO:payload.tableNO,
//             // RoomNO:payload.room,
//             // description:payload.description,
//             // Status:payload.status,
//             // DateAndTime: payload1.dateAndTime,
//             ProductID: payload1.Proid,
//             ProductName: payload1.ProName,
//             Quntity: payload1.quntity,
//             Amount: payload1.Amount,
//         });
//     }
// }

// export const insertOrderType1 = (payload1) => {
//     console.log(payload1)
//     return (dispatch, getState, { getFirestore, getFirebase }) => {
//         const firestore = getFirestore();
//         firestore.collection('orderProducts').doc(payload1.Proid).set({
//             ...payload1
//         }).then((response) => {
//             console.log(response)
//         }).catch((response) => {
//             console.log(response)
//         })
//     }

// }

// export const deleteOrderType1 = (payload1) => {
//     console.log(payload1)
//     return (dispatch, getState, { getFirestore, getFirebase }) => {
//         const firestore = getFirestore();
//         firestore.collection('orderProducts').doc(payload1).delete()
//             .then((response) => {
//                 console.log(response)
//             }).catch((error) => {
//                 console.log(error)
//             })
//     }

// }
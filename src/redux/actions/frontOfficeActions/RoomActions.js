export const updateRoom = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection("room").doc(payload.id).update({
          ...payload
        });
    }

}

export const insertRoom = (payload,roomType) => {
    console.log(payload,roomType)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('room').doc(payload.id).set({
            ...payload,
            roomType:roomType
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }
}

export const deleteRoom = (roomId) => {
    console.log(roomId)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('room').doc(roomId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}


export const updateCleaningSchedule = (payload) => {
    console.log(payload)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection("cleaningSchedule").doc(payload.id).update({
          ...payload
        });
    }

}

export const insertCleaningSchedule = (payload) => {
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        console.log(payload)
        firestore.collection('cleaningSchedule').add({
            ...payload,
            time:payload.timee
        }).then((response) => {
            console.log(response)
        }).catch((response) => {
            console.log(response)
        })
    }
}

export const deleteCleaningSchedule = (roomId) => {
    console.log(roomId)
    return (dispatch,getState,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        firestore.collection('cleaningSchedule').doc(roomId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}



import { Alert } from "@material-ui/lab";
import React  from 'react';

export const insertGenItems = (payload, MenuNo) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('Menu').doc(MenuNo).collection('MenuItems').doc(payload.itemId).set({
            itemId: payload.itemId,
            name: payload.name,
            price: payload.price
        });
    }
}

export const updateMenu = (payload) => {
    console.log(payload)
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('Menu').doc(payload.id).update({
            id: payload.id,
            menuName: payload.menuName,
            price: payload.price,
            lastModified: (new Date()).toDateString(),
            menutype: payload.menutype
        });
    }

}

export const updateMenuItems = (payload,MenuType,MenuNo) => {
    console.log(payload)
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        if(MenuType == 1){
        firestore.collection('Menu').doc(payload.id).collection('MenuItems').doc(payload.id).update({
            Wlitem1: payload.Wlitem1,
            Mditem1: payload.Mditem1, Mditem2: payload.Mditem2, Mditem3: payload.Mditem3,
            Sditem1: payload.Sditem1, Sditem2: payload.Sditem2, Sditem3: payload.Sditem3,
            Dsitem1: payload.Dsitem1, Dsitem2: payload.Dsitem2, Dsitem3: payload.Sditem3
        });
    }
        else{
            firestore.collection('Menu').doc(MenuNo).collection('MenuItems').doc(payload.itemId).update({
                name:payload.name,
                price:payload.price
            }); 
        }
    }

}

export const insertMenu = (payload, ItemsPayload) => {
    console.log(payload)
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('Menu').doc(payload.id).set({
            id: payload.id,
            menuName: payload.menuName,
            price: payload.price,
            lastModified: (new Date()).toDateString(),
            menutype: payload.menuType
        }).then((response) => {
            console.log(response)
            return (<Alert variant="filled" severity="success">
                NEW MENU INSERTED!
            </Alert>)
        }).catch((response) => {
            console.log(response)
        })
        if (payload.menuType == 1) {
            firestore.collection('Menu').doc(payload.id).collection('MenuItems').doc(payload.id).set({
                Wlitem1: ItemsPayload.Wlitem1,
                Mditem1: ItemsPayload.Mditem1, Mditem2: ItemsPayload.Mditem2, Mditem3: ItemsPayload.Mditem3,
                Sditem1: ItemsPayload.Sditem1, Sditem2: ItemsPayload.Sditem2, Sditem3: ItemsPayload.Sditem3,
                Dsitem1: ItemsPayload.Dsitem1, Dsitem2: ItemsPayload.Dsitem2, Dsitem3: ItemsPayload.Sditem3
            })
        }
        else {
            for (let index = 0; index < ItemsPayload.length; index++) {
                firestore.collection('Menu').doc(payload.id).collection("MenuItems").doc(ItemsPayload[index].itemId).set(ItemsPayload[index]);
            }
        }
    }

}

export const deleteMenu = (MenuId) => {
    console.log(MenuId)
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        firestore.collection('Menu').doc(MenuId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}

export const deleteMenuItems = (oldData,MenuType,MenuNo) => {
    console.log(oldData.id)
    return (dispatch, getState, { getFirestore, getFirebase }) => {
        const firestore = getFirestore();
        if(MenuType == 1){
        firestore.collection('Menu').doc(oldData.id).collection('MenuItems').doc(oldData.id).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
     }
        else{
        firestore.collection('Menu').doc(MenuNo).collection('MenuItems').doc(oldData.itemId).delete()
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
    }

}}
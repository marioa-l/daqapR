export function getFormatedArgumentBody(argument) {
    return argument.replace(/-</g, "⤙").replace(/_G[0-9]+/g, "X").replace(/<-/g, "⇽");
}

export function valueExistsinObjectArray(arrayObject, value) {
    for (var count = 0; count < arrayObject.length; count++) {
        if (arrayObject[count].id === value) {
            return true;
        }
    }

    return false;
}
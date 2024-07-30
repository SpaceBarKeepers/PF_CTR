const objectsAreEqual = (obj1: Record<string, any>, obj2: Record<string, any>) => {
    // Helper function to compare two objects deeply
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
    }

    for (let key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            if (typeof obj1[key] === 'object' && obj1[key] !== null && typeof obj2[key] === 'object' && obj2[key] !== null) {
                if (!objectsAreEqual(obj1[key], obj2[key])) {
                    return false;
                }
            } else if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
    }

    return true;
}

export const arrayContainsObject = (arr: Record<string, any>[], outsideObj: Record<string, any>) => {
    // Function to check if array contains an object that is deeply equal to outsideObj
    for (let i = 0; i < arr.length; i++) {
        if (objectsAreEqual(arr[i], outsideObj)) {
            return true;
        }
    }
    return false;
}
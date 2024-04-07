import uuid from "react-uuid"

const getUid = () => {
    let id = uuid();

    return id;
}

export default getUid
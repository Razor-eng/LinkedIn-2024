import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../firebase"

export const uploadImage = (file, setImage, setImageLoading, setProgress) => {
    const profilePicRef = ref(storage, `files/${file.name}`);
    const uploadProfileImage = uploadBytesResumable(profilePicRef, file);

    uploadProfileImage.on('state_changed', (snapshot) => {
        const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
    }, (error) => {
        console.log(error);
    }, () => {
        getDownloadURL(uploadProfileImage.snapshot.ref).then(res => {
            setImage(res);
        }).then(() => {
            setImageLoading(false);
        })
    })
}
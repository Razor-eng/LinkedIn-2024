/* eslint-disable react-refresh/only-export-components */
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore"
import { firestore } from "../firebase"
import toast from "react-hot-toast";

let dbRef = collection(firestore, 'posts');
let userRef = collection(firestore, 'users');
let commentRef = collection(firestore, 'comments');
let connectionRef = collection(firestore, 'connections');

export const PostMessage = (postData) => {
    addDoc(dbRef, postData)
        .then(() => {
            toast.success('Posted Successfully');
        })
        .catch(err => {
            toast.error(err);
        })
}

export const getPosts = (setPosts) => {
    onSnapshot(dbRef, (res) => {
        setPosts(
            res.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            })
        )
    })
}

export const getUserPosts = (setPosts, userEmail) => {
    onSnapshot(dbRef, (res) => {
        setPosts(
            res.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            }).filter(item => {
                return item.email === userEmail
            })
        )
    })
}

export const setUser = async (userData) => {
    const q = query(userRef, where("email", "==", userData?.email));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
        addDoc(userRef, userData);
    }
}

export const getCurrentUser = (userEmail, setCurentUser) => {
    onSnapshot(userRef, (res) => {
        setCurentUser(res.docs.map((doc) => {
            return { ...doc.data(), id: doc.id }
        }).filter((item) => {
            return item.email === userEmail
        })[0]);
    });
}

export const updateCurrentUser = (id, updatedUser) => {
    let updateRef = doc(userRef, id);

    updateDoc(updateRef, updatedUser).then(() => {
        toast.success('Updated Successfully');
    }).catch(err => {
        toast.error(err.message);
    });
}

export const updateCurrentUserPicture = (id, imageURL) => {
    let updateRef = doc(userRef, id);

    updateDoc(updateRef, {
        photoURL: imageURL
    }).then(() => {
        toast.success('Image uploaded Successfully');
    }).catch(err => {
        toast.error(err.message);
    });
}

export const likePost = async (userId, postId) => {
    let postRef = doc(dbRef, postId);
    let postData = await getDoc(postRef);
    let likedUsers = postData.data().likes || [];

    if (likedUsers !== null) {
        if (likedUsers.includes(userId)) {
            likedUsers = likedUsers.filter(id => {
                return id !== userId
            })
            updateDoc(postRef, {
                likes: likedUsers
            }).then(() => {
            }).catch(err => {
                toast.error(err.message);
            });
        } else {
            likedUsers.push(userId);
            updateDoc(postRef, {
                likes: likedUsers
            }).then(() => {
                toast.success('You liked a post!')
            }).catch(err => {
                toast.error(err.message);
            });
        }
    } else {
        likedUsers.push(userId);

        updateDoc(postRef, {
            likes: likedUsers
        }).then(() => {
            toast.success('You liked a post!')
        }).catch(err => {
            toast.error(err.message);
        });
    }
}

export const commentPost = (comment) => {
    try {
        addDoc(commentRef, comment).then(() => {
            toast.success('Comment Posted')
        }).catch(err => {
            toast.error(err.message);
        })
    } catch (err) {
        toast.error(err.message);
    }
}

export const getComments = (postId, setComments) => {
    try {
        let postQuery = query(commentRef, where('postId', '==', postId));

        onSnapshot(postQuery, (res) => {
            const comments = res.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            setComments(comments);
        });
    } catch (error) {
        toast.error(error.message);
    }
}

export const updateMessage = (id, message) => {
    let postToUpdate = doc(dbRef, id);

    try {
        updateDoc(postToUpdate, message).then(() => {
            toast.success('Post Updated...')
        });
    } catch (error) {
        toast.error(error.message)
    }
}

export const deleteMessage = (id) => {
    let postToDelete = doc(dbRef, id);

    try {
        deleteDoc(postToDelete).then(() => {
            toast.success('Post Deleted!')
        });
    } catch (error) {
        toast.error(error.message)
    }
}

export const getAllUsers = (setUsers, userId) => {
    onSnapshot(userRef, (res) => {
        setUsers(
            res.docs.map((doc) => {
                return { ...doc.data(), id: doc.id };
            }).filter(val => {
                return val.id !== userId
            })
        )
    })
}

export const addConnection = (userId, targetId) => {

    try {
        let userToAdd = doc(connectionRef, `${userId}_${targetId}`);

        setDoc(userToAdd, { userId, targetId }).then(() => {
            toast.success('Connection Added..!')
        })
    } catch (error) {
        toast.error(error.message);
    }
}

export const getConnections = (userId, targetId, setIsConnected) => {
    try {
        let connectionQuery = query(connectionRef, where('targetId', '==', targetId));

        onSnapshot(connectionQuery, res => {
            let connections = res.docs.map(doc => doc.data());

            const isConnected = connections.some(connection => connection.userId === userId)

            setIsConnected(isConnected)
        })
    } catch (error) {
        toast.error(error.message);
    }
}
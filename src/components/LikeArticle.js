import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";


export default function LikeArticle({ id, likes }) {
  const [user] = useAuthState(auth);

  const likesRef = doc(db, "Articles", id);
//  console.log("likesref: ", likesRef)
  const handleLike = () => {
    if(navigator.onLine == false){
      toast("To Like/ Unlike the article Make sure you are connected to internet", { type: "error" });
    }
    else{
      if (likes?.includes(user.uid)) {
        console.log("WTH IS HAPPENING")
        updateDoc(likesRef, {
          likes: arrayRemove(user.uid),
        }).then(() => {
            console.log("unliked the post");
        }).catch((e) => {
              console.log(e);
        });
      }
      else{
          updateDoc(likesRef,{
              likes:arrayUnion(user.uid)
          }).then(() => {
              console.log("liked");
          }).catch((e) => {
                console.log(e);
          });
      }
    }

  };
  return (
    <div>
      <i
        className={`fa fa-heart${!likes?.includes(user.uid) ? "-o" : ""} fa-lg`}
        style={{
          cursor: "pointer",
          color: likes?.includes(user.uid) ? "red" : null,
        }}
        onClick={handleLike}
      />
    </div>
  );
}

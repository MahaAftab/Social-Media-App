import React, { useState } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, navigate, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AddArticle() {

  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [disable, setDisable] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePublish = () => {
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill in all the fields");
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );
    setDisable(true)
    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          description: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "Articles");
          addDoc(articleRef, {
            title: formData.title,
            description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            createdBy: user.displayName,
            userId: user.uid,
            likes: [],
            comments: []
          })
            .then(() => {
              toast("Article added successfully", { type: "success" });
              setProgress(0);
              // const countRef = collection(db, "meta");
              setDisable(false)
              setOpen(false);
              // window.location.reload()

            })
            .catch((err) => {
              toast("Error adding article", { type: "error" });
            });
        });
      }
    );

  };
  const navigateToMain = () => {
    navigate('/')
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {user && <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <Button variant="contained" onClick={handleClickOpen} style={{ background: 'green' }}>
          Click to add a new post
        </Button>
      </div>}
      {!user && <div>
        <Button variant="outlined" onClick={navigateToMain}>Go Back To Main Page      </Button>

      </div>

      }

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add an Article
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {/* <div className="form-group"> */}
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={(e) => handleChange(e)}
            />
            {/* </div> */}
          </Typography>
          <Typography gutterBottom>
            {/* description */}
            <label htmlFor="">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={(e) => handleChange(e)}
            />

            {/* image */}
            <label htmlFor="">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="form-control"
              onChange={(e) => handleImageChange(e)}
            />
          </Typography>
          <Typography gutterBottom>
            {progress === 0 ? null : (
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped mt-2"
                  style={{ width: `${progress}%` }}
                >
                  {`uploading image ${progress}%`}
                </div>
              </div>
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={disable}
            variant="contained"
            style={{ marginTop: 2 }}
            className="form-control btn-primary mt-2"
            onClick={handlePublish}
          >
            Publish
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}



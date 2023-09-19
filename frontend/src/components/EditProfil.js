import React, { useState } from "react";
import Navigation from "./Navigation";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfil = () => {
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [bio, setBio] = useState(userData.bio || "");
  const [name, setName] = useState(userData.name || "");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFile({
          file: selectedFile,
          imageUrl: event.target.result,
        });
      };

      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("1");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      if (file) {
        formData.append("picture", file.file);
      }

      const userId = userData.userID;

      // Récupérez le token JWT des cookies
      const jwtToken = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("jwt="))
        ?.trim()
        .split("=")[1];

      // Ajoutez le token JWT comme en-tête Authorization
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      await axios.put(`http://localhost:3000/user/${userId}`, formData, config);
      console.log("2");

      navigate("/profil");
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de l'envoi des données : ",
        error
      );
    }
  };

  return (
    <div className="page-container">
      <Navigation />
      <h1>Modifier le profil</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="file" className="file-label">
            Changer ma photo de profil
            <input
              type="file"
              id="file"
              name="file"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
            />
          </label>
          {file ? (
            <img
              src={file.imageUrl}
              alt="Photo de profil"
              className="profile-picture"
            />
          ) : (
            <img
              src={userData.picture}
              alt="Photo de profil"
              className="profile-picture"
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            placeholder="Votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <input
            type="text"
            id="bio"
            placeholder="Votre bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Modifier le profil"
            className="submit-button"
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfil;

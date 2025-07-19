import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ArrowBack, Edit, CheckCircle, Close } from "@mui/icons-material";
import MobileFrame from "../../components/shared/MobileFrame";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    fullName: currentUser?.displayName || "John Doe",
    email: currentUser?.email || "johndoeahh@gmail.com",
    password: "**************",
    location: "369 Afrider, California",
    gender: "Male",
    age: "38",
    phoneNumber: "086 291812735",
  });

  const handleBack = () => {
    navigate("/settings");
  };

  const handleSaveProfile = () => {
    // Show success popup
    setShowSuccessPopup(true);

    // Auto hide popup after 3 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const profileStyles = {
    container: {
      width: "100%",
      height: "100%",
      background: "#FFFFFF",
      position: "relative",
    },
    header: {
      display: "flex",
      alignItems: "center",
      padding: "15px 20px",
      borderBottom: "1px solid #E0E0E0",
      background: "#FFFFFF",
    },
    backButton: {
      cursor: "pointer",
      marginRight: "15px",
    },
    title: {
      fontSize: "16px",
      fontWeight: "700",
      fontFamily: '"Poppins", sans-serif',
      color: "#000000",
    },
    content: {
      padding: "20px",
      height: "calc(100% - 70px)",
      overflowY: "auto",
    },
    editProfileTitle: {
      fontSize: "20px",
      fontWeight: "400",
      fontFamily: '"Poppins", sans-serif',
      color: "#000000",
      marginBottom: "30px",
      lineHeight: "1.5em",
    },
    avatarContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "40px",
      position: "relative",
    },
    avatar: {
      width: "75px",
      height: "75px",
      borderRadius: "50%",
      background: "#817F7F",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    avatarText: {
      color: "#FFFFFF",
      fontSize: "24px",
      fontWeight: "600",
    },
    editIcon: {
      position: "absolute",
      bottom: "5px",
      right: "5px",
      width: "23px",
      height: "23px",
      background: "#FFFFFF",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    },
    formField: {
      marginBottom: "24px",
    },
    label: {
      fontSize: "13px",
      fontWeight: "400",
      fontFamily: '"Poppins", sans-serif',
      color: "#000000",
      opacity: 0.7,
      marginBottom: "8px",
      display: "block",
      lineHeight: "1.5em",
    },
    input: {
      width: "100%",
      fontSize: "15px",
      fontWeight: "400",
      fontFamily: '"Poppins", sans-serif',
      color: "#000000",
      border: "none",
      borderBottom: "1px solid #000000",
      background: "transparent",
      padding: "8px 0",
      outline: "none",
      lineHeight: "1.5em",
    },
    passwordInput: {
      width: "100%",
      fontSize: "15px",
      fontWeight: "400",
      fontFamily: '"Poppins", sans-serif',
      color: "#000000",
      opacity: 0.7,
      border: "none",
      borderBottom: "1px solid #000000",
      background: "transparent",
      padding: "8px 0",
      outline: "none",
      lineHeight: "1.5em",
    },
    editFieldIcon: {
      position: "absolute",
      right: "0",
      top: "32px",
      width: "20px",
      height: "20px",
      cursor: "pointer",
      opacity: 0.5,
    },
    saveButtonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "30px",
      paddingBottom: "20px",
    },
    saveButton: {
      background: "rgba(0, 255, 255, 0.3)",
      borderRadius: "5px",
      padding: "8px 16px",
      border: "none",
      cursor: "pointer",
      fontSize: "11px",
      fontWeight: "400",
      fontFamily: '"Poppins", sans-serif',
      color: "#000000",
      lineHeight: "1.5em",
    },
  };

  const popupStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    popup: {
      background: "#FFFFFF",
      borderRadius: "12px",
      padding: "30px 20px",
      width: "280px",
      textAlign: "center",
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
      position: "relative",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#666",
    },
    successIcon: {
      color: "#4CAF50",
      fontSize: "48px",
      marginBottom: "16px",
    },
    title: {
      fontSize: "18px",
      fontWeight: "600",
      fontFamily: '"Poppins", sans-serif',
      color: "#000000",
      marginBottom: "8px",
    },
    message: {
      fontSize: "14px",
      fontWeight: "400",
      fontFamily: '"Poppins", sans-serif',
      color: "#666666",
      lineHeight: "1.5",
    },
  };

  const FormField = ({
    label,
    value,
    field,
    type = "text",
    isPassword = false,
  }) => (
    <div style={{ ...profileStyles.formField, position: "relative" }}>
      <label style={profileStyles.label}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => handleInputChange(field, e.target.value)}
        style={isPassword ? profileStyles.passwordInput : profileStyles.input}
        readOnly={isPassword}
      />
      <Edit style={profileStyles.editFieldIcon} />
    </div>
  );

  const SuccessPopup = () => (
    <div style={popupStyles.overlay}>
      <div style={popupStyles.popup}>
        <button style={popupStyles.closeButton} onClick={handleClosePopup}>
          <Close />
        </button>
        <CheckCircle style={popupStyles.successIcon} />
        <div style={popupStyles.title}>Profile Updated Successfully!</div>
        <div style={popupStyles.message}>
          Your profile information has been saved successfully.
        </div>
      </div>
    </div>
  );

  return (
    <MobileFrame>
      <div style={profileStyles.container}>
        {/* Header */}
        <div style={profileStyles.header}>
          <ArrowBack style={profileStyles.backButton} onClick={handleBack} />
          <span style={profileStyles.title}>Account Setting</span>
        </div>

        {/* Content */}
        <div style={profileStyles.content}>
          <div style={profileStyles.editProfileTitle}>Edit Profile</div>

          {/* Avatar */}
          <div style={profileStyles.avatarContainer}>
            <div style={profileStyles.avatar}>
              <span style={profileStyles.avatarText}>
                {formData.fullName.charAt(0)}
              </span>
              <div style={profileStyles.editIcon}>
                <Edit style={{ fontSize: "12px", color: "#666" }} />
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <FormField
            label="Full name"
            value={formData.fullName}
            field="fullName"
          />

          <FormField
            label="Email"
            value={formData.email}
            field="email"
            type="email"
          />

          <FormField
            label="Password"
            value={formData.password}
            field="password"
            type="password"
            isPassword={true}
          />

          <FormField
            label="Location"
            value={formData.location}
            field="location"
          />

          <FormField label="Gender" value={formData.gender} field="gender" />

          <FormField
            label="Age"
            value={formData.age}
            field="age"
            type="number"
          />

          <FormField
            label="Phone number"
            value={formData.phoneNumber}
            field="phoneNumber"
            type="tel"
          />
          {/* Save Button */}
          <div style={profileStyles.saveButtonContainer}>
            <button
              style={profileStyles.saveButton}
              onClick={handleSaveProfile}
            >
              SAVE PROFILE
            </button>
          </div>

          {/* Success Popup */}
          {showSuccessPopup && <SuccessPopup />}
        </div>
      </div>
    </MobileFrame>
  );
};

export default Profile;

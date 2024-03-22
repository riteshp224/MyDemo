export const tableHeaders = ['Date', 'Title', 'Actions'];
export const regex = {
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
}
export const errorMessages = {
    titleRequired: "Title is required.",
    fileRequired: "File is required.",
    invalidFileFormat: "Invalid file format, Please upload image, pdf or docx file.",
    emailRequired: "Email is required.",
    validEmail: "Please enter a valid email address.",
    oldPasswordRequired: "Old password is required.",
    passwordRequired: "Password is required.",
    confirmPasswordRequired: "Confirm Password is required.",
    passwordNotMatch: "New password and confirm new password does not match.",
    blankOTP: "OTP can not be blank",
    newPasswordRequired: "New password is required.",
    confirmNewPasswordRequired: "Confirm new password is required.",
    OTPExpired: "OTP has benn expired"
};
export const titles = {
    welcome: "Welcome",
    title: "ShreeRang Das",
    forgotTitle: "Forgot Password",
    forgotDescripation: "Don't worry! It happens, Please enter the email associated with your account.",
    OTPTitle: "Please Check Your Email",
    OTPDescription: "We've sent a code to",
    resetTitle: "Reset Password",
    resetDescription: "Please type something you'll remember",
    resetPasswordSuccessTitle: "Password Changed",
    resetPasswordSuccessDescription: "Your password has been changed successfully!!",
    documentList: "Document List"
}
export const pagination = {
    recordPerPage: "Records per Page",
    noUserFound: "No any user found !!",
    showing: "Showing ",
    of: "of "
}
export const addEditDocumentLabel = {
    documentName: "Document Name",
    documentFile: "Document File",
    editDocument: "Edit Document",
    addDocument: "Add Document",
    update: "Update",
    submit: "Submit",
    cancel: "Cancel",
    documentPreview: "Document Preview"
}
export const deleteDocumentLabel = {
    delete: "Delete",
    cancel: "Cancel",
    wnatToDeleteRecord: "Are you sure you want to delete this record ?"
}
export const forgotLabel = {
    email: "Email",
    rememberPassword: "Remember password ?",
    logIn: "Log in",
    sendCode: "Send Code"
}
export const loginLabel = {
    emailAddress: "Email Address",
    password: "Password",
    forgotPassword: "Forgot Password ?",
    logIn: "Log in",
}
export const OTPLabel = {
    resendOTP: "Send code again ",
    verify: "Verify"
}
export const resetLabel = {
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    submit: "Submit",
    alreadyAccount: "Already have an account?",
    logIn: "Log in"
}
export const resetSuccessLabel = {
    backToLogin: "Back To Login"
}
export const sidebarLable = {
    changePassword: "Change Password",
    logout: "Logout",
    confirmation: "Confirmation",
    wantToLogout: "Are you sure you want to logout ?",
    cancel: "Cancel",
    oldPassword: "Old Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password"
}
export const pathConstant = {
    document: "Documents/"
}
export const extension = {
    doc: "doc",
    docx: "docx"
}
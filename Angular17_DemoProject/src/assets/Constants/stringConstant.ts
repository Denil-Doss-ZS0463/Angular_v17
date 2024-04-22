export class StringContants {
    public static generalContants = {
        save: 'Save',
        cancel: 'Cancel',
        close: 'Close',
        add: 'Add',
        edit: 'Edit',
        delete: 'Delete',
        apply: 'Apply',
    }

    public static filter = {
        filterLabel: 'Filter',
        columnLabel: 'Column',
        filterAttributes: ['Equals', 'Does Not Equal', 'Begins With', 'Not Begins With', 'Ends With', 'Not Ends With', 'Contains', 'Not Contains'],
        andLabel: 'and',
        addFilterLabel: '+ Add Filter'
    }

    public static changePassword = {
        changePasswordLabel: 'Change Password',
        oldPasswordLabel: 'Old Password',
        newPasswordLabel: 'New Password',
        confirmPasswordLabel: 'Confirm Password',
        passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        passwordRegexErrorText: "Password must container at least 1 number, 1 special character, 1 uppercase and 1 lowercase character",
        passwordNotMatchErrorText: "Password not matched",
        passwordLengthErrorText: "Password must be at least 8 characters long",

    }
}
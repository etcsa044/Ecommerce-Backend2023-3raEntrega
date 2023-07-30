

export const userErrorIncompleteValues = (user) => {
    return `One or more required data fields were not provided:
    REQUIRED DATA:
    * firstName: Was expecting a 'String' value but received. ${user.first_name}.
    * lastName: Was expecting a 'String' value but received. ${user.last_name}.
    * email: Was expecting a 'String' value but received. ${user.email}.
    * password: Was expecting a 'String' value but received. ${user.password}.
    `
}

//Crear invalidTypes
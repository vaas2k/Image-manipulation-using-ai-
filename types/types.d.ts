interface CreateUser {
    clerkId : string,
    username : string,
    email : string,
    photo : string,
    firstName : string,
    lastName : string
}

interface UpdateUser {
    username ?: string,
    photo ?: string,
    firstName ?: string,
    lastName ?: string
}


export {
    CreateUser,
    UpdateUser
}
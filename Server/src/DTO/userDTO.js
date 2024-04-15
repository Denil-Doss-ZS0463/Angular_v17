// UserDTO.js
class UserDTO {
    static excludePassword(user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    static userResponse(user, endpoint) {
        switch (endpoint) {
            case 'getAllUsers':
                return UserDTO.excludePassword(user);
            case 'getUserById':
                return UserDTO.excludePassword(user);
            default:
                return user;
        }
    }
}

module.exports = UserDTO;

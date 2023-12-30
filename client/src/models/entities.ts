export interface TokenEntity {
  access_token: string;
}

export interface TokenAdminEntity {
  admin_token: string;
}

export interface UserAPIEntity {
    _id: string;
    username: string;
    activeDevice: string;
}

export interface UserEntity {
    id: string;
    username: string;
    activeDevice: string;
}

import React, {useEffect} from 'react';
import {FormattedMessage} from "react-intl";
import {TokenAdminEntity, TokenEntity} from "../../models/entities";
import {adminLogin, adminTokenRefresh} from "../../api/admin";
import {useAtom} from "jotai";
import {tokenAdminAtom} from "../../atomStore";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

type Props = {

};

const AdminLoginPage = ({}: Props) => {
 const [loginError, setLoginError] = React.useState<string>("")
 const [adminToken, setAdminToken] = useAtom(tokenAdminAtom)
 const navigate = useNavigate()

 useEffect(() => {
  // try autologin from cookie
  adminTokenRefresh()
      .then((response: TokenAdminEntity) => {
       setAdminToken(response)
      })
      .catch((error: string) => {
       console.error(error)
      })
 }, []);

 const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!e.target.usernameAdmin.value || !e.target.passwordAdmin.value) setLoginError("error_login_required")
  adminLogin(e.target.usernameAdmin.value, e.target.passwordAdmin.value)
      .then((response: TokenEntity) => {
       setAdminToken(response)
      })
      .catch((error: string) => {
       setLoginError(error.message)
      })
 }

 // If token is in Atom AND is valid, navigate to /device-check
 useEffect(() => {
  if (adminToken) {
   const expiration = jwtDecode(adminToken.admin_token).exp
   if (expiration && Date.now() < expiration * 1000) navigate("/admin/dashboard")
  }
 }, [adminToken]);

 return (
  <div>
   <form onSubmit={handleLogin}>
    <div>
     <label htmlFor={"usernameAdmin"}><FormattedMessage id={"label_username"} defaultMessage={"Username"} />:</label>
     <input type="text" id="usernameAdmin" name="usernameAdmin" />
    </div>
    <div>
     <label htmlFor={"passwordAdmin"}><FormattedMessage id={"label_password"} defaultMessage={"Password"} />:</label>
     <input type="password" id="passwordAdmin" name="passwordAdmin" />
    </div>
    <div>
     <input type="submit" value="Login" />
    </div>
   </form>
   AdminLoginPage
  </div>
 );
};

export default AdminLoginPage;

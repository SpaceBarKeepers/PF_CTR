import React, {useEffect} from 'react';
import {FormattedMessage} from "react-intl";
import {TokenAdminEntity} from "../../models/entities";
import {adminLogin, adminTokenRefresh} from "../../api/admin";
import {useAtom} from "jotai";
import {tokenAdminAtom} from "../../atomStore";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

interface FormElements extends HTMLFormElement {
    usernameAdmin: HTMLInputElement;
    passwordAdmin: HTMLInputElement;
}

type Props = {

};

const AdminLoginPage = ({}: Props) => {
 const [, setLoginError] = React.useState<string>("")
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
 }, [setAdminToken]);

 const handleLogin = (e: React.FormEvent<FormElements>) => {
  e.preventDefault();

  const target = e.target as FormElements;

  if (!target.usernameAdmin.value || !target.passwordAdmin.value) setLoginError("error_login_required")
  adminLogin(target.usernameAdmin.value, target.passwordAdmin.value)
      .then((response: TokenAdminEntity) => {
       setAdminToken(response)
      })
      .catch((error) => {
       setLoginError(error.message)
      })
 }

 // If token is in Atom AND is valid, navigate to /device-check
 useEffect(() => {
  if (adminToken) {
   const expiration = jwtDecode(adminToken.admin_token).exp
   if (expiration && Date.now() < expiration * 1000) navigate("/admin/dashboard")
  }
 }, [adminToken, navigate]);

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

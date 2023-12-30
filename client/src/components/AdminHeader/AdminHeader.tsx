import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";

type Props = {

};

const AdminHeader = ({}: Props) => {
 return (
  <div>
   <Link to={"/admin/dashboard"}>
       <FormattedMessage id={"label_dashboard"} defaultMessage={"Dashboard"} />
   </Link>
    <Link to={"/admin/users"}>
        <FormattedMessage id={"label_users"} defaultMessage={"Users"} />
    </Link>
  </div>
 );
};

export default AdminHeader;

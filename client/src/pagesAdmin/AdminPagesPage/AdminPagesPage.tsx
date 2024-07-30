import AdminHeader from '../../components/AdminHeader/AdminHeader';
import { Link } from 'react-router-dom';

const AdminPagesPage = () => {
    return (
        <div>
            <AdminHeader />
            <h3>Pages:</h3>
            <Link to={'/admin/pages/trends'}>Trends</Link>
        </div>
    );
}

export default AdminPagesPage;
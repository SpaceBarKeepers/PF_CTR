import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';

const EditablePage = () => {
    const pageId = useLocation().pathname.split('/').pop()

    console.log(pageId)

    return (
        <div>
            <Header/>
            <h1>Editable Page</h1>
        </div>
    );
}

export default EditablePage;
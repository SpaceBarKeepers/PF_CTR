import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getToolsById } from '../../api/tools';
import { ToolEntity } from '../../models/tools';
import Header from '../../components/Header/Header';

const ToolDetail = () => {
    const [tool, setTool] = useState<ToolEntity>({} as ToolEntity);
    const { id } = useParams();

    useEffect(() => {
        if (!id) return
        getToolsById(id)
            .then((response) => {
                console.log(response);
                setTool(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <Header />
            <h1>Tool Detail</h1>
            <div>
                <h2>{tool.toolsName}</h2>
                <p>{tool.descEn}</p>
            </div>
        </div>
    );
}

export default ToolDetail;
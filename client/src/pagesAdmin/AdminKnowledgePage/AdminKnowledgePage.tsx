import React, {useEffect} from 'react';
import {KnowledgeAPIEntity} from "../../models/entities";
import {getKnowledgeAll} from "../../api/knowledge";

type Props = {

};

const AdminKnowledgePage = ({}: Props) => {
    const [articles, setArticles] = React.useState(null)

    useEffect(() => {
        getKnowledgeAll()
            .then((response) => {
                setArticles(response.map((item: KnowledgeAPIEntity) => {
                    const {_id, ...rest} = item;
                    return {id: _id, ...rest}
                }))
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

 return (
  <div>
      AdminKnowledgePage

  </div>
 );
};

export default AdminKnowledgePage;

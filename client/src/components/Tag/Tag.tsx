import "./tag.scss";
import { TagEntity } from '../../models/entities';

type Props = {
    tag: TagEntity;
    onClick: (tag: TagEntity) => () => void;
    selected: boolean;
}

const Tag = ({ tag, onClick, selected }: Props) => {
    return (
        <div className={`tag${selected ? " tag--selected" : ""}`} onClick={onClick(tag)}>
            CS: {tag.tagCs}
            <br/>
            EN: {tag.tagEn}
        </div>
    );
}

export default Tag;
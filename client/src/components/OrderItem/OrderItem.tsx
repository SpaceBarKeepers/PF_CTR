import './orderItem.scss';

type Props = {
    label: string;
    price: number;
    total?: boolean;
}

const OrderItem = ({ label, price, total = false }: Props) => {
    return (
        <div className={`orderItem${total ? ' orderItem--total' : ''}`}>
            <div className={'orderItem__item'}>
                <img src={'/icons/icon_check_black.svg'} alt={'checkmark'} />
                <div>{label}</div>
            </div>
            <div>{`${price} EUR`}</div>
        </div>
    );
};

export default OrderItem;